import Link from "next/link";
import { MPD_HREF, quickLinks } from "@/lib/nav";
import { Icon } from "./Icon";

// The band under the hero slider. CBSE asks for Mandatory Public Disclosure to sit behind a prominent icon
// on the home page, so it comes first and is highlighted.
export function QuickLinks() {
  return (
    <nav aria-label="Quick links" className="relative z-10 -mt-12 pb-4">
      <ul className="wrap grid grid-cols-2 gap-px bg-lichen/60 shadow-[0_10px_30px_rgba(0,0,0,.12)] sm:grid-cols-4 lg:grid-cols-7">
        {quickLinks.map((l) => {
          const mpd = l.href === MPD_HREF;
          return (
            <li key={l.href} className={mpd ? "col-span-2 sm:col-span-4 lg:col-span-1" : ""}>
              <Link
                href={l.href}
                className={`group flex h-full flex-col items-center justify-center gap-2 px-3 py-5 text-center text-[13px] font-semibold uppercase leading-snug tracking-wide transition-colors ${
                  mpd ? "bg-forest text-white hover:bg-moss" : "bg-white text-forest hover:bg-moss hover:text-white"
                }`}
              >
                <Icon name={l.icon} className={`h-9 w-9 ${mpd ? "text-pista" : "text-moss group-hover:text-white"}`} />
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
