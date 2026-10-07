import type { Metadata } from "next";
import Link from "next/link";
import { Block, Empty, PageShell } from "@/components/page/PageShell";
import { RichText } from "@/components/RichText";
import { getPage, getVacancies } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Careers" };

export default async function Careers() {
  const [vacancies, why, how] = await Promise.all([getVacancies(), getPage("why-work-with-us"), getPage("application-process")]);
  return (
    <PageShell section="careers" href="/careers" title="Careers" intro="Join a school that has shaped the girls of Jaipur for a hundred years.">
      <Block title="Current vacancies" id="vacancies">
        {vacancies.length ? (
          <ul className="space-y-4">
            {vacancies.map((v) => (
              <li key={v.id} className="border-l-4 border-moss bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,.06)]">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <h3 className="text-[19px] font-semibold">{v.post}</h3>
                    <p className="text-[13.5px] font-medium text-sage">{[v.department, v.last_date && `Apply by ${formatDate(v.last_date)}`].filter(Boolean).join(" · ")}</p>
                  </div>
                  <Link href={`/careers/apply?post=${v.id}`} className="btn shrink-0">Apply</Link>
                </div>
                <dl className="mt-3 grid gap-x-4 gap-y-1 text-[14.5px] sm:grid-cols-[150px_1fr]">
                  {v.qualification && <><dt className="font-semibold text-forest">Qualification</dt><dd>{v.qualification}</dd></>}
                  {v.experience && <><dt className="font-semibold text-forest">Experience</dt><dd>{v.experience}</dd></>}
                </dl>
                {v.description && <p className="mt-2 text-[14.5px]">{v.description}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <Empty>There are no open positions right now. You can still <Link href="/careers/apply" className="font-medium text-moss underline">send us your résumé</Link> for future openings.</Empty>
        )}
      </Block>
      <Block title="Application process" id="process"><RichText html={how.body} className="max-w-[75ch]" /></Block>
      <Block title="Why work with us" id="why"><RichText html={why.body} className="max-w-[75ch]" /></Block>
    </PageShell>
  );
}
