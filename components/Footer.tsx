import Link from "next/link";
import { MPD_HREF } from "@/lib/nav";
import { telHref } from "@/lib/format";
import type { Settings } from "@/lib/types";
import { Crest } from "./Crest";
import { Icon } from "./Icon";

const cols: { h: string; links: [string, string][] }[] = [
  { h: "About Us", links: [["School Overview", "/about"], ["Principal's Message", "/about/principal-message"], ["Management Team", "/about/management"], ["CBSE Affiliation", "/cbse/affiliation"], ["Mandatory Public Disclosure", MPD_HREF], ["Careers", "/careers"]] },
  { h: "Quick Links", links: [["Admission Procedure", "/admissions"], ["Fee Structure", "/admissions/fee-structure"], ["Results", "/academics/results"], ["Academic Calendar", "/academic-calendar"], ["Downloads", "/downloads/circulars"], ["Gallery", "/gallery"], ["Alumni", "/alumni"]] },
];

export function Footer({ settings: s }: { settings: Settings }) {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(`${s.short} School, Ghat Gate, Jaipur`)}&t=m&z=14&output=embed`;
  const social = [["Facebook", s.facebook], ["Instagram", s.instagram], ["YouTube", s.youtube]].filter(([, u]) => u);
  return (
    <footer className="bg-gradient-to-b from-moss to-forest pb-20 text-white/65 md:pb-0">
      <div className="wrap grid gap-10 pb-12 pt-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Crest className="h-[60px] w-[53px]" />
            <span className="font-serif text-[19px] font-semibold uppercase leading-tight text-white">{s.short}</span>
          </Link>
          <p className="mt-5 text-[14px] leading-[1.8]">
            A CBSE girls&apos; school run by the {s.society}, educating the girls of Jaipur since 1926. Affiliation no. {s.affiliation}, school code {s.schoolCode}.
          </p>
          <Link href={MPD_HREF} className="mt-5 inline-flex items-center gap-2 border border-lichen/60 px-4 py-2 text-[12px] font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-forest">
            <Icon name="shield" className="h-4 w-4" />Mandatory Public Disclosure
          </Link>
          {social.length > 0 && (
            <p className="mt-4 flex gap-4 text-[14px]">
              {social.map(([label, url]) => <a key={label} href={url} target="_blank" rel="noopener" className="hover:text-white">{label}</a>)}
            </p>
          )}
        </div>

        {cols.map((c) => (
          <div key={c.h}>
            <h4 className="mb-4 text-[20px] font-medium !text-white">{c.h}</h4>
            <ul className="space-y-2 text-[14px]">
              {c.links.map(([t, href]) => (
                <li key={t}><Link href={href} className="transition-colors hover:text-white">{t}</Link></li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-4 text-[20px] font-medium !text-white">Connect with Us</h4>
          <ul className="space-y-3 text-[14px]">
            <li className="flex gap-3"><Icon name="phone" className="mt-0.5 h-5 w-5 shrink-0 text-lichen" /><span><a href={telHref(s.phone)} className="hover:text-white">{s.phone}</a><br /><a href={telHref(s.mobile)} className="hover:text-white">{s.mobile}</a></span></li>
            <li className="flex gap-3"><Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-lichen" /><span>{s.address} {s.pin}<br />{s.landmark}</span></li>
            <li className="flex gap-3"><Icon name="mail" className="mt-0.5 h-5 w-5 shrink-0 text-lichen" /><a href={`mailto:${s.email}`} className="break-all hover:text-white">{s.email}</a></li>
          </ul>
          <iframe
            title={`Map showing ${s.short} School`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="mt-5 h-[150px] w-full border-0"
          />
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="wrap flex flex-col items-center justify-between gap-2 py-5 text-[13px] sm:flex-row">
          <p>© {new Date().getFullYear()} {s.name}, Jaipur. All rights reserved.</p>
          <p className="flex gap-4"><Link href="/contact" className="hover:text-white">Contact us</Link><Link href="/admin" className="hover:text-white">Staff login</Link></p>
        </div>
      </div>
    </footer>
  );
}
