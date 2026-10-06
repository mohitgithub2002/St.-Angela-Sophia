import { school } from "@/lib/data";
import { EnquiryForm } from "./EnquiryForm";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { SectionHead } from "./SectionHead";

export function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="bg-mint py-16">
      <div className="wrap">
        <SectionHead id="visit-title" title="Contact Us">
          Come and see a school day. Tell us a little about your daughter and we&apos;ll call you back to plan a visit.
        </SectionHead>
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div className="overflow-hidden bg-white shadow-[0_7px_29px_rgba(100,100,111,.2)]">
            <svg viewBox="0 0 560 300" role="img" aria-label="Simplified map showing the school just outside Ghat Gate, south-east of Jaipur's walled city" className="h-auto w-full">
              <rect width="560" height="300" fill="#E3EED4" />
              <path d="M60 30h300v200H60Z" fill="#FFFFFF" opacity=".6" stroke="#6B9071" strokeWidth="3" strokeDasharray="10 6" />
              <text x="80" y="62" fontFamily="var(--font-poppins), sans-serif" fontSize="15" fontWeight="600" fill="#375534">Walled City</text>
              <g strokeLinecap="round"><path d="M0 120h560M200 0v300M360 230L520 300M360 230V300" stroke="#FFFFFF" strokeWidth="10" /><path d="M0 120h560M200 0v300M360 230L520 300M360 230V300" stroke="#AEC3B0" strokeWidth="3" /></g>
              <path d="M440 0c-20 60 10 110 60 140s60 90 60 160" fill="none" stroke="#AEC3B0" strokeWidth="40" opacity=".6" />
              <rect x="344" y="214" width="32" height="32" rx="6" fill="#375534" />
              <text x="320" y="270" fontFamily="var(--font-poppins), sans-serif" fontSize="13" fill="#375534">Ghat Gate</text>
              <g transform="translate(398 168)"><path d="M0 0c-14 0-24 10-24 23 0 17 24 37 24 37s24-20 24-37C24 10 14 0 0 0Z" fill="#375534" /><circle cy="22" r="8" fill="#ffffff" /></g>
              <text x="430" y="196" fontFamily="var(--font-poppins), sans-serif" fontSize="15" fontWeight="600" fill="#0F2A1D">St. Angela Sophia</text>
            </svg>
            <figure className="relative">
              <Photo src="campus-building.jpg" alt="The school's main building, cream stone with red bands" sizes="(min-width: 768px) 560px, 100vw" className="aspect-[860/350] w-full" />
              <figcaption className="absolute bottom-2 left-2 bg-forest/80 px-2.5 py-1 text-[12px] uppercase tracking-wider text-white">Look for this building</figcaption>
            </figure>
            <div className="space-y-2 p-6 text-[14.5px]">
              <h3 className="mb-2 text-[18px] font-semibold">{school.address}</h3>
              <p className="flex gap-2"><Icon name="pin" className="h-5 w-5 shrink-0 text-moss" />{school.landmark}</p>
              <p className="flex gap-2"><Icon name="phone" className="h-5 w-5 shrink-0 text-moss" /><span><a className="font-semibold text-moss" href={school.phoneHref}>{school.phone}</a> or <a className="font-semibold text-moss" href={school.mobileHref}>{school.mobile}</a></span></p>
              <p className="flex gap-2"><Icon name="mail" className="h-5 w-5 shrink-0 text-moss" /><a className="font-semibold text-moss" href={`mailto:${school.email}`}>{school.email}</a></p>
              <p><a className="btn mt-2" href={school.mapsUrl} target="_blank" rel="noopener">Get directions in Google Maps</a></p>
            </div>
          </div>
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
