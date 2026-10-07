import Link from "next/link";
import { AdminHeader, Notice } from "@/components/admin/ui";
import { Icon, type IconName } from "@/components/Icon";
import { requireStaff } from "@/lib/admin/auth";
import { MPD_SLOTS } from "@/lib/data";
import { formatDate, formatRange, today } from "@/lib/format";
import { createSessionClient } from "@/lib/supabase/server";
import { EVENT_TYPES, type CalendarEvent } from "@/lib/types";

const shortcuts: { href: string; label: string; icon: IconName }[] = [
  { href: "/admin/announcements/new", label: "Post a notice", icon: "bullhorn" },
  { href: "/admin/documents/new", label: "Upload a circular / PDF", icon: "upload" },
  { href: "/admin/fees", label: "Update fees", icon: "rupee" },
  { href: "/admin/results/new", label: "Add a board result", icon: "chart" },
  { href: "/admin/calendar/new", label: "Add a calendar date", icon: "calendar" },
  { href: "/admin/albums/new", label: "New photo album", icon: "camera" },
];

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const [{ denied }, staff, db] = await Promise.all([searchParams, requireStaff(), createSessionClient()]);
  const [enq, alumni, jobs, slots, upcoming, recentDocs] = await Promise.all([
    db.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
    db.from("alumni_registrations").select("id", { count: "exact", head: true }).eq("status", "new"),
    db.from("job_applications").select("id", { count: "exact", head: true }).eq("status", "new"),
    db.from("mpd_documents").select("slot, file_url"),
    db.from("calendar_events").select("*").gte("start_date", today()).order("start_date").limit(5),
    db.from("documents").select("id, title, category, date").order("updated_at", { ascending: false }).limit(5),
  ]);
  const uploaded = new Set((slots.data ?? []).filter((s) => s.file_url).map((s) => s.slot));
  const missing = MPD_SLOTS.filter((s) => !uploaded.has(s.slot));

  const tiles = [
    { label: "New enquiries & feedback", n: enq.count ?? 0, href: "/admin/inbox?box=enquiries" },
    { label: "New alumni registrations", n: alumni.count ?? 0, href: "/admin/inbox?box=alumni" },
    { label: "New job applications", n: jobs.count ?? 0, href: "/admin/inbox?box=applications" },
  ];

  return (
    <>
      {denied && <Notice tone="warn">Only an administrator can open that page.</Notice>}
      <AdminHeader title={`Welcome${staff.name ? `, ${staff.name}` : ""}`} intro="Keep the website up to date. Changes appear on the live site as soon as you save." />

      <div className="grid gap-4 sm:grid-cols-3">
        {tiles.map((t) => (
          <Link key={t.label} href={t.href} className="bg-white p-5 shadow-sm ring-1 ring-lichen/60 hover:ring-moss">
            <b className="block font-serif text-[34px] leading-none text-forest">{t.n}</b>
            <span className="mt-1 block text-[14px] text-moss">{t.label}</span>
          </Link>
        ))}
      </div>

      {missing.length > 0 && (
        <div className="mt-6 border-l-4 border-amber-600 bg-amber-50 p-5 text-amber-900">
          <p className="font-semibold">Mandatory Public Disclosure: {missing.length} of {MPD_SLOTS.length} required documents not uploaded</p>
          <p className="mt-1 text-[14px]">CBSE requires these on the website. <Link href="/admin/mpd" className="font-semibold underline">Upload them now</Link>.</p>
        </div>
      )}

      <h2 className="mb-3 mt-8 text-[18px] font-semibold">Quick actions</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {shortcuts.map((s) => (
          <Link key={s.href} href={s.href} className="flex items-center gap-3 bg-white px-4 py-3.5 text-[14.5px] font-medium text-forest shadow-sm ring-1 ring-lichen/60 hover:bg-mint hover:ring-moss">
            <Icon name={s.icon} className="h-6 w-6 shrink-0 text-moss" />{s.label}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="bg-white p-5 shadow-sm ring-1 ring-lichen/60">
          <h2 className="mb-3 text-[17px] font-semibold">Coming up</h2>
          {(upcoming.data as CalendarEvent[] | null)?.length ? (
            <ul className="divide-y divide-lichen/50 text-[14px]">
              {(upcoming.data as CalendarEvent[]).map((e) => (
                <li key={e.id} className="flex justify-between gap-3 py-2"><span>{e.title} <small className="text-moss/80">({EVENT_TYPES[e.type]})</small></span><span className="shrink-0 text-moss">{formatRange(e.start_date, e.end_date)}</span></li>
              ))}
            </ul>
          ) : <p className="text-[14px] text-moss">No upcoming dates. <Link href="/admin/calendar/new" className="underline">Add one</Link>.</p>}
        </section>
        <section className="bg-white p-5 shadow-sm ring-1 ring-lichen/60">
          <h2 className="mb-3 text-[17px] font-semibold">Recently updated documents</h2>
          {recentDocs.data?.length ? (
            <ul className="divide-y divide-lichen/50 text-[14px]">
              {recentDocs.data.map((d) => (
                <li key={d.id} className="flex justify-between gap-3 py-2"><Link href={`/admin/documents/${d.id}`} className="hover:underline">{d.title}</Link><span className="shrink-0 text-moss">{formatDate(d.date)}</span></li>
              ))}
            </ul>
          ) : <p className="text-[14px] text-moss">No documents yet. <Link href="/admin/documents/new" className="underline">Upload one</Link>.</p>}
        </section>
      </div>
    </>
  );
}
