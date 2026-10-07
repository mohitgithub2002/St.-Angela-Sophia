import type { Metadata } from "next";
import { DocList } from "@/components/page/DocList";
import { Block } from "@/components/page/PageShell";
import { ResultsTable } from "@/components/page/Results";
import { RichPage } from "@/components/page/RichPage";
import { getDocuments, getResults } from "@/lib/content";

export const metadata: Metadata = { title: "Results" };

export default async function Results() {
  const [results, docs] = await Promise.all([getResults(), getDocuments(["result"])]);
  return (
    <RichPage slug="results-info" section="academics" href="/academics/results">
      <Block title="Class X board results" id="class-x"><ResultsTable results={results} cls="X" /></Block>
      <Block title="Class XII board results" id="class-xii"><ResultsTable results={results} cls="XII" /></Block>
      {docs.length > 0 && <Block title="Result analysis and toppers" id="docs"><DocList docs={docs} /></Block>}
    </RichPage>
  );
}
