import "server-only";
import { cache } from "react";
import * as d from "./data";
import { PAGE_DEFS } from "./pages";
import { hasSupabase } from "./supabase/env";
import { createPublicClient } from "./supabase/server";
import type {
  Achievement, AdmissionStep, Album, AlumniEvent, Announcement, BoardResult, CalendarEvent, Club, Committee, CoreValue,
  Doc, DocCategory, EventType, Fact, Facility, FacilityCategory, Fee, GalleryPhoto, Member, MpdDocument, MpdInfo,
  NotableAlumnus, Page, SchoolEvent, Settings, Slide, Stage, Stream, TimelineItem, TransportRoute, Vacancy, Video,
} from "./types";

// Read helpers for public pages. Each reads from Supabase (visitors only see published rows, enforced by RLS)
// and falls back to the defaults in lib/data.ts when Supabase is not configured or a query fails.

type Filter = { eq?: Record<string, string | boolean>; in?: [string, readonly string[]]; order?: [string, boolean][] };

function applyFallback<T>(items: T[], f: Filter): T[] {
  const get = (x: T, k: string) => (x as Record<string, unknown>)[k];
  return items.filter(
    (x) =>
      Object.entries(f.eq ?? {}).every(([k, v]) => get(x, k) === v) &&
      (!f.in || f.in[1].includes(String(get(x, f.in[0])))),
  );
}

async function list<T>(table: string, fallback: T[], f: Filter = {}): Promise<T[]> {
  if (!hasSupabase) return applyFallback(fallback, f);
  let q = createPublicClient().from(table).select("*");
  for (const [k, v] of Object.entries(f.eq ?? {})) q = q.eq(k, v);
  if (f.in) q = q.in(f.in[0], [...f.in[1]]);
  for (const [col, ascending] of f.order ?? [["sort", true]]) q = q.order(col, { ascending, nullsFirst: false });
  const { data, error } = await q;
  if (error) {
    console.error(`[content] ${table}: ${error.message}`);
    return applyFallback(fallback, f);
  }
  return data as T[];
}

async function keyValue<T extends object>(key: string, fallback: T): Promise<T> {
  if (!hasSupabase) return fallback;
  const { data, error } = await createPublicClient().from("site_content").select("value").eq("key", key).maybeSingle();
  if (error) console.error(`[content] site_content.${key}: ${error.message}`);
  // Merge so newly added fields always have a value.
  return { ...fallback, ...((data?.value as Partial<T>) ?? {}) };
}

export const getSettings = cache(() => keyValue<Settings>("settings", d.defaultSettings));
export const getMpdInfo = cache(() => keyValue<MpdInfo>("mpd", d.defaultMpd));

export const getPage = cache(async (slug: string): Promise<Page> => {
  const def = PAGE_DEFS.find((p) => p.slug === slug);
  const fallback: Page = { slug, title: def?.title ?? slug, body: def?.body ?? "", image: "" };
  if (!hasSupabase) return fallback;
  const { data, error } = await createPublicClient().from("pages").select("*").eq("slug", slug).maybeSingle();
  if (error) console.error(`[content] pages.${slug}: ${error.message}`);
  return (data as Page | null) ?? fallback;
});

export const getSlides = cache(() => list<Slide>("slides", d.slides));

export const getAnnouncements = cache(async () => {
  const today = new Date().toISOString().slice(0, 10);
  const all = await list<Announcement>("announcements", d.announcements, { order: [["pinned", false], ["date", false], ["sort", true]] });
  return all.filter((a) => !a.expires_on || a.expires_on >= today);
});

export const getDocuments = cache((categories: readonly DocCategory[]) =>
  list<Doc>("documents", d.documents, { in: ["category", categories], order: [["date", false], ["sort", true]] }),
);

export const getMpdDocuments = cache(async () => {
  const docs = await list<MpdDocument>("mpd_documents", [], { order: [["slot", true]] });
  return Object.fromEntries(docs.map((x) => [x.slot, x])) as Record<string, MpdDocument | undefined>;
});

export const getFees = cache(() => list<Fee>("fee_structure", d.fees, { order: [["session", false], ["sort", true]] }));
export const getResults = cache(() => list<BoardResult>("board_results", d.results, { order: [["class", true], ["year", false]] }));

export const getCalendar = cache((types?: readonly EventType[]) =>
  list<CalendarEvent>("calendar_events", d.calendar, { ...(types ? { in: ["type", types] as [string, readonly string[]] } : {}), order: [["start_date", true]] }),
);

export const getMembers = cache((committee: Committee) => list<Member>("committee_members", d.members, { eq: { committee } }));

export const getFacilities = cache((category?: FacilityCategory) =>
  list<Facility>("facilities", d.facilities, category ? { eq: { category } } : {}),
);

export const getTransportRoutes = cache(() => list<TransportRoute>("transport_routes", d.transportRoutes));
export const getFacts = cache(() => list<Fact>("facts", d.facts));
export const getValues = cache(() => list<CoreValue>("core_values", d.values));
export const getTimeline = cache(() => list<TimelineItem>("timeline", d.timeline));
export const getStages = cache(() => list<Stage>("stages", d.stages));
export const getStreams = cache(() => list<Stream>("streams", d.streams));
export const getAdmissionSteps = cache(() => list<AdmissionStep>("admission_steps", d.admissionSteps));
export const getClubs = cache(() => list<Club>("clubs", d.clubs));
export const getEvents = cache((kind?: SchoolEvent["kind"]) => list<SchoolEvent>("events", d.events, kind ? { eq: { kind } } : {}));
export const getAchievements = cache(() => list<Achievement>("achievements", d.achievements));
export const getAlbums = cache(() => list<Album>("gallery_albums", d.albums, { order: [["sort", true], ["date", false]] }));

export const getAlbum = cache(async (slug: string) => {
  const album = (await getAlbums()).find((a) => a.slug === slug);
  if (!album) return null;
  const photos = await list<GalleryPhoto>("gallery_photos", d.photos, { eq: { album_id: album.id } });
  return { album, photos };
});

export const getVideos = cache(() => list<Video>("videos", d.videos, { order: [["sort", true], ["date", false]] }));
export const getNotableAlumni = cache(() => list<NotableAlumnus>("notable_alumni", d.notableAlumni));
export const getAlumniEvents = cache(() => list<AlumniEvent>("alumni_events", d.alumniEvents, { order: [["date", false]] }));
export const getVacancies = cache(() => list<Vacancy>("vacancies", d.vacancies, { eq: { is_open: true } }));
