import Link from "next/link";
import { formatDate, formatRange } from "@/lib/format";
import { EVENT_TYPES, type Announcement, type CalendarEvent } from "@/lib/types";
import { Icon } from "./Icon";
import { Photo } from "./Photo";

// Three columns: teaching, photos with a registration button, and the notice board
// (announcements, circulars and the next few dates from the academic calendar).
export function Highlights({ notices, upcoming, registrationUrl }: { notices: Announcement[]; upcoming: CalendarEvent[]; registrationUrl: string }) {
  const updates = [
    ...notices.map((n) => ({ text: n.title, date: formatDate(n.date), href: n.file_url || n.link || "/downloads/circulars" })),
    ...upcoming.map((e) => ({ text: `${EVENT_TYPES[e.type]}: ${e.title}`, date: formatRange(e.start_date, e.end_date), href: "/academic-calendar" })),
  ];
  return (
    <section aria-label="Highlights" className="py-16">
      <div className="wrap grid gap-10 lg:grid-cols-3">
        <div>
          <h2 className="title">Teaching <span className="text-sage">that Lasts</span></h2>
          <span className="mt-4 block h-[3px] w-6 bg-moss" aria-hidden="true" />
          <p className="mt-5">
            Our teachers explain until girls understand rather than memorise. Small steps, regular feedback and close tracking of each girl&apos;s progress carry her from first words to board exams.
          </p>
          <p className="mt-3">
            Smart boards in every classroom, well-equipped science labs, a 4,000-book reference library and a career counselling cell support every stage from Nursery to Class XII.
          </p>
          <Link href="/academics" className="btn mt-6">Read More</Link>
        </div>

        <div className="flex flex-col gap-4">
          <Photo src="highlight-1.jpg" alt="Pre-primary girls showing their drawings at Monsoon Magic" sizes="(min-width: 1024px) 380px, 100vw" className="aspect-video w-full" />
          <Photo src="highlight-2.jpg" alt="Students and teachers on the Oxygen Yatra tree-planting drive" sizes="(min-width: 1024px) 380px, 100vw" className="aspect-video w-full" />
          <a href={registrationUrl} target="_blank" rel="noopener" className="btn text-center">Online Registration</a>
        </div>

        <div id="whats-new">
          <h2 className="title">Notice <span className="text-sage">Board</span></h2>
          <span className="mt-4 block h-[3px] w-6 bg-moss" aria-hidden="true" />
          <div className="group relative mt-5 h-[340px] overflow-hidden border border-lichen/50 bg-mint">
            {updates.length === 0 ? (
              <p className="p-4 text-[14px]">No notices right now.</p>
            ) : (
              <ul className={`${updates.length > 5 ? "animate-ticker group-hover:[animation-play-state:paused]" : ""} motion-reduce:h-full motion-reduce:overflow-y-auto`}>
                {(updates.length > 5 ? [...updates, ...updates] : updates).map((u, i) => (
                  <li key={i} aria-hidden={i >= updates.length} className="border-b border-lichen/50 px-4 py-3">
                    <a
                      href={u.href}
                      tabIndex={i >= updates.length ? -1 : undefined}
                      {...(/^https?:/.test(u.href) ? { target: "_blank", rel: "noopener" } : {})}
                      className="flex gap-3 text-[14px] leading-snug text-moss hover:text-forest"
                    >
                      <Icon name="right" className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                      <span>
                        {u.text}
                        {u.date && <small className="mt-0.5 block text-[12px] text-moss/80">{u.date}</small>}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className="mt-2 flex justify-between text-[13px] text-moss/80">
            <span>{updates.length > 5 ? "Hover over the list to pause it." : ""}</span>
            <Link href="/downloads/circulars" className="font-medium text-moss hover:underline">All circulars</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
