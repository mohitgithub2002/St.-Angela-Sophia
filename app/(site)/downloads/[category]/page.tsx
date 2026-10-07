import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocList } from "@/components/page/DocList";
import { PageShell } from "@/components/page/PageShell";
import { getDocuments } from "@/lib/content";
import type { DocCategory } from "@/lib/types";

const TABS = {
  circulars: { title: "Circulars & Notices", categories: ["circular"], intro: "Recent announcements, holiday notices and updates from the school." },
  "study-material": { title: "Study Materials", categories: ["study_material"], intro: "Worksheets, assignments and sample papers." },
  forms: { title: "Forms & Applications", categories: ["form"], intro: "Admission forms, transfer certificate applications and other forms." },
  policies: { title: "Policies", categories: ["policy"], intro: "School policies on anti-bullying, discipline, health and safety, and more." },
} satisfies Record<string, { title: string; categories: DocCategory[]; intro: string }>;
type Tab = keyof typeof TABS;
const isTab = (t: string): t is Tab => t in TABS;

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(TABS).map((category) => ({ category }));

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  return { title: isTab(category) ? TABS[category].title : "Downloads" };
}

export default async function DownloadsTab({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!isTab(category)) notFound();
  const tab = TABS[category];
  const docs = await getDocuments(tab.categories);
  return (
    <PageShell section="downloads" href={`/downloads/${category}`} intro={tab.intro}>
      <DocList docs={docs} empty="Nothing has been uploaded here yet." />
    </PageShell>
  );
}
