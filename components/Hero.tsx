"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Slide } from "@/lib/types";
import { Icon } from "./Icon";
import { Photo } from "./Photo";

export function Hero({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const go = (step: number) => setI((n) => (n + step + slides.length) % slides.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Welcome"
      className="group relative h-[clamp(420px,72vh,700px)] overflow-hidden bg-forest"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((s, n) => (
        <div
          key={s.id}
          aria-roledescription="slide"
          aria-label={`${n + 1} of ${slides.length}`}
          aria-hidden={n !== i}
          className={`absolute inset-0 transition-opacity duration-1000 ${n === i ? "opacity-100" : "opacity-0"}`}
        >
          <Photo src={s.image} alt={s.alt} position={s.position} priority={n === 0} className={`h-full w-full ${n === i ? "animate-ken" : ""}`} />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/80 via-forest/40 to-transparent" />
          <div className="wrap absolute inset-0 flex flex-col justify-center">
            <div className={`max-w-[640px] transition-all delay-300 duration-1000 ${n === i ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
              <p className="text-[clamp(15px,1.6vw,20px)] font-light uppercase tracking-[.08em] text-white/95">{s.kicker}</p>
              {n === 0 ? (
                <h1 className="mt-2 text-[clamp(34px,5.4vw,66px)] font-bold uppercase leading-[1.1] !text-white">{s.heading}</h1>
              ) : (
                <p className="mt-2 font-serif text-[clamp(34px,5.4vw,66px)] font-bold uppercase leading-[1.1] text-white">{s.heading}</p>
              )}
              <Link href={s.link || "/about"} tabIndex={n === i ? undefined : -1} className="mt-7 inline-block border-2 border-white px-7 py-3 text-[13px] font-medium uppercase tracking-[.1em] text-white transition-colors hover:border-moss hover:bg-moss">
                Know More
              </Link>
            </div>
          </div>
        </div>
      ))}

      <button onClick={() => go(-1)} aria-label="Previous slide" className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/50 text-white opacity-0 transition-opacity hover:bg-moss focus:opacity-100 group-hover:opacity-100 max-md:hidden">
        <Icon name="left" className="h-6 w-6" />
      </button>
      <button onClick={() => go(1)} aria-label="Next slide" className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/50 text-white opacity-0 transition-opacity hover:bg-moss focus:opacity-100 group-hover:opacity-100 max-md:hidden">
        <Icon name="right" className="h-6 w-6" />
      </button>

      <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 gap-2.5">
        {slides.map((s, n) => (
          <button
            key={s.id}
            onClick={() => setI(n)}
            aria-label={`Show slide ${n + 1}`}
            aria-current={n === i}
            className={`h-2.5 w-2.5 rounded-full transition-all ${n === i ? "scale-125 bg-white" : "bg-white/45 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </section>
  );
}
