"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { MPD_SLOTS } from "@/lib/data";
import { pageDef } from "@/lib/pages";
import { getStaff, requireStaff, requireSuperAdmin } from "@/lib/admin/auth";
import { MPD_FIELDS, SETTINGS_FIELDS } from "@/lib/admin/content-fields";
import { parseFields, type FormResult } from "@/lib/admin/fields";
import { getResource, RESOURCES } from "@/lib/admin/resources";
import { createServiceClient, createSessionClient } from "@/lib/supabase/server";

// Every action re-checks that the caller is staff. RLS enforces the same rules again in the database.

type Db = Awaited<ReturnType<typeof createSessionClient>>;

const refreshSite = () => revalidatePath("/", "layout");

async function staffDb() {
  await requireStaff();
  return createSessionClient();
}

// Removes files that were uploaded to our public buckets. Links to anything else (e.g. /images/…) are left alone.
async function removeFiles(db: Db, urls: unknown[]) {
  const byBucket: Record<string, string[]> = {};
  for (const u of urls) {
    const m = typeof u === "string" ? u.match(/\/storage\/v1\/object\/public\/(documents|media)\/(.+)$/) : null;
    if (m) (byBucket[m[1]] ??= []).push(decodeURIComponent(m[2]));
  }
  for (const [bucket, paths] of Object.entries(byBucket)) {
    const { error } = await db.storage.from(bucket).remove(paths);
    if (error) console.error(`[admin] remove files: ${error.message}`);
  }
}

// ---------- Sign in / out ----------

export async function signIn(_: FormResult, fd: FormData): Promise<FormResult> {
  const db = await createSessionClient();
  const { error } = await db.auth.signInWithPassword({ email: String(fd.get("email") ?? "").trim(), password: String(fd.get("password") ?? "") });
  if (error) return { ok: false, message: "Wrong email or password." };
  if (!(await getStaff())) {
    await db.auth.signOut();
    return { ok: false, message: "This account isn't a staff account. Ask the administrator to add you." };
  }
  redirect("/admin");
}

export async function signOut() {
  const db = await createSessionClient();
  await db.auth.signOut();
  redirect("/admin/login");
}

// ---------- Generic lists ----------

export async function saveRow(key: string, id: string | null, _: FormResult, fd: FormData): Promise<FormResult> {
  const res = getResource(key);
  if (!res) return { ok: false, message: "Unknown list." };
  const parsed = parseFields(res.fields, fd);
  if ("error" in parsed) return { ok: false, message: parsed.error };
  const problem = res.validate?.(parsed.row);
  if (problem) return { ok: false, message: problem };
  const db = await staffDb();

  if (id) {
    const { data: old } = res.files?.length ? await db.from(res.table).select(res.files.join(",")).eq("id", id).maybeSingle() : { data: null };
    const { error } = await db.from(res.table).update(parsed.row).eq("id", id);
    if (error) return { ok: false, message: friendly(error.message) };
    if (old) await removeFiles(db, res.files!.map((f) => (old as unknown as Record<string, unknown>)[f]).filter((v, i) => v !== parsed.row[res.files![i]]));
  } else {
    const row = { ...parsed.row };
    if (res.sortable) {
      const { data } = await db.from(res.table).select("sort").order("sort", { ascending: false }).limit(1);
      row.sort = ((data?.[0]?.sort as number | undefined) ?? -1) + 1;
    }
    const { error } = await db.from(res.table).insert(row);
    if (error) return { ok: false, message: friendly(error.message) };
  }
  refreshSite();
  const back = String(fd.get("_back") ?? "");
  const list = back.startsWith(`/admin/${key}`) ? back : `/admin/${key}`;
  redirect(`${list}${list.includes("?") ? "&" : "?"}saved=1`);
}

const friendly = (msg: string) =>
  /duplicate key/.test(msg) ? "Something with the same web address already exists." : /row-level security/.test(msg) ? "You don't have permission to do that." : msg;

export async function deleteRow(key: string, id: string) {
  const res = getResource(key);
  if (!res) return;
  const db = await staffDb();
  const { data: old } = res.files?.length ? await db.from(res.table).select(res.files.join(",")).eq("id", id).maybeSingle() : { data: null };
  // Deleting an album also deletes its photos (cascade), so remove their files first.
  if (res.table === "gallery_albums") {
    const { data: photos } = await db.from("gallery_photos").select("image").eq("album_id", id);
    await removeFiles(db, (photos ?? []).map((p) => p.image));
  }
  const { error } = await db.from(res.table).delete().eq("id", id);
  if (error) throw new Error(friendly(error.message));
  if (old) await removeFiles(db, res.files!.map((f) => (old as unknown as Record<string, unknown>)[f]));
  refreshSite();
}

