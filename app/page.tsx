import { About } from "@/components/About";
import { Academics } from "@/components/Academics";
import { Achievements } from "@/components/Achievements";
import { AdmissionCta } from "@/components/AdmissionCta";
import { Admissions } from "@/components/Admissions";
import { Alumni } from "@/components/Alumni";
import { Announcement } from "@/components/Announcement";
import { CallBar } from "@/components/CallBar";
import { CampusLife } from "@/components/CampusLife";
import { Counters } from "@/components/Counters";
import { Facilities } from "@/components/Facilities";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { Principal } from "@/components/Principal";
import { Timeline } from "@/components/Timeline";
import { Values } from "@/components/Values";
import { Visit } from "@/components/Visit";

export default function Home() {
  return (
    <>
      <Header />
      <Announcement />
      <main>
        <Hero />
        <About />
        <Highlights />
        <Counters />
        <Values />
        <Academics />
        <Admissions />
        <Facilities />
        <CampusLife />
        <Achievements />
        <Principal />
        <Timeline />
        <Alumni />
        <AdmissionCta />
        <Visit />
      </main>
      <Footer />
      <CallBar />
    </>
  );
}
