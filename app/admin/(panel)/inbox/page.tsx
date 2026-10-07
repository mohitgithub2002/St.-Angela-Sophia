import type { Metadata } from "next";
import Link from "next/link";
import { deleteMessage, updateMessage } from "@/app/admin/actions";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { inputCls } from "@/components/admin/FieldsForm";
import { AdminHeader, dangerBtn, smallBtn } from "@/components/admin/ui";
import { Icon } from "@/components/Icon";
import { requireStaff } from "@/lib/admin/auth";
import { BOXES, isBox } from "@/lib/admin/inbox";
import { telHref } from "@/lib/format";
import { createSessionClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Inbox" };

const STATUS = { new: "New", read: "Read", done: "Done" } as const;
const when = (d: string) => new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });
const KIND: Record<string, string> = { contact: "General enquiry", admission: "Admission enquiry", feedback: "Parent feedback" };

type Msg = Record<string, unknown> & { id: string; status: keyof typeof STATUS; notes: string; created_at: string; name: string };

export default async function Inbox({ searchParams }: { searchParams: Promise<{ box?: string; status?: string }> }) {
  const [sp] = await Promise.all([searchParams, requireStaff()]);
  const box = isBox(sp.box) ? sp.box : "enquiries";
  const status = sp.status && sp.status in STATUS ? sp.status : undefined;
  const db = await createSessionClient();
  let q = db.from(BOXES[box].table).select("*").order("created_at", { ascending: false }).limit(200);
  if (status) q = q.eq("status", status);
  const { data, error } = await q;
  if (error) throw new Error(error.message);
  const msgs = (data ?? []) as Msg[];
  const tab = (href: string, label: string, on: boolean) => (
    <Link href={href} aria-current={on ? "page" : undefined} className={`${smallBtn} aria-[current=page]:border-moss aria-[current=page]:bg-moss aria-[current=page]:text-white`}>{label}</Link>
  );

  return (
    <>
      <AdminHeader
        title="Inbox"
        intro="Messages sent through the website's forms. Mark them as done once handled; use notes to record what was done."
        actions={<a href={`/admin/inbox/export?box=${box}`} className={smallBtn}><Icon name="download" className="h-4 w-4" />Export CSV</a>}
      />
      <div className="mb-3 flex flex-wrap gap-1.5">{(Object.keys(BOXES) as (keyof typeof BOXES)[]).map((b) => tab(`/admin/inbox?box=${b}`, BOXES[b].label, b === box))}</div>
      <div className="mb-5 flex flex-wrap gap-1.5">
        {tab(`/admin/inbox?box=${box}`, "All", !status)}
        {Object.entries(STATUS).map(([s, l]) => tab(`/admin/inbox?box=${box}&status=${s}`, l, s === status))}
      </div>

      {msgs.length === 0 && <p className="bg-white p-8 text-center text-moss shadow-sm ring-1 ring-lichen/60">No messages here.</p>}
      <ul className="max-w-4xl space-y-4">
        {msgs.map((m) => {
          const meta = (m.meta ?? {}) as Record<string, string>;
          const details: [string, unknown][] = [
            ["Type", m.kind ? KIND[String(m.kind)] : undefined],
            ["Post", m.post],
            ["Batch", m.batch],
            ["Phone", m.phone],
            ["Email", m.email],
            ["Daughter / student", meta.daughter || meta.student],
            ["Class", meta.class],
            ["Occupation", m.occupation],
            ["City", m.city],
            ["Qualification", m.qualification],
            ["Experience", m.experience],
          ];
          return (
            <li key={m.id} className={`bg-white p-5 shadow-sm ring-1 ${m.status === "new" ? "ring-moss" : "ring-lichen/60"}`}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="text-[17px] font-semibold">{m.name}{m.subject ? <span className="font-normal text-moss"> · {String(m.subject)}</span> : null}</h2>
                  <p className="text-[12.5px] text-moss/80">{when(m.created_at)}</p>
                </div>
                <span className={`px-2 py-0.5 text-[11.5px] font-semibold uppercase ${m.status === "new" ? "bg-moss text-white" : m.status === "done" ? "bg-pista text-forest" : "bg-gray-200 text-gray-700"}`}>{STATUS[m.status]}</span>
              </div>
              <dl className="mt-3 grid gap-x-4 gap-y-1 text-[14px] sm:grid-cols-[150px_1fr]">
                {details.filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="font-medium text-forest">{k}</dt>
                    <dd className="break-words">
                      {k === "Phone" ? <a href={telHref(String(v))} className="text-moss underline">{String(v)}</a> : k === "Email" ? <a href={`mailto:${v}`} className="text-moss underline">{String(v)}</a> : String(v)}
                    </dd>
                  </div>
                ))}
              </dl>
              {m.message ? <p className="mt-3 whitespace-pre-line border-l-4 border-lichen bg-mint px-4 py-3 text-[14.5px]">{String(m.message)}</p> : null}
              {m.resume_path ? <a href={`/admin/inbox/resume/${m.id}`} target="_blank" className={`${smallBtn} mt-3`}><Icon name="file" className="h-4 w-4" />Download résumé</a> : null}
              <div className="mt-4 flex flex-col gap-2 border-t border-lichen/50 pt-4 sm:flex-row sm:items-end">
                <form action={updateMessage.bind(null, BOXES[box].table, m.id)} className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-end">
                  <label className="text-[13px] font-medium">Status
                    <select name="status" defaultValue={m.status === "new" ? "read" : m.status} className={`${inputCls} !py-1.5`}>
                      {Object.entries(STATUS).map(([s, l]) => <option key={s} value={s}>{l}</option>)}
                    </select>
                  </label>
                  <label className="flex-1 text-[13px] font-medium">Notes<input name="notes" defaultValue={m.notes} placeholder="e.g. Called back on 3 Oct" className={`${inputCls} !py-1.5`} /></label>
                  <button className={smallBtn}>Save</button>
                </form>
                <form action={deleteMessage.bind(null, BOXES[box].table, m.id)}>
                  <ConfirmButton message="Delete this message permanently?" className={dangerBtn}>Delete</ConfirmButton>
                </form>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
