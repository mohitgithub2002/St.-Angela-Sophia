import type { Metadata } from "next";
import Link from "next/link";
import { MemberCards } from "@/components/page/Members";
import { Block, Empty } from "@/components/page/PageShell";
import { RichPage } from "@/components/page/RichPage";
import { Photo } from "@/components/Photo";
import { getAlumniEvents, getNotableAlumni } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Alumni" };

export default async function Alumni() {
  const [notable, events] = await Promise.all([getNotableAlumni(), getAlumniEvents()]);
  return (
    <RichPage slug="alumni" section="alumni" href="/alumni" title="Alumni" image="alumni.jpg">
      <p className="-mt-6 mb-12"><Link href="/alumni/register" className="btn">Register as an alumna</Link></p>
      <Block title="Notable alumni" id="notable">
        {notable.length ? (
          <MemberCards
            members={notable.map((a) => ({ id: a.id, sort: a.sort, committee: "management", name: a.name, designation: [a.title, a.batch && `Batch of ${a.batch}`].filter(Boolean).join(" · "), representing: a.text, photo: a.photo }))}
          />
        ) : <Empty>Stories of our distinguished alumnae will be shared here. Know someone we should feature? Tell us when you register.</Empty>}
      </Block>
      <Block title="Alumni events" id="events">
        {events.length ? (
          <ul className="space-y-4">
            {events.map((e) => (
              <li key={e.id} className="flex flex-col overflow-hidden bg-white shadow-[0_2px_10px_rgba(0,0,0,.08)] sm:flex-row">
                {e.image && <Photo src={e.image} alt={e.title} sizes="(min-width: 640px) 220px, 100vw" className="aspect-video sm:aspect-auto sm:w-[220px] sm:shrink-0" />}
                <div className="p-5">
                  <p className="text-[13px] font-semibold uppercase tracking-wide text-sage">{[formatDate(e.date), e.venue].filter(Boolean).join(" · ")}</p>
                  <h3 className="text-[18px] font-semibold">{e.title}</h3>
                  {e.text && <p className="mt-1 text-[14.5px]">{e.text}</p>}
                </div>
              </li>
            ))}
          </ul>
        ) : <Empty>Reunions and alumni gatherings will be announced here.</Empty>}
      </Block>
    </RichPage>
  );
}