export async function togglePublished(key: string, id: string, value: boolean) {
  const res = getResource(key);
  if (!res?.publishable) return;
  const db = await staffDb();
  const { error } = await db.from(res.table).update({ published: value }).eq("id", id);
  if (error) throw new Error(friendly(error.message));
  refreshSite();
}

// Moves a row one place up or down among the rows shown (so list filters are respected).
// The rows keep the same set of sort numbers between them, so rows outside the filter don't move.
export async function moveRow(table: string, ids: string[], id: string, dir: -1 | 1) {
  const allowed = new Set(["gallery_photos", ...RESOURCES.filter((r) => r.sortable).map((r) => r.table)]);
  if (!allowed.has(table)) return;
  const i = ids.indexOf(id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= ids.length) return;
  const db = await staffDb();
  const { data, error } = await db.from(table).select("id, sort").in("id", ids);
  if (error) throw new Error(friendly(error.message));
  let slots = ids.map((x) => (data ?? []).find((r) => r.id === x)?.sort as number).sort((a, b) => a - b);
  if (new Set(slots).size !== slots.length || slots.some((n) => typeof n !== "number")) slots = ids.map((_, n) => (slots[0] ?? 0) + n);
  const order = [...ids];
  [order[i], order[j]] = [order[j], order[i]];
  const results = await Promise.all(order.map((rowId, n) => db.from(table).update({ sort: slots[n] }).eq("id", rowId)));
  const failed = results.find((r) => r.error);
  if (failed?.error) throw new Error(friendly(failed.error.message));
  refreshSite();
}

export async function copyFeeSession(fd: FormData) {
  const from = String(fd.get("from") ?? "").trim();
  const to = String(fd.get("to") ?? "").trim();
  if (!from || !to || from === to) return;
  const db = await staffDb();
  const { data, error } = await db.from("fee_structure").select("class_group, fee_head, amount, frequency, sort").eq("session", from);
  if (error) throw new Error(error.message);
  if (data?.length) {
    const { error: e2 } = await db.from("fee_structure").insert(data.map((r) => ({ ...r, session: to })));
    if (e2) throw new Error(e2.message);
  }
  refreshSite();
  redirect(`/admin/fees?session=${encodeURIComponent(to)}`);
}

// ---------- Settings, disclosure and pages ----------

export async function saveContent(key: "settings" | "mpd", _: FormResult, fd: FormData): Promise<FormResult> {
  const groups = key === "settings" ? SETTINGS_FIELDS : MPD_FIELDS;
  const parsed = parseFields(groups.flatMap((g) => g.fields), fd);
  if ("error" in parsed) return { ok: false, message: parsed.error };
  const db = await staffDb();
  const { error } = await db.from("site_content").upsert({ key, value: parsed.row });
  if (error) return { ok: false, message: friendly(error.message) };
  refreshSite();
  redirect(`/admin/${key === "settings" ? "settings" : "mpd"}?saved=1`);
}

export async function saveMpdSlot(slot: string, fileUrl: string) {
  if (!MPD_SLOTS.some((s) => s.slot === slot)) return;
  const db = await staffDb();
  const { data: old } = await db.from("mpd_documents").select("file_url").eq("slot", slot).maybeSingle();
  const { error } = await db.from("mpd_documents").upsert({ slot, file_url: fileUrl });
  if (error) throw new Error(friendly(error.message));
  if (old?.file_url && old.file_url !== fileUrl) await removeFiles(db, [old.file_url]);
  refreshSite();
}

export async function savePage(slug: string, _: FormResult, fd: FormData): Promise<FormResult> {
  const def = pageDef(slug);
  if (!def) return { ok: false, message: "Unknown page." };
  const body = String(fd.get("body") ?? "");
  const image = String(fd.get("image") ?? "");
  const db = await staffDb();
  const { data: old } = await db.from("pages").select("image").eq("slug", slug).maybeSingle();
  const { error } = await db.from("pages").upsert({ slug, title: def.title, body, image });
  if (error) return { ok: false, message: friendly(error.message) };
  if (old?.image && old.image !== image) await removeFiles(db, [old.image]);
  refreshSite();
  redirect("/admin/pages?saved=1");
}

// ---------- Gallery photos ----------

export async function addPhotos(albumId: string, images: string[]) {
  const db = await staffDb();
  const { data } = await db.from("gallery_photos").select("sort").eq("album_id", albumId).order("sort", { ascending: false }).limit(1);
  const start = ((data?.[0]?.sort as number | undefined) ?? -1) + 1;
  const { error } = await db.from("gallery_photos").insert(images.map((image, i) => ({ album_id: albumId, image, sort: start + i })));
  if (error) throw new Error(friendly(error.message));
  // The first photos of an album without a cover become its cover.
  await db.from("gallery_albums").update({ cover: images[0] }).eq("id", albumId).eq("cover", "");
  refreshSite();
}

