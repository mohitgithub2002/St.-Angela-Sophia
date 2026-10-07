import type { Metadata } from "next";
import { RichPage } from "@/components/page/RichPage";

export const metadata: Metadata = { title: "Vision & Mission" };

export default function VisionMission() {
  return <RichPage slug="vision-mission" section="about" href="/about/vision-mission" />;
}
