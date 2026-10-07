import type { Metadata } from "next";
import { DocList } from "@/components/page/DocList";
import { Block, Empty, PageShell } from "@/components/page/PageShell";
import { getDocuments } from "@/lib/content";

export const metadata: Metadata = { title: "Syllabus" };

export default async function Syllabus() {
  const docs = await getDocuments(["syllabus"]);
  const classes = [...new Set(docs.map((d) => d.class_name || "All classes"))];
  return (
    <PageShell section="cbse" href="/cbse/syllabus" intro="Subject-wise syllabus for each class as per CBSE guidelines. The full CBSE curriculum is also available on cbseacademic.nic.in.">
      {classes.length === 0 && <Empty>The syllabus for this session will be uploaded here.</Empty>}
      {classes.map((c) => (
        <Block key={c} title={c} id={c.toLowerCase().replace(/\W+/g, "-")}>
          <DocList docs={docs.filter((d) => (d.class_name || "All classes") === c)} />
        </Block>
      ))}
    </PageShell>
  );
}
