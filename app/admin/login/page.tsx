import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SetupNotice } from "@/components/admin/SetupNotice";
import { Crest } from "@/components/Crest";
import { getStaff } from "@/lib/admin/auth";
import { hasSupabase } from "@/lib/supabase/env";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Staff login" };

export default async function Login() {
  if (!hasSupabase) return <div className="px-4 py-16"><SetupNotice /></div>;
  if (await getStaff()) redirect("/admin");
  return (
    <div className="grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full max-w-sm bg-white p-8 shadow-[0_7px_29px_rgba(100,100,111,.2)]">
        <div className="mb-6 flex items-center gap-3">
          <Crest className="h-[52px] w-[46px]" />
          <div>
            <h1 className="text-[20px] font-bold leading-tight">Staff login</h1>
            <p className="text-[13px] text-moss">Website admin panel</p>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
