import Link from "next/link";
import { Sidebar } from "@/components/admin/Sidebar";
import { SetupNotice } from "@/components/admin/SetupNotice";
import { Icon, type IconName } from "@/components/Icon";
import { requireStaff } from "@/lib/admin/auth";
import { getResource } from "@/lib/admin/resources";
import { hasSupabase } from "@/lib/supabase/env";
import { createSessionClient } from "@/lib/supabase/server";
import { signOut } from "../actions";

export const dynamic = "force-dynamic";

const r = (key: string, icon: IconName) => ({ href: `/admin/${key}`, label: getResource(key)!.label, icon });

export default async function Panel({ children }: { children: React.ReactNode }) {
  if (!hasSupabase) return <div className="px-4 py-16"><SetupNotice /></div>;
  const staff = await requireStaff();
  const db = await createSessionClient();
  const counts = await Promise.all(
    ["enquiries", "alumni_registrations", "job_applications"].map((t) => db.from(t).select("id", { count: "exact", head: true }).eq("status", "new")),
  );
  const unread = counts.reduce((n, c) => n + (c.count ?? 0), 0);

  const groups = [
    { title: "Overview", items: [{ href: "/admin", label: "Dashboard", icon: "home" as IconName }, { href: "/admin/inbox", label: "Inbox", icon: "inbox" as IconName, badge: unread }] },
    { title: "Regular updates", items: [r("announcements", "bullhorn"), r("documents", "file"), r("fees", "rupee"), r("results", "chart"), r("calendar", "calendar")] },
    { title: "CBSE disclosure", items: [{ href: "/admin/mpd", label: "Mandatory disclosure", icon: "shield" as IconName }, r("committees", "user"), { href: "/admin/settings", label: "School details", icon: "gear" as IconName }] },
    { title: "Website pages", items: [{ href: "/admin/pages", label: "Page text", icon: "pen" as IconName }, r("slides", "image"), r("facts", "star"), r("values", "heart"), r("timeline", "list"), r("stages", "book"), r("streams", "flask"), r("admission-steps", "building")] },
    { title: "Campus & student life", items: [r("facilities", "home"), r("transport", "bus"), r("clubs", "star"), r("events", "calendar"), r("achievements", "trophy")] },
    { title: "Gallery", items: [r("albums", "camera"), r("videos", "play")] },
    { title: "Alumni & careers", items: [r("notable-alumni", "cap"), r("alumni-events", "calendar"), r("vacancies", "pen")] },
    ...(staff.role === "super_admin" ? [{ title: "Administration", items: [{ href: "/admin/users", label: "Staff accounts", icon: "user" as IconName }] }] : []),
  ];

  return (
    <div className="lg:flex">
      <Sidebar
        groups={groups}
        footer={
          <div className="space-y-3 text-[13px]">
            <p className="text-white/80">{staff.name || staff.email}<span className="block text-[12px] text-lichen">{staff.role === "super_admin" ? "Administrator" : "Editor"}</span></p>
            <Link href="/" target="_blank" className="flex items-center gap-2 text-white/80 hover:text-white"><Icon name="external" className="h-4 w-4" />View website</Link>
            <form action={signOut}><button className="flex items-center gap-2 text-white/80 hover:text-white"><Icon name="logout" className="h-4 w-4" />Sign out</button></form>
          </div>
        }
      />
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-8">{children}</main>
    </div>
  );
}
