import "server-only";
import { redirect } from "next/navigation";
import { cache } from "react";
import { hasSupabase } from "@/lib/supabase/env";
import { createSessionClient } from "@/lib/supabase/server";

export type Staff = { id: string; email: string; name: string; role: "super_admin" | "editor" };

// The signed-in staff member, or null. A signed-in user without a profile row is not staff.
export const getStaff = cache(async (): Promise<Staff | null> => {
  if (!hasSupabase) return null;
  const supabase = await createSessionClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from("profiles").select("id, email, name, role").eq("id", user.id).maybeSingle();
  return (data as Staff | null) ?? null;
});

export async function requireStaff() {
  const staff = await getStaff();
  if (!staff) redirect("/admin/login");
  return staff;
}

export async function requireSuperAdmin() {
  const staff = await requireStaff();
  if (staff.role !== "super_admin") redirect("/admin?denied=1");
  return staff;
}
