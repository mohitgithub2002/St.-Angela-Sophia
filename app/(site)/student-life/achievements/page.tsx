import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Block, Empty, PageShell } from "@/components/page/PageShell";
import { Photo } from "@/components/Photo";
import { getAchievements } from "@/lib/content";
import type { Achievement } from "@/lib/types";

export const metadata: Metadata = { title: "Achievements" };

const groups: [Achievement["category"], string][] = [["academic", "Academic"], ["sports", "Sports"], ["co_curricular", "Co-curricular"]];

export default async function Achievements() {
  const all = await getAchievements();
  return (
    <PageShell section="studentLife" href="/student-life/achievements" intro="Proud moments from our girls, in the classroom and beyond.">
      {all.length === 0 && <Empty />}
      {groups.map(([key, label]) => {
        const list = all.filter((a) => a.category === key);
        if (!list.length) return null;
        return (
          <Block key={key} title={label} id={key}>
            <ul className="grid gap-5 md:grid-cols-2">
              {list.map((a) => (
                <li key={a.id} className="flex flex-col overflow-hidden bg-white shadow-[0_2px_10px_rgba(0,0,0,.08)] sm:flex-row">
                  {a.image ? (
                    <Photo src={a.image} alt={a.title} sizes="(min-width: 640px) 180px, 100vw" className="aspect-video sm:aspect-auto sm:w-[180px] sm:shrink-0" />
                  ) : (
                    <span className="grid place-items-center bg-moss py-5 text-white sm:w-[110px] sm:shrink-0"><Icon name="trophy" className="h-12 w-12" /></span>
                  )}
                  <div className="p-5">
                    {a.tag && <span className="text-[12px] font-semibold uppercase tracking-wider text-sage">{a.tag}</span>}
                    <h3 className="text-[17px] font-semibold">{a.title}</h3>
                    <p className="mt-1 text-[14.5px]">{a.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Block>
        );
      })}
    </PageShell>
  );
}
