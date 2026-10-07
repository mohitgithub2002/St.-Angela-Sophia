import Link from "next/link";
import type { Announcement } from "@/lib/types";
import { Icon } from "./Icon";
import { Photo } from "./Photo";

export function About({ notice }: { notice?: Announcement }) {
  return (
    <>
      {/* Featured notice: the first pinned announcement */}
      {notice && (
        <div className="wrap py-8">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 border border-lichen/50 border-l-4 border-l-sage bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,.06)] sm:flex-row">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-sage/10 text-sage"><Icon name="bullhorn" className="h-9 w-9" /></span>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-[18px] font-bold">{notice.title}</h3>
              {notice.text && <p className="text-[14.5px]">{notice.text}</p>}
            </div>
            {(notice.file_url || notice.link) && (
              <a href={notice.file_url || notice.link} {...(notice.file_url ? { target: "_blank", rel: "noopener" } : {})} className="btn shrink-0">Details</a>
            )}
          </div>
        </div>
      )}

      {/* About us */}
      <section id="about" aria-labelledby="about-title" className="grid lg:grid-cols-2">
        <Photo src="about.jpg" alt="Students and teachers welcoming the new session, holding the values of Wisdom, Knowledge, Counsel and Fortitude" sizes="(min-width: 1024px) 50vw, 100vw" className="min-h-[320px] w-full lg:min-h-[480px]" />
        <div className="flex items-center bg-mint px-[clamp(20px,5vw,72px)] py-14">
          <div className="mx-auto max-w-[560px] text-center">
            <h2 id="about-title" className="title">About Us</h2>
            <span className="mx-auto mt-4 block h-[3px] w-6 bg-moss" aria-hidden="true" />
            <p className="mt-5">
              St. Angela Sophia Senior Secondary School is a CBSE girls&apos; school just outside Ghat Gate in Jaipur&apos;s walled city, run by the Mission Sisters of Ajmer. For a hundred years we have welcomed girls of every faith and background from Nursery to Class XII, with Science, Commerce and Humanities in the senior years.
            </p>
            <p className="mt-3">
              Strong results matter here, and so does the kind of person a girl becomes. Our motto, <i className="font-serif text-moss">Arbhak Buddhi Dayi</i>, means giving wisdom to little ones.
            </p>
            <Link href="/about" className="btn mt-7">Read More</Link>
          </div>
        </div>
      </section>
    </>
  );
}
