import type { Metadata } from "next";
import Link from "next/link";
import { AdminHeader, Notice, smallBtn } from "@/components/admin/ui";
import { requireStaff } from "@/lib/admin/auth";
import { formatDate } from "@/lib/format";
import { PAGE_DEFS } from "@/lib/pages";
import { createSessionClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Page text" };

export default async function Pages({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [{ saved }] = await Promise.all([searchParams, requireStaff()]);
  const db = await createSessionClient();
  const { data } = await db.from("pages").select("slug, updated_at");
  const edited = Object.fromEntries((data ?? []).map((p) => [p.slug, p.updated_at as string]));
  const groups = [...new Set(PAGE_DEFS.map((p) => p.group))];
  return (
    <>
      {saved && <Notice>Saved. The website has been updated.</Notice>}
      <AdminHeader title="Page text" intro="The main text of the website's information pages. Pages you haven't edited show the built-in text." />
      <div className="max-w-4xl space-y-6">
        {groups.map((g) => (
          <section key={g} className="bg-white shadow-sm ring-1 ring-lichen/60">
            <h2 className="border-b border-lichen/60 px-4 py-3 text-[16px] font-semibold">{g}</h2>
            <ul className="divide-y divide-lichen/50">
              {PAGE_DEFS.filter((p) => p.group === g).map((p) => (
                <li key={p.slug} className="flex items-center justify-between gap-3 px-4 py-3 text-[14.5px]">
                  <span>{p.title}<small className="block text-[12.5px] text-moss/80">{edited[p.slug] ? `Edited ${formatDate(edited[p.slug])}` : "Built-in text"}</small></span>
                  <Link href={`/admin/pages/${p.slug}`} className={smallBtn}>Edit</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
