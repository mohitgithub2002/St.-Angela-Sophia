"use client";
import { createBrowserSupabase } from "@/lib/supabase/browser";

export type UploadKind = "image" | "pdf";

const LIMITS: Record<UploadKind, { bucket: string; types: string[]; maxMb: number; label: string }> = {
  image: { bucket: "media", types: ["image/jpeg", "image/png", "image/webp"], maxMb: 10, label: "JPG, PNG or WebP" },
  pdf: { bucket: "documents", types: ["application/pdf"], maxMb: 20, label: "PDF" },
};

export const acceptFor = (kind: UploadKind) => LIMITS[kind].types.join(",");
export const hintFor = (kind: UploadKind) => `${LIMITS[kind].label}, up to ${LIMITS[kind].maxMb} MB`;

// Uploads straight from the browser to Supabase Storage (the staff member's session authorises it)
// and returns the public URL to store in the database.
export async function uploadFile(file: File, kind: UploadKind): Promise<string> {
  const l = LIMITS[kind];
  if (!l.types.includes(file.type)) throw new Error(`Choose a ${l.label} file.`);
  if (file.size > l.maxMb * 1024 * 1024) throw new Error(`The file must be smaller than ${l.maxMb} MB.`);
  const safe = file.name.toLowerCase().replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "file";
  const ext = file.name.split(".").pop()?.toLowerCase() ?? (kind === "pdf" ? "pdf" : "jpg");
  const path = `${new Date().toISOString().slice(0, 7)}/${crypto.randomUUID().slice(0, 8)}-${safe}.${ext}`;
  const supabase = createBrowserSupabase();
  const { error } = await supabase.storage.from(l.bucket).upload(path, file, { contentType: file.type, cacheControl: "31536000" });
  if (error) throw new Error(error.message);
  return supabase.storage.from(l.bucket).getPublicUrl(path).data.publicUrl;
}
