import { Announcement } from "@/components/Announcement";
import { CallBar } from "@/components/CallBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getAnnouncements, getSettings } from "@/lib/content";

// Pages are cached and refreshed at most hourly; every save in the admin panel refreshes them at once.
export const revalidate = 3600;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, announcements] = await Promise.all([getSettings(), getAnnouncements()]);
  return (
    <>
      <Header settings={settings} />
      <Announcement items={announcements} />
      <main>{children}</main>
      <Footer settings={settings} />
      <CallBar phone={settings.phone} />
    </>
  );
}
