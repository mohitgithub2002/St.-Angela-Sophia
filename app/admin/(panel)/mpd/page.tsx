import type { Metadata } from "next";
import Link from "next/link";
import { saveContent } from "@/app/admin/actions";
import { FieldsForm } from "@/components/admin/FieldsForm";
import { AdminHeader, Notice, smallBtn } from "@/components/admin/ui";
import { Icon } from "@/components/Icon";
import { requireStaff } from "@/lib/admin/auth";
import { MPD_FIELDS } from "@/lib/admin/content-fields";
import { defaultMpd, MPD_SLOTS } from "@/lib/data";
import { MPD_HREF } from "@/lib/nav";
import { createSessionClient } from "@/lib/supabase/server";
import { MpdSlots } from "./MpdSlots";

export const metadata: Metadata = { title: "Mandatory disclosure" };

const others = [
  { href: "/admin/settings", label: "A. General information (school details, principal, contact)" },
  { href: "/admin/fees", label: "C1. Fee structure" },
  { href: "/admin/calendar", label: "C2. Annual academic calendar" },
  { href: "/admin/committees?committee=smc", label: "C3. School Management Committee (SMC)" },
  { href: "/admin/committees?committee=pta", label: "C4. Parents Teachers Association (PTA)" },
  { href: "/admin/results", label: "C5. Board results (last three years)" },
];

export default async function Mpd({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [{ saved }] = await Promise.all([searchParams, requireStaff()]);
  const db = await createSessionClient();
  const [{ data: info }, { data: docs }] = await Promise.all([
    db.from("site_content").select("value").eq("key", "mpd").maybeSingle(),
    db.from("mpd_documents").select("slot, file_url"),
  ]);
  const files = Object.fromEntries((docs ?? []).filter((d) => d.file_url).map((d) => [d.slot, d.file_url as string]));
  return (
    <>
      {saved && <Notice>Saved. The disclosure page has been updated.</Notice>}
      <AdminHeader
        title="Mandatory Public Disclosure"
        intro="Everything CBSE requires in Appendix IX. Upload self-attested copies (signed by the Chairman/Manager/Secretary and Principal) as PDFs."
        actions={<Link href={MPD_HREF} target="_blank" className={smallBtn}><Icon name="external" className="h-4 w-4" />View public page</Link>}
      />
      <div className="max-w-4xl space-y-10">
        <section>
          <h2 className="mb-3 text-[19px] font-bold">B. Documents and information</h2>
          <MpdSlots slots={MPD_SLOTS} files={files} />
        </section>
        <section>
          <h2 className="mb-3 text-[19px] font-bold">A and C. Edited elsewhere</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {others.map((o) => (
              <li key={o.href}><Link href={o.href} className="flex items-center justify-between gap-3 bg-white px-4 py-3 text-[14px] text-forest shadow-sm ring-1 ring-lichen/60 hover:ring-moss">{o.label}<Icon name="arrow" className="h-4 w-4 shrink-0 text-sage" /></Link></li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-[19px] font-bold">D and E. Staff and infrastructure</h2>
          <FieldsForm groups={MPD_FIELDS} values={{ ...defaultMpd, ...(info?.value ?? {}) }} action={saveContent.bind(null, "mpd")} submit="Save staff and infrastructure" />
        </section>
      </div>
    </>
  );
}
