"use client";
import { useEffect, useState } from "react";
import { navLinks, school } from "@/lib/data";
import { Crest } from "./Crest";
import { Icon } from "./Icon";

const ext = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {});

export function Header() {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Toolbar */}
      <div className="bg-forest text-[13px] text-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <li><a href={school.phoneHref} className="flex items-center gap-1.5 hover:text-lichen"><Icon name="phone" className="h-4 w-4 text-lichen" />{school.phone}</a></li>
            <li className="hidden sm:block"><a href={`mailto:${school.email}`} className="flex items-center gap-1.5 hover:text-lichen"><Icon name="mail" className="h-4 w-4 text-lichen" />{school.email}</a></li>
            <li className="hidden md:block"><a href={school.disclosureUrl} target="_blank" rel="noopener" className="flex items-center gap-1.5 hover:text-lichen"><Icon name="info" className="h-4 w-4 text-lichen" />CBSE Affiliation No. {school.affiliation}</a></li>
          </ul>
          <a href="#admissions" className="bg-pista px-4 py-1 text-[12px] font-semibold uppercase tracking-wider text-forest hover:bg-white">
            <span className="animate-blink">Admission Open 2027–28</span>
          </a>
        </div>
      </div>

      {/* Main menu */}
      <header id="top" className={`sticky top-[env(safe-area-inset-top,0px)] z-40 bg-white transition-shadow ${scrolled ? "shadow-[0_2px_12px_rgba(0,0,0,.15)]" : "border-b border-lichen/50"}`}>
        <div className="wrap flex h-[80px] items-center justify-between gap-5">
          <a href="#top" className="flex items-center gap-3" aria-label={`${school.short} School, home`}>
            <Crest className="h-[56px] w-[50px]" />
            <span className="leading-tight">
              <b className="block font-serif text-[clamp(17px,2vw,22px)] font-bold uppercase text-moss">{school.short}</b>
              <small className="block text-[11px] uppercase tracking-[.16em] text-moss">Sr. Sec. School, Jaipur</small>
            </span>
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center">
              {navLinks.map((l) => (
                <li key={l.label} className="group relative">
                  <a href={l.href} className="flex items-center gap-1 px-3 py-7 text-[14px] font-medium uppercase text-forest transition-colors hover:text-moss group-focus-within:text-moss">
                    {l.label}
                    {"children" in l && <Icon name="right" className="h-3 w-3 rotate-90" />}
                  </a>
                  {"children" in l && (
                    <ul className="invisible absolute left-0 top-full z-10 w-60 translate-y-2 border-t-[3px] border-moss bg-white py-2 opacity-0 shadow-[0_8px_20px_rgba(0,0,0,.12)] transition-all group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {l.children.map((c) => (
                        <li key={c.label}>
                          <a href={c.href} {...ext(c.href)} className="block px-5 py-2 text-[14px] text-moss hover:bg-mint hover:text-forest">{c.label}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <button
            className="grid h-11 w-11 place-items-center bg-moss text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Icon name="menu" className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <nav
        id="mobile-menu"
        aria-label="Main"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(320px,86vw)] flex-col overflow-y-auto bg-mint shadow-2xl transition-transform duration-300 lg:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between bg-forest px-5 py-3 text-white">
          <span className="font-serif font-semibold">Menu</span>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center hover:bg-white/10">
            <Icon name="close" className="h-6 w-6" />
          </button>
        </div>
        <ul>
          {navLinks.map((l) => (
            <li key={l.label} className="border-b border-lichen/50">
              <div className="flex">
                <a href={l.href} onClick={() => setOpen(false)} className="flex flex-1 items-center gap-3 px-5 py-3.5 text-[14px] font-medium uppercase text-moss hover:text-forest">
                  <Icon name={l.icon} className="h-5 w-5 text-moss" />{l.label}
                </a>
                {"children" in l && (
                  <button
                    onClick={() => setSub(sub === l.label ? null : l.label)}
                    aria-expanded={sub === l.label}
                    aria-label={`Show ${l.label} pages`}
                    className="grid w-12 place-items-center text-moss"
                  >
                    <Icon name="right" className={`h-4 w-4 transition-transform ${sub === l.label ? "-rotate-90" : "rotate-90"}`} />
                  </button>
                )}
              </div>
              {"children" in l && sub === l.label && (
                <ul className="bg-white pb-2">
                  {l.children.map((c) => (
                    <li key={c.label}>
                      <a href={c.href} {...ext(c.href)} onClick={() => setOpen(false)} className="block py-2 pl-14 pr-5 text-[14px] text-moss hover:text-forest">{c.label}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
