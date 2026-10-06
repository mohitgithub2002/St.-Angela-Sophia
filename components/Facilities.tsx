import { Icon, type IconName } from "./Icon";
import { Photo } from "./Photo";
import { SectionHead } from "./SectionHead";

// Two tiers: facilities we have real photos of, then the rest as number-led cards.
const featured = [
  { title: "Sports & Games", text: "Playground, badminton, athletics, yoga and indoor games.", image: "facility-sports.jpg", alt: "Students doing yoga on the school court" },
  { title: "Dance & Music", text: "Rooms for dance, music and stage rehearsals.", image: "facility-music.jpg", alt: "Students performing a folk dance on the school stage" },
];

const items: { title: string; stat: string; unit: string; text: string; icon: IconName }[] = [
  { title: "Reference Library", stat: "4,000", unit: "books", text: "Periodicals and daily newspapers in a dedicated reading room.", icon: "book" },
  { title: "Smart Classrooms", stat: "50", unit: "digital boards", text: "Projectors in classrooms, plus computer labs.", icon: "screen" },
  { title: "Science Labs", stat: "3", unit: "labs", text: "Physics, chemistry and biology, for hands-on practicals.", icon: "flask" },
  { title: "Solar Campus", stat: "45", unit: "kWp solar plant", text: "Rooftop solar has powered the campus since 2015.", icon: "sun" },
];

export function Facilities() {
  return (
    <section id="campus" aria-labelledby="fac-title" className="bg-mint py-16">
      <div className="wrap">
        <SectionHead id="fac-title" title="Campus">
          A 2.25-acre heritage campus in the old city, with modern facilities for every girl.
        </SectionHead>

        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((f) => (
            <article key={f.title} className="group relative aspect-[16/10] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,.08)]">
              <Photo src={f.image} alt={f.alt} sizes="(min-width: 768px) 50vw, 100vw" className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-[20px] uppercase !text-white">{f.title}</h3>
                <p className="mt-1 text-[14px] text-white/85">{f.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((f) => (
            <article key={f.title} className="group border-t-[3px] border-sage bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,.06)] transition-all hover:-translate-y-1 hover:border-moss hover:shadow-[0_10px_30px_rgba(0,0,0,.12)]">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-pista text-moss transition-colors group-hover:bg-moss group-hover:text-white">
                <Icon name={f.icon} className="h-7 w-7" />
              </span>
              <p className="mt-5 font-serif text-[36px] font-bold leading-none text-forest">{f.stat}</p>
              <p className="mt-1 text-[12px] uppercase tracking-wider text-sage">{f.unit}</p>
              <h3 className="mt-4 text-[17px] uppercase">{f.title}</h3>
              <p className="mt-1 text-[14px]">{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
