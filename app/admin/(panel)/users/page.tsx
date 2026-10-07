import type { Metadata } from "next";
import { createStaff, deleteStaff, setStaffPassword, setStaffRole } from "@/app/admin/actions";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { FieldsForm, inputCls } from "@/components/admin/FieldsForm";
import { AdminHeader, dangerBtn, Notice, smallBtn } from "@/components/admin/ui";
import { requireSuperAdmin } from "@/lib/admin/auth";
import { formatDate } from "@/lib/format";
import { createServiceClient, createSessionClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Staff accounts" };

export default async function Users({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [{ saved }, me] = await Promise.all([searchParams, requireSuperAdmin()]);
  const db = await createSessionClient();
  const { data } = await db.from("profiles").select("*").order("created_at");
  const staff = (data ?? []) as { id: string; name: string; email: string; role: "super_admin" | "editor"; created_at: string }[];
  const canManage = Boolean(createServiceClient());
  return (
    <>
      {saved && <Notice>Account created. Share the email and password with the staff member.</Notice>}
      {!canManage && <Notice tone="warn">Add SUPABASE_SERVICE_ROLE_KEY to the server&apos;s environment to add or remove staff accounts.</Notice>}
      <AdminHeader title="Staff accounts" intro="Editors can update all website content. Administrators can also manage staff accounts." />
      <div className="max-w-4xl space-y-8">
        <ul className="divide-y divide-lichen/50 bg-white shadow-sm ring-1 ring-lichen/60">
          {staff.map((u) => (
            <li key={u.id} className="flex flex-col gap-3 p-4 md:flex-row md:items-center">
              <div className="flex-1">
                <p className="font-semibold text-forest">{u.name || u.email}{u.id === me.id && <span className="ml-2 text-[12px] font-normal text-moss">(you)</span>}</p>
                <p className="text-[13px] text-moss">{u.email} · {u.role === "super_admin" ? "Administrator" : "Editor"} · since {formatDate(u.created_at)}</p>
              </div>
              {u.id !== me.id && (
                <div className="flex flex-wrap items-center gap-2">
                  <form action={setStaffRole.bind(null, u.id, u.role === "super_admin" ? "editor" : "super_admin")}>
                    <button className={smallBtn}>{u.role === "super_admin" ? "Make editor" : "Make administrator"}</button>
                  </form>
                  {canManage && (
                    <>
                      <form action={setStaffPassword.bind(null, u.id)} className="flex gap-1.5">
                        <input name="password" type="password" minLength={8} required placeholder="New password" aria-label={`New password for ${u.email}`} autoComplete="new-password" className={`${inputCls} !w-36 !py-1.5 text-[13px]`} />
                        <button className={smallBtn}>Set</button>
                      </form>
                      <form action={deleteStaff.bind(null, u.id)}>
                        <ConfirmButton message={`Remove ${u.email}? They will no longer be able to sign in.`} className={dangerBtn}>Remove</ConfirmButton>
                      </form>
                    </>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
        {canManage && (
          <section>
            <h2 className="mb-3 text-[19px] font-bold">Add a staff member</h2>
            <FieldsForm
              fields={[
                { name: "name", label: "Name", type: "text", required: true, half: true },
                { name: "email", label: "Email", type: "text", required: true, half: true },
                { name: "password", label: "Temporary password (at least 8 characters)", type: "text", required: true, half: true },
                { name: "role", label: "Role", type: "select", required: true, options: [["editor", "Editor"], ["super_admin", "Administrator"]], half: true },
              ]}
              values={{ role: "editor" }}
              action={createStaff}
              submit="Create account"
            />
          </section>
        )}
      </div>
    </>
  );
}
