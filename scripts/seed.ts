// Copies the default content in lib/data.ts into an empty Supabase database.
// Tables that already have rows are left alone, so it is safe to run more than once.
//   npm run seed
import * as d from "../lib/data";
import { adminClient } from "./supabase-admin";

const db = adminClient();

const strip = <T extends { id?: string }>(rows: T[]) => rows.map(({ id: _id, ...rest }) => rest);

async function seed(table: string, rows: object[]) {
  const { count, error } = await db.from(table).select("*", { count: "exact", head: true });
  if (error) throw new Error(`${table}: ${error.message}`);
  if (count) return console.log(`· ${table}: already has ${count} rows, skipped`);
  if (!rows.length) return console.log(`· ${table}: nothing to add`);
  const { error: e2 } = await db.from(table).insert(rows);
  if (e2) throw new Error(`${table}: ${e2.message}`);
  console.log(`✓ ${table}: added ${rows.length}`);
}

async function main() {
  for (const [key, value] of [["settings", d.defaultSettings], ["mpd", d.defaultMpd]] as const) {
    const { data } = await db.from("site_content").select("key").eq("key", key).maybeSingle();
    if (data) console.log(`· site_content.${key}: exists, skipped`);
    else {
      const { error } = await db.from("site_content").insert({ key, value });
      if (error) throw new Error(error.message);
      console.log(`✓ site_content.${key}`);
    }
  }
  await seed("slides", strip(d.slides));
  await seed("announcements", strip(d.announcements));
  await seed("facts", strip(d.facts));
  await seed("core_values", strip(d.values));
  await seed("timeline", strip(d.timeline));
  await seed("stages", strip(d.stages));
  await seed("streams", strip(d.streams));
  await seed("admission_steps", strip(d.admissionSteps));
  await seed("events", strip(d.events));
  await seed("clubs", strip(d.clubs));
  await seed("achievements", strip(d.achievements));
  await seed("facilities", strip(d.facilities));

  // Albums first, then their photos with the new album ids.
  const { count } = await db.from("gallery_albums").select("*", { count: "exact", head: true });
  if (count) console.log("· gallery_albums: already has rows, skipped");
  else {
    for (const album of d.albums) {
      const { id: oldId, ...row } = album;
      const { data, error } = await db.from("gallery_albums").insert(row).select("id").single();
      if (error) throw new Error(`gallery_albums: ${error.message}`);
      const photos = d.photos.filter((p) => p.album_id === oldId).map(({ id: _id, ...p }) => ({ ...p, album_id: data.id }));
      if (photos.length) {
        const { error: e2 } = await db.from("gallery_photos").insert(photos);
        if (e2) throw new Error(`gallery_photos: ${e2.message}`);
      }
      console.log(`✓ album "${album.title}" with ${photos.length} photos`);
    }
  }
  console.log("Done. Pages without saved text use the built-in text until staff edit them.");
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
