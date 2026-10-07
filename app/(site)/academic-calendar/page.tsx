import type { Metadata } from "next";
import { CalendarList, TypeBadge } from "@/components/page/Calendar";
import { DocList } from "@/components/page/DocList";
import { Block, PageShell } from "@/components/page/PageShell";
import { getCalendar, getDocuments } from "@/lib/content";
import { EVENT_TYPES, type EventType } from "@/lib/types";

export const metadata: Metadata = { title: "Academic Calendar" };

export default async function AcademicCalendar() {
  const [events, docs] = await Promise.all([getCalendar(), getDocuments(["calendar"])]);
  // Show the latest session that has dates; older sessions stay in the admin panel.
  const session = events.map((e) => e.session).filter(Boolean).sort().pop();
  const shown = session ? events.filter((e) => e.session === session) : events;
  return (
    <PageShell
      section="academics"
      href="/academic-calendar"
      title="Academic Calendar"
      intro={`Holidays, examinations, result announcements, parent-teacher meetings and school events${session ? ` for the ${session} session` : ""}.`}
    >
      <ul className="mb-8 flex flex-wrap gap-2" aria-label="Key">
        {(Object.keys(EVENT_TYPES) as EventType[]).map((t) => <li key={t}><TypeBadge type={t} /></li>)}
      </ul>
      <CalendarList events={shown} empty="The academic calendar for this session will be published here." />
      {docs.length > 0 && <Block title="Download the calendar" id="download" className="mt-12"><DocList docs={docs} /></Block>}
    </PageShell>
  );
}
