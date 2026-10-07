import { NextResponse, type NextRequest } from "next/server";
import { getStaff } from "@/lib/admin/auth";
import { createSessionClient } from "@/lib/supabase/server";

// Résumés live in a private bucket; staff get a link that works for one minute.
export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getStaff())) return new NextResponse("Not signed in", { status: 401 });
  const { id } = await params;
  const db = await createSessionClient();
  const { data } = await db.from("job_applications").select("resume_path").eq("id", id).maybeSingle();
  if (!data?.resume_path) return new NextResponse("Not found", { status: 404 });
  const { data: signed, error } = await db.storage.from("private").createSignedUrl(data.resume_path, 60, { download: true });
  if (error || !signed) return new NextResponse(error?.message ?? "Could not create link", { status: 500 });
  return NextResponse.redirect(signed.signedUrl);
}
