import type { Metadata } from "next";
import { CalendarList } from "@/components/page/Calendar";
import { DocList } from "@/components/page/DocList";
import { Block } from "@/components/page/PageShell";
import { RichPage } from "@/components/page/RichPage";
import { getCalendar, getDocuments } from "@/lib/content";
import { today } from "@/lib/format";

export const metadata: Metadata = { title: "Parent-Teacher Meetings" };

export default async function Ptm() {
  const [meetings, docs] = await Promise.all([getCalendar(["ptm"]), getDocuments(["ptm"])]);
  const now = today();
  return (
    <RichPage slug="ptm" section="parents" href="/parents/ptm">
      <Block title="Upcoming meetings" id="upcoming">
        <CalendarList events={meetings.filter((m) => (m.end_date ?? m.start_date) >= now)} empty="The next parent-teacher meeting will be announced here." />
      </Block>
      {docs.length > 0 && <Block title="PTM circulars" id="docs"><DocList docs={docs} /></Block>}
    </RichPage>
  );
}
