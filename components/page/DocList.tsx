import { formatDate } from "@/lib/format";
import type { Doc } from "@/lib/types";
import { Icon } from "../Icon";
import { Empty } from "./PageShell";

export function FileLink({ href, label = "View PDF" }: { href: string; label?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 whitespace-nowrap bg-moss px-3 py-1.5 text-[12.5px] font-medium uppercase tracking-wide text-white hover:bg-forest">
      <Icon name="file" className="h-4 w-4" />{label}
    </a>
  );
}

// A list of downloadable PDFs with their date and class/subject.
export function DocList({ docs, empty }: { docs: Doc[]; empty?: React.ReactNode }) {
  if (!docs.length) return <Empty>{empty}</Empty>;
  return (
    <ul className="divide-y divide-lichen/60 border border-lichen">
      {docs.map((d) => (
        <li key={d.id} className="flex flex-col gap-3 bg-white px-5 py-4 sm:flex-row sm:items-center">
          <Icon name="file" className="hidden h-9 w-9 shrink-0 text-sage sm:block" />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-forest">{d.title}</p>
            <p className="text-[13px] text-moss/90">
              {[formatDate(d.date), d.class_name, d.subject].filter(Boolean).join(" · ")}
            </p>
            {d.description && <p className="mt-1 text-[14px]">{d.description}</p>}
          </div>
          {d.file_url ? <FileLink href={d.file_url} label="Download" /> : <span className="text-[13px] text-moss/70">File coming soon</span>}
        </li>
      ))}
    </ul>
  );
}
