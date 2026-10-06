"use client";
import { useEffect, useState } from "react";
import { achievements } from "@/lib/data";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { SectionHead } from "./SectionHead";

// Testimonial-style slider showing the school's achievers.
export function Achievements() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const a = achievements[i];

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % achievements.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section id="achievers" aria-labelledby="ach-title" className="bg-forest py-16 text-white" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="wrap">
        <SectionHead id="ach-title" title="Our Achievers" light>
          Proud moments from our girls, in the classroom and beyond.
        </SectionHead>

        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          <figure>
            <Photo src="achievers.jpg" alt="Medal winners in school uniform with their teachers" sizes="(min-width: 1024px) 620px, 100vw" className="aspect-[16/9] w-full ring-1 ring-white/15" position="center 35%" />
            <figcaption className="mt-3 text-center text-[13px] text-lichen lg:text-left">Our medal winners with their teachers</figcaption>
          </figure>

          <div>
            <div role="tablist" aria-label="Achievements" className="flex justify-center gap-4">
              {achievements.map((x, n) => (
                <button
                  key={x.title}
                  role="tab"
                  aria-selected={n === i}
                  aria-controls="ach-panel"
                  aria-label={x.title}
                  onClick={() => setI(n)}
                  className={`grid place-items-center rounded-full border-2 transition-all ${n === i ? "h-20 w-20 border-white bg-moss text-white" : "h-16 w-16 border-white/30 bg-white/10 text-white/60 hover:text-white"}`}
                >
                  <Icon name="trophy" className="h-1/2 w-1/2" />
                </button>
              ))}
            </div>

            <div id="ach-panel" role="tabpanel" aria-live="polite" className="mx-auto mt-8 max-w-3xl text-center">
              <h3 className="text-[20px] !text-white">{a.title}</h3>
              <span className="text-[13px] uppercase tracking-wider text-lichen">{a.tag}</span>
              <p className="mt-4 font-serif text-[clamp(17px,1.8vw,21px)] font-light italic leading-[1.7] text-white/90">&ldquo;{a.text}&rdquo;</p>
              <Icon name="quote" className="mx-auto mt-5 h-10 w-10 text-white/25" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
