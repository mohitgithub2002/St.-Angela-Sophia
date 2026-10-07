import type { Metadata } from "next";
import { HistoryList } from "@/components/page/History";
import { Block } from "@/components/page/PageShell";
import { RichPage } from "@/components/page/RichPage";
import { Icon } from "@/components/Icon";
import { getTimeline, getValues } from "@/lib/content";

export const metadata: Metadata = { title: "About Us" };

export default async function AboutPage() {
  const [timeline, values] = await Promise.all([getTimeline(), getValues()]);
  return (
    <RichPage slug="about-overview" section="about" href="/about" image="about.jpg">
      <Block title="The values we live by" id="values">
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.id} className="flex gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-moss text-moss"><Icon name={v.icon} className="h-7 w-7" /></span>
              <div><h3 className="text-[18px]">{v.title}</h3><p className="mt-1 text-[14.5px]">{v.text}</p></div>
            </div>
          ))}
        </div>
      </Block>
      <Block title="Our history" id="history">
        <HistoryList items={timeline} />
      </Block>
    </RichPage>
  );
}
