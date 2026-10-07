import type { Metadata } from "next";
import { RichPage } from "@/components/page/RichPage";

export const metadata: Metadata = { title: "Assessment Structure" };

export default function Assessment() {
  return <RichPage slug="assessment" section="academics" href="/academics/assessment" />;
}
