import type { TimelineItem } from "@/lib/types";

export function Timeline({ timeline }: { timeline: TimelineItem[] }) {
  return (
    <section id="history" aria-labelledby="heritage-title" className="bg-moss py-16 text-white">
      <div className="wrap">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 id="heritage-title" className="title !text-white">Our <span className="text-lichen">History</span></h2>
          <p className="mt-3 text-white/80">From a small home in Ajmer to one of Jaipur&apos;s oldest schools for girls.</p>
          <span className="mx-auto mt-4 block h-[3px] w-6 bg-white/30" aria-hidden="true" />
        </div>
        <ol tabIndex={0} aria-label="School history timeline, scrollable" className="grid snap-x snap-mandatory auto-cols-[minmax(230px,1fr)] grid-flow-col overflow-x-auto pb-5 pt-2">
          {timeline.map((t, i) => {
            const last = i === timeline.length - 1;
            return (
              <li key={t.id} className="relative snap-start pr-7">
                <div className="mb-6 h-0.5 bg-white/30" />
                <span className={`absolute -top-1.5 left-0 h-3.5 w-3.5 rounded-full ring-4 ring-moss ${last ? "bg-pista" : "bg-lichen"}`} />
                <b className={`block font-serif text-[40px] font-bold leading-none ${last ? "text-pista" : "text-white"}`}>{t.year}</b>
                <h3 className="mb-1.5 mt-3 text-[16px] font-semibold uppercase !text-white">{t.title}</h3>
                <p className="max-w-[30ch] text-[14px] text-white/80">{t.text}</p>
              </li>
            );
          })}
        </ol>
        <p className="mt-3 text-center text-[13px] text-lichen">Scroll sideways to see the full story.</p>
      </div>
    </section>
  );
}
