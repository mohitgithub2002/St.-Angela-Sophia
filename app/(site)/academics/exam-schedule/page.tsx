import type { Metadata } from "next";
import { CalendarList } from "@/components/page/Calendar";
import { DocList } from "@/components/page/DocList";
import { Block, PageShell } from "@/components/page/PageShell";
import { getCalendar, getDocuments } from "@/lib/content";

export const metadata: Metadata = { title: "Examination Schedule" };

export default async function ExamSchedule() {
  const [exams, sheets] = await Promise.all([getCalendar(["exam", "result"]), getDocuments(["datesheet"])]);
  return (
    <PageShell section="academics" href="/academics/exam-schedule" intro="Periodic tests, half-yearly, pre-board and annual examinations for the session.">
      <Block title="Examination calendar" id="calendar">
        <CalendarList events={exams} empty="The examination schedule for this session will be published here." />
      </Block>
      <Block title="Date sheets" id="datesheets">
        <DocList docs={sheets} empty="Date sheets will be uploaded here before each examination." />
      </Block>
    </PageShell>
  );
}