export async function savePhotoCaption(id: string, caption: string) {
  const db = await staffDb();
  const { error } = await db.from("gallery_photos").update({ caption: caption.trim().slice(0, 300) }).eq("id", id);
  if (error) throw new Error(friendly(error.message));
  refreshSite();
}

export async function deletePhoto(id: string) {
  const db = await staffDb();
  const { data } = await db.from("gallery_photos").select("image, album_id").eq("id", id).maybeSingle();
  const { error } = await db.from("gallery_photos").delete().eq("id", id);
  if (error) throw new Error(friendly(error.message));
  if (data) {
    const { count } = await db.from("gallery_albums").select("id", { count: "exact", head: true }).eq("cover", data.image);
    if (!count) await removeFiles(db, [data.image]);
  }
  refreshSite();
}

export async function setCover(albumId: string, image: string) {
  const db = await staffDb();
  const { error } = await db.from("gallery_albums").update({ cover: image }).eq("id", albumId);
  if (error) throw new Error(friendly(error.message));
  refreshSite();
}

// ---------- Inbox ----------

const INBOX = new Set(["enquiries", "alumni_registrations", "job_applications"]);

export async function updateMessage(table: string, id: string, fd: FormData) {
  if (!INBOX.has(table)) return;
  const status = String(fd.get("status") ?? "read");
  if (!["new", "read", "done"].includes(status)) return;
  const db = await staffDb();
  const { error } = await db.from(table).update({ status, notes: String(fd.get("notes") ?? "").slice(0, 2000) }).eq("id", id);
  if (error) throw new Error(friendly(error.message));
  revalidatePath("/admin", "layout");
}

export async function deleteMessage(table: string, id: string) {
  if (!INBOX.has(table)) return;
  const db = await staffDb();
  if (table === "job_applications") {
    const { data } = await db.from("job_applications").select("resume_path").eq("id", id).maybeSingle();
    if (data?.resume_path) await db.storage.from("private").remove([data.resume_path]);
  }
  const { error } = await db.from(table).delete().eq("id", id);
  if (error) throw new Error(friendly(error.message));
  revalidatePath("/admin", "layout");
}

// ---------- Staff accounts (super admin only) ----------

export async function createStaff(_: FormResult, fd: FormData): Promise<FormResult> {
  await requireSuperAdmin();
  const service = createServiceClient();
  if (!service) return { ok: false, message: "Add SUPABASE_SERVICE_ROLE_KEY to the server's environment to manage staff accounts." };
  const email = String(fd.get("email") ?? "").trim();
  const password = String(fd.get("password") ?? "");
  const name = String(fd.get("name") ?? "").trim();
  const role = fd.get("role") === "super_admin" ? "super_admin" : "editor";
  if (!/^\S+@\S+\.\S+$/.test(email)) return { ok: false, message: "Add a valid email address." };
  if (password.length < 8) return { ok: false, message: "The password needs at least 8 characters." };
  const { data, error } = await service.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { name } });
  if (error) return { ok: false, message: error.message };
  const { error: e2 } = await service.from("profiles").insert({ id: data.user.id, email, name, role });
  if (e2) {
    await service.auth.admin.deleteUser(data.user.id);
    return { ok: false, message: e2.message };
  }
  revalidatePath("/admin/users");
  redirect("/admin/users?saved=1");
}

export async function setStaffRole(id: string, role: "super_admin" | "editor") {
  const me = await requireSuperAdmin();
  if (id === me.id) throw new Error("You can't change your own role.");
  const db = await createSessionClient();
  const { error } = await db.from("profiles").update({ role }).eq("id", id);
  if (error) throw new Error(friendly(error.message));
  revalidatePath("/admin/users");
}

export async function setStaffPassword(id: string, fd: FormData) {
  await requireSuperAdmin();
  const password = String(fd.get("password") ?? "");
  if (password.length < 8) throw new Error("The password needs at least 8 characters.");
  const service = createServiceClient();
  if (!service) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set.");
  const { error } = await service.auth.admin.updateUserById(id, { password });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/users");
}

export async function deleteStaff(id: string) {
  const me = await requireSuperAdmin();
  if (id === me.id) throw new Error("You can't remove your own account.");
  const service = createServiceClient();
  if (!service) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set.");
  const { error } = await service.auth.admin.deleteUser(id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/users");
}
