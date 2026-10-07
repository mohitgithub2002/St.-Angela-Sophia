import { About } from "@/components/About";
import { Academics } from "@/components/Academics";
import { Achievements } from "@/components/Achievements";
import { AdmissionCta } from "@/components/AdmissionCta";
import { Admissions } from "@/components/Admissions";
import { Alumni } from "@/components/Alumni";
import { CampusLife } from "@/components/CampusLife";
import { Counters } from "@/components/Counters";
import { Facilities } from "@/components/Facilities";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { Principal } from "@/components/Principal";
import { QuickLinks } from "@/components/QuickLinks";
import { Timeline } from "@/components/Timeline";
import { Values } from "@/components/Values";
import { Visit } from "@/components/Visit";
import * as c from "@/lib/content";
import { today } from "@/lib/format";

export default async function Home() {
  const [settings, slides, announcements, calendar, facts, values, stages, streams, steps, facilities, events, clubs, achievements, principal, timeline] =
    await Promise.all([
      c.getSettings(), c.getSlides(), c.getAnnouncements(), c.getCalendar(), c.getFacts(), c.getValues(), c.getStages(), c.getStreams(),
      c.getAdmissionSteps(), c.getFacilities(), c.getEvents(), c.getClubs(), c.getAchievements(), c.getPage("principal-message"), c.getTimeline(),
    ]);
  const now = today();
  const upcoming = calendar.filter((e) => (e.end_date ?? e.start_date) >= now && e.type !== "holiday").slice(0, 6);
  const holidays = calendar.filter((e) => (e.end_date ?? e.start_date) >= now && e.type === "holiday").slice(0, 3);

  return (
    <>
      <Hero slides={slides} />
      <QuickLinks />
      <About notice={announcements.find((a) => a.pinned)} />
      <Highlights notices={announcements} upcoming={[...upcoming, ...holidays]} registrationUrl={settings.registrationUrl} />
      <Counters facts={facts} />
      <Values values={values} />
      <Academics stages={stages} streams={streams} />
      <Admissions steps={steps} registrationUrl={settings.registrationUrl} />
      <Facilities facilities={facilities} />
      <CampusLife events={events} clubs={clubs} />
      <Achievements achievements={achievements} />
      <Principal page={principal} name={settings.principalName} />
      <Timeline timeline={timeline} />
      <Alumni />
      <AdmissionCta settings={settings} />
      <Visit settings={settings} />
    </>
  );
}
