import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Empty, PageShell } from "@/components/page/PageShell";
import { getClubs } from "@/lib/content";

export const metadata: Metadata = { title: "Clubs & Societies" };

export default async function Clubs() {
  const clubs = await getClubs();
  return (
    <PageShell section="studentLife" href="/student-life/clubs" intro="Every girl joins a club. Many join three. Clubs meet every week and are led by students with a teacher in charge.">
      {clubs.length ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clubs.map((c) => (
            <li key={c.id} className="flex gap-4 border-t-[3px] border-sage bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,.06)]">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-pista text-moss"><Icon name="star" className="h-6 w-6" /></span>
              <div>
                <h2 className="text-[17px] font-semibold">{c.name}</h2>
                {c.description && <p className="mt-1 text-[14px]">{c.description}</p>}
              </div>
            </li>
          ))}
        </ul>
      ) : <Empty />}
    </PageShell>
  );
}
