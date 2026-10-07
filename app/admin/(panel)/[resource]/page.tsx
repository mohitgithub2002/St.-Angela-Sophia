import Link from "next/link";
import { notFound } from "next/navigation";
import { copyFeeSession, deleteRow, moveRow, togglePublished } from "@/app/admin/actions";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { inputCls } from "@/components/admin/FieldsForm";
import { AdminHeader, dangerBtn, Notice, smallBtn } from "@/components/admin/ui";
import { Icon } from "@/components/Icon";
import { requireStaff } from "@/lib/admin/auth";
import { getResource } from "@/lib/admin/resources";
import { createSessionClient } from "@/lib/supabase/server";

type Row = Record<string, unknown> & { id: string };

export default async function ResourceList({ params, searchParams }: { params: Promise<{ resource: string }>; searchParams: Promise<Record<string, string | undefined>> }) {
  const [{ resource }, sp] = await Promise.all([params, searchParams]);
  const res = getResource(resource);
  if (!res) notFound();
  await requireStaff();
  const db = await createSessionClient();
  let query = db.from(res.table).select("*");
  for (const [col, asc] of res.order) query = query.order(col, { ascending: asc, nullsFirst: false });
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  const all = (data ?? []) as Row[];

  const f = res.filter;
  const filterOptions: [string, string][] = f ? f.options ?? [...new Set(all.map((r) => String(r[f.field])))].sort().reverse().map((v) => [v, v]) : [];
  const active = f ? sp[f.field] : undefined;
  const q = (sp.q ?? "").trim().toLowerCase();
  const rows = all.filter(
    (r) => (!f || !active || String(r[f.field]) === active) && (!q || res.columns.some((c) => String(r[c.name] ?? "").toLowerCase().includes(q))),
  );
  const ids = rows.map((r) => r.id);
  const canMove = res.sortable && !q;
  const newUrl = `/admin/${res.key}/new${f && active ? `?${f.field}=${encodeURIComponent(active)}` : ""}`;

  return (
    <>
      {sp.saved && <Notice>Saved. The website has been updated.</Notice>}
      <AdminHeader
        title={res.label}
        intro={res.intro}
        actions={<Link href={newUrl} className="btn inline-flex items-center gap-2"><Icon name="plus" className="h-4 w-4" />Add {res.singular}</Link>}
      />

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {f && (
          <nav aria-label={`Filter by ${f.label}`} className="flex flex-wrap gap-1.5">
            <Link href={`/admin/${res.key}`} aria-current={!active ? "page" : undefined} className={`${smallBtn} aria-[current=page]:border-moss aria-[current=page]:bg-moss aria-[current=page]:text-white`}>All</Link>
            {filterOptions.map(([v, l]) => (
              <Link key={v} href={`/admin/${res.key}?${f.field}=${encodeURIComponent(v)}`} aria-current={active === v ? "page" : undefined} className={`${smallBtn} aria-[current=page]:border-moss aria-[current=page]:bg-moss aria-[current=page]:text-white`}>{l}</Link>
            ))}
          </nav>
        )}
        <form className="flex gap-2 md:ml-auto">
          {f && active && <input type="hidden" name={f.field} value={active} />}
          <input name="q" defaultValue={sp.q} placeholder="Search…" aria-label="Search" className={`${inputCls} !py-1.5 md:w-56`} />
          <button className={smallBtn}>Search</button>
        </form>
      </div>

      {res.key === "fees" && (
        <form action={copyFeeSession} className="mb-4 flex flex-wrap items-end gap-2 bg-white p-4 text-[14px] shadow-sm ring-1 ring-lichen/60">
          <label className="flex flex-col gap-1">Copy all fees from session
            <select name="from" className={`${inputCls} !py-1.5`}>{filterOptions.map(([v]) => <option key={v}>{v}</option>)}</select>
          </label>
          <label className="flex flex-col gap-1">to new session<input name="to" required placeholder="2027-28" className={`${inputCls} !py-1.5`} /></label>
          <button className={smallBtn} disabled={!filterOptions.length}>Copy session</button>
        </form>
      )}

      {rows.length === 0 ? (
        <p className="bg-white p-8 text-center text-moss shadow-sm ring-1 ring-lichen/60">Nothing here yet. <Link href={newUrl} className="font-medium underline">Add the first {res.singular}</Link>.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-sm ring-1 ring-lichen/60">
          <table className="w-full min-w-[640px] text-left text-[14px]">
            <thead className="bg-mint text-[12.5px] uppercase tracking-wide text-forest">
              <tr>
                {res.columns.map((c) => <th key={c.name} scope="col" className="px-4 py-3 font-semibold">{c.label}</th>)}
                {res.publishable && <th scope="col" className="px-4 py-3 font-semibold">On website</th>}
                <th scope="col" className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lichen/50">
              {rows.map((r, i) => (
                <tr key={r.id} className="align-top hover:bg-[#fafcf7]">
                  {res.columns.map((c, n) => (
                    <td key={c.name} className="max-w-[340px] px-4 py-3">
                      {n === 0 ? (
                        <Link href={`/admin/${res.key}/${r.id}`} className="font-medium text-forest hover:underline">{(c.format ? c.format(r) : String(r[c.name] ?? "")) || "(untitled)"}</Link>
                      ) : (
                        <span className="line-clamp-2">{c.format ? c.format(r) : String(r[c.name] ?? "")}</span>
                      )}
                    </td>
                  ))}
                  {res.publishable && (
                    <td className="px-4 py-3">
                      <form action={togglePublished.bind(null, res.key, r.id, !r.published)}>
                        <button className={`px-2 py-0.5 text-[12px] font-semibold uppercase ${r.published ? "bg-pista text-forest" : "bg-gray-200 text-gray-600"}`} title="Click to change">
                          {r.published ? "Shown" : "Hidden"}
                        </button>
                      </form>
                    </td>
                  )}
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1.5">
                      {canMove && (
                        <>
                          <form action={moveRow.bind(null, res.table, ids, r.id, -1)}><button disabled={i === 0} aria-label="Move up" className={`${smallBtn} !px-2 disabled:opacity-30`}><Icon name="up" className="h-4 w-4" /></button></form>
                          <form action={moveRow.bind(null, res.table, ids, r.id, 1)}><button disabled={i === rows.length - 1} aria-label="Move down" className={`${smallBtn} !px-2 disabled:opacity-30`}><Icon name="up" className="h-4 w-4 rotate-180" /></button></form>
                        </>
                      )}
                      <Link href={`/admin/${res.key}/${r.id}`} className={smallBtn}>Edit</Link>
                      <form action={deleteRow.bind(null, res.key, r.id)}>
                        <ConfirmButton message={`Delete this ${res.singular}? This can't be undone.`} className={dangerBtn}>Delete</ConfirmButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-3 text-[13px] text-moss/80">{rows.length} of {all.length} shown{active || q ? ` · ` : ""}{(active || q) && <Link href={`/admin/${res.key}`} className="underline">clear filters</Link>}</p>
    </>
  );
}
