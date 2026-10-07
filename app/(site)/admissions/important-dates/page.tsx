import type { Metadata } from "next";
import { CalendarList } from "@/components/page/Calendar";
import { PageShell } from "@/components/page/PageShell";
import { getCalendar } from "@/lib/content";

export const metadata: Metadata = { title: "Important Dates" };

export default async function ImportantDates() {
  const dates = await getCalendar(["admission"]);
  return (
    <PageShell section="admissions" href="/admissions/important-dates" intro="Registration windows, interaction and aptitude test dates, result lists and fee deposit deadlines.">
      <CalendarList events={dates} empty="Admission dates for the coming session will be announced here. Nursery to Class I registration usually opens on 1 December." />
    </PageShell>
  );
}
