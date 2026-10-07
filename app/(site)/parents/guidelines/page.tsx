import type { Metadata } from "next";
import { RichPage } from "@/components/page/RichPage";

export const metadata: Metadata = { title: "Guidelines for Parents" };

export default function Guidelines() {
  return <RichPage slug="parent-guidelines" section="parents" href="/parents/guidelines" />;
}
