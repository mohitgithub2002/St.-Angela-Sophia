import type { TimelineItem } from "@/lib/types";

// Vertical version of the history timeline, for inner pages.
export function HistoryList({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative border-l-2 border-lichen pl-7">
      {items.map((t) => (
        <li key={t.id} className="relative pb-7 last:pb-0">
          <span className="absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-4 border-white bg-moss ring-2 ring-lichen" aria-hidden="true" />
          <b className="font-serif text-[26px] font-bold leading-none text-moss">{t.year}</b>
          <h3 className="mt-1 text-[16px] font-semibold uppercase">{t.title}</h3>
          <p className="text-[14.5px]">{t.text}</p>
        </li>
      ))}
    </ol>
  );
}
