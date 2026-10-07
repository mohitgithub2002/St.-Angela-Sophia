import type { Metadata } from "next";
import { AgeChecker } from "@/components/AgeChecker";
import { Block } from "@/components/page/PageShell";
import { RichPage } from "@/components/page/RichPage";
import { Streams } from "@/components/Streams";
import { getStreams } from "@/lib/content";

export const metadata: Metadata = { title: "Eligibility Criteria" };

export default async function Eligibility() {
  const streams = await getStreams();
  return (
    <RichPage slug="eligibility" section="admissions" href="/admissions/eligibility">
      <Block title="Age eligibility" id="age-check">
        <div className="max-w-xl"><AgeChecker /></div>
      </Block>
      <Block id="streams"><Streams streams={streams} /></Block>
    </RichPage>
  );
}
