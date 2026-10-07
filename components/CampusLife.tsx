import Link from "next/link";
import type { Club, SchoolEvent } from "@/lib/types";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { SectionHead } from "./SectionHead";

export function EventCards({ events }: { events: SchoolEvent[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {events.map((e) => (
        <article key={e.id} className="group bg-white text-center shadow-[0_2px_8px_rgba(99,99,99,.2)] transition-transform hover:-translate-y-1">
          {e.image ? (
            <Photo src={e.image} alt={e.title} sizes="(min-width: 1024px) 280px, 50vw" className="aspect-[4/3]" />
          ) : (
            <div className="grid aspect-[4/3] place-items-center bg-gradient-to-br from-sage to-forest text-white">
              <Icon name={e.icon} className="h-[40%] w-[40%] transition-transform duration-500 group-hover:scale-110" />
            </div>
          )}
          <div className="px-5 pb-6 pt-5">
            <h3 className="mb-1.5 text-[17px] font-semibold">{e.title}</h3>
            <p className="text-[14px]">{e.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function Celebrations({ items }: { items: SchoolEvent[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
      {items.map((c, n) => (
        <figure key={c.id} className={`group relative overflow-hidden ${n === 0 ? "aspect-[16/10] md:col-span-2 md:row-span-2 md:aspect-auto" : "aspect-[16/10]"}`}>
          <Photo
            src={c.image}
            alt={c.text || c.title}
            sizes={n === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/85 to-transparent px-4 pb-3 pt-10 text-[14px] font-medium uppercase tracking-wider text-white">
            {c.title}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function ClubChips({ clubs }: { clubs: Club[] }) {
  return (
    <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
      {clubs.map((c) => <li key={c.id} className="border border-moss/25 bg-white px-4 py-2 text-[14px] text-forest">{c.name}</li>)}
    </ul>
  );
}

export function CampusLife({ events, clubs }: { events: SchoolEvent[]; clubs: Club[] }) {
  const celebrations = events.filter((e) => e.kind === "celebration" && e.image).slice(0, 3);
  return (
    <section id="activities" aria-labelledby="act-title" className="py-16">
      <div className="wrap">
        <SectionHead id="act-title" title="Events" accent="& Clubs">
          Our inter-school events bring girls from across Jaipur to our campus every year.
        </SectionHead>
        <EventCards events={events.filter((e) => e.kind === "event").slice(0, 4)} />

        {celebrations.length > 0 && (
          <div className="mt-14">
            <h3 className="text-center text-[20px] font-semibold uppercase">Celebrations through the year</h3>
            <p className="mb-6 mt-1.5 text-center">Every festival is a school festival here, whatever a girl&apos;s faith.</p>
            <Celebrations items={celebrations} />
          </div>
        )}

        <div className="mt-14 bg-mint p-8 text-center">
          <h3 className="text-[20px] font-semibold uppercase">Clubs for every interest</h3>
          <p className="mt-1.5">Every girl joins a club. Many join three.</p>
          <ClubChips clubs={clubs} />
          <Link href="/student-life/clubs" className="btn mt-6">Student Life</Link>
        </div>
      </div>
    </section>
  );
}
