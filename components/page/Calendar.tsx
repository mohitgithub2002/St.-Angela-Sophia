import { formatMonth, formatRange } from "@/lib/format";
import { EVENT_TYPES, type CalendarEvent, type EventType } from "@/lib/types";
import { Empty } from "./PageShell";

const badge: Record<EventType, string> = {
  holiday: "bg-pista text-forest",
  exam: "bg-forest text-white",
  event: "bg-sage text-white",
  ptm: "bg-moss text-white",
  result: "bg-lichen text-forest",
  admission: "bg-white text-moss ring-1 ring-moss ring-inset",
};

export function TypeBadge({ type }: { type: EventType }) {
  return <span className={`inline-block px-2 py-0.5 text-[11.5px] font-semibold uppercase tracking-wide ${badge[type]}`}>{EVENT_TYPES[type]}</span>;
}

// Dates grouped by month.
export function CalendarList({ events, empty }: { events: CalendarEvent[]; empty?: React.ReactNode }) {
  if (!events.length) return <Empty>{empty ?? "Dates will be published here."}</Empty>;
  const months = new Map<string, CalendarEvent[]>();
  for (const e of events) {
    const k = e.start_date.slice(0, 7);
    months.set(k, [...(months.get(k) ?? []), e]);
  }
  return (
    <div className="space-y-8">
      {[...months].map(([k, list]) => (
        <div key={k}>
          <h3 className="mb-3 border-b-2 border-moss pb-1.5 text-[18px] font-semibold uppercase">{formatMonth(`${k}-01`)}</h3>
          <ul className="space-y-2">
            {list.map((e) => (
              <li key={e.id} className="grid gap-x-5 gap-y-1 border-l-4 border-sage bg-white px-4 py-3 shadow-[0_1px_4px_rgba(0,0,0,.06)] sm:grid-cols-[190px_1fr]">
                <span className="text-[14px] font-semibold text-moss">{formatRange(e.start_date, e.end_date)}</span>
                <div>
                  <p className="flex flex-wrap items-center gap-2 font-medium text-forest">{e.title} <TypeBadge type={e.type} /></p>
                  {e.description && <p className="mt-1 text-[14px]">{e.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
