import type { Metadata } from "next";
import { PageShell } from "@/components/page/PageShell";
import { Photo } from "@/components/Photo";
import { RichText } from "@/components/RichText";
import { getPage, getSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Principal's Message" };

export default async function PrincipalMessage() {
  const [page, s] = await Promise.all([getPage("principal-message"), getSettings()]);
  return (
    <PageShell section="about" href="/about/principal-message">
      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <RichText html={page.body} className="max-w-[75ch]" />
          <p className="mt-8 font-semibold text-moss">
            {s.principalName}
            {s.principalQualification && <small className="block text-[13px] font-normal text-forest/80">{s.principalQualification}</small>}
            <small className="block text-[13px] font-normal text-forest/70">Principal, {s.name}</small>
          </p>
        </div>
        <figure>
          <Photo src={page.image || "principal.jpg"} alt={`${s.principalName}, Principal`} sizes="280px" className="aspect-[3/4] w-full shadow-[0_2px_10px_rgba(0,0,0,.1)]" position="55% 30%" />
          <figcaption className="mt-2 text-center text-[13px]">{s.principalName}</figcaption>
        </figure>
      </div>
    </PageShell>
  );
}
