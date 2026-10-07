import type { Metadata } from "next";
import { Journey } from "@/components/Journey";
import { Block } from "@/components/page/PageShell";
import { RichPage } from "@/components/page/RichPage";
import { getStages } from "@/lib/content";

export const metadata: Metadata = { title: "Curriculum" };

export default async function Curriculum() {
  const stages = await getStages();
  return (
    <RichPage slug="curriculum" section="academics" href="/academics" title="Curriculum Details">
      <Block title="Our sections" id="stages">
        <p className="mb-5">One journey, from first words to board exams. Choose a stage to see what your daughter learns there.</p>
        <Journey stages={stages} />
      </Block>
    </RichPage>
  );
}
