import type { Metadata } from "next";
import Link from "next/link";
import { Celebrations, EventCards } from "@/components/CampusLife";
import { Block, Empty, PageShell } from "@/components/page/PageShell";
import { getEvents } from "@/lib/content";

export const metadata: Metadata = { title: "Events & Celebrations" };

export default async function Events() {
  const events = await getEvents();
  const school = events.filter((e) => e.kind === "event");
  const celebrations = events.filter((e) => e.kind === "celebration");
  return (
    <PageShell section="studentLife" href="/student-life/events" intro="Annual Day, Sports Day, inter-school quizzes, national days and festivals: the school year is full of occasions to celebrate.">
      <Block title="School events" id="events">{school.length ? <EventCards events={school} /> : <Empty />}</Block>
      <Block title="Celebrations through the year" id="celebrations">
        {celebrations.length ? <Celebrations items={celebrations.filter((c) => c.image).slice(0, 3)} /> : <Empty />}
        {celebrations.length > 0 && (
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {celebrations.map((c) => <li key={c.id} className="border-l-4 border-sage bg-mint px-4 py-3"><b className="text-forest">{c.title}</b>{c.text && <p className="text-[14px]">{c.text}</p>}</li>)}
          </ul>
        )}
        <p className="mt-6"><Link href="/gallery" className="btn">See the photo gallery</Link></p>
      </Block>
    </PageShell>
  );
}
