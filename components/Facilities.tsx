import Link from "next/link";
import type { Facility } from "@/lib/types";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { SectionHead } from "./SectionHead";

// Two tiers: featured facilities with photos, then the rest as number-led cards.
export function FacilityCards({ facilities }: { facilities: Facility[] }) {
  const featured = facilities.filter((f) => f.featured && f.image);
  const items = facilities.filter((f) => !(f.featured && f.image));
  return (
    <>
      {featured.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((f) => (
            <article key={f.id} className="group relative aspect-[16/10] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,.08)]">
              <Photo src={f.image} alt={f.title} sizes="(min-width: 768px) 50vw, 100vw" className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-[20px] uppercase !text-white">{f.title}</h3>
                <p className="mt-1 text-[14px] text-white/85">{f.text}</p>
              </div>
            </article>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ${featured.length ? "mt-6" : ""}`}>
          {items.map((f) => (
            <article key={f.id} className="group border-t-[3px] border-sage bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,.06)] transition-all hover:-translate-y-1 hover:border-moss hover:shadow-[0_10px_30px_rgba(0,0,0,.12)]">
              {f.image ? (
                <Photo src={f.image} alt={f.title} sizes="(min-width: 1024px) 280px, 100vw" className="-mx-6 -mt-6 mb-5 aspect-[16/10]" />
              ) : (
                <span className="grid h-14 w-14 place-items-center rounded-full bg-pista text-moss transition-colors group-hover:bg-moss group-hover:text-white">
                  <Icon name={f.icon} className="h-7 w-7" />
                </span>
              )}
              {f.stat && <p className="mt-5 font-serif text-[36px] font-bold leading-none text-forest">{f.stat}</p>}
              {f.unit && <p className="mt-1 text-[12px] uppercase tracking-wider text-sage">{f.unit}</p>}
              <h3 className="mt-4 text-[17px] uppercase">{f.title}</h3>
              <p className="mt-1 text-[14px]">{f.text}</p>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

export function Facilities({ facilities }: { facilities: Facility[] }) {
  return (
    <section id="campus" aria-labelledby="fac-title" className="bg-mint py-16">
      <div className="wrap">
        <SectionHead id="fac-title" title="Campus">
          A 2.25-acre heritage campus in the old city, with modern facilities for every girl.
        </SectionHead>
        <FacilityCards facilities={facilities} />
        <p className="mt-8 text-center"><Link href="/infrastructure" className="btn">Explore the campus</Link></p>
      </div>
    </section>
  );
}
