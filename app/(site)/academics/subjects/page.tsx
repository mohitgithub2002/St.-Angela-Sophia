import type { Metadata } from "next";
import { DataTable } from "@/components/page/DataTable";
import { Block, PageShell } from "@/components/page/PageShell";
import { getStages, getStreams } from "@/lib/content";

export const metadata: Metadata = { title: "Subjects Offered" };

export default async function Subjects() {
  const [stages, streams] = await Promise.all([getStages(), getStreams()]);
  return (
    <PageShell section="academics" href="/academics/subjects" intro="Subjects for each stage follow the CBSE scheme of studies.">
      <Block title="Subjects by stage" id="by-stage">
        <DataTable caption="Subjects by stage" head={["Stage", "Classes", "Subjects"]} rows={stages.map((s) => [s.title, s.classes, s.subjects.join(", ")])} />
      </Block>
      <Block title="Streams in Classes XI and XII" id="streams">
        <DataTable
          caption="Streams in Classes XI and XII"
          head={["Stream", "Subjects", "Eligibility"]}
          rows={streams.map((s) => [s.name, s.subjects, s.need])}
        />
      </Block>
    </PageShell>
  );
}
