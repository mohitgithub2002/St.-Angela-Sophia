"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { addPhotos, deletePhoto, moveRow, savePhotoCaption, setCover } from "@/app/admin/actions";
import { imageUrl } from "../Photo";
import { Icon } from "../Icon";
import { dangerBtn, smallBtn } from "./ui";
import { acceptFor, hintFor, uploadFile } from "./upload";

type P = { id: string; image: string; caption: string };

// Upload several photos at once, caption them, reorder them and pick the album cover.
export function PhotoManager({ albumId, photos, cover }: { albumId: string; photos: P[]; cover: string }) {
  const router = useRouter();
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  const ids = photos.map((p) => p.id);
  const run = (fn: () => Promise<void>) => start(async () => {
    setError("");
    try { await fn(); router.refresh(); } catch (e) { setError(e instanceof Error ? e.message : "Something went wrong."); }
  });

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    const urls: string[] = [];
    const failed: string[] = [];
    for (const [n, file] of [...files].entries()) {
      setProgress(`Uploading ${n + 1} of ${files.length}…`);
      try { urls.push(await uploadFile(file, "image")); } catch (e) { failed.push(`${file.name}: ${e instanceof Error ? e.message : "failed"}`); }
    }
    setProgress("");
    if (failed.length) setError(failed.join(" · "));
    if (urls.length) run(() => addPhotos(albumId, urls));
  }

  return (
    <div>
      <label className={`flex cursor-pointer items-center justify-center gap-2 border-2 border-dashed border-sage bg-white px-4 py-6 text-[15px] font-medium text-moss hover:bg-mint ${progress ? "opacity-60" : ""}`}>
        <Icon name="upload" className="h-6 w-6" />
        {progress || "Add photos"}
        <span className="text-[13px] font-normal text-moss/70">({hintFor("image")} each)</span>
        <input type="file" multiple accept={acceptFor("image")} disabled={!!progress} className="sr-only" onChange={(e) => { upload(e.target.files); e.target.value = ""; }} />
      </label>
      {error && <p role="alert" className="mt-2 text-[14px] text-red-700">{error}</p>}
      {photos.length > 0 && (
        <ul className={`mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${pending ? "opacity-70" : ""}`}>
          {photos.map((p, i) => (
            <li key={p.id} className="bg-white shadow-sm ring-1 ring-lichen/60">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl(p.image)} alt={p.caption} className="aspect-[4/3] w-full object-cover" />
                {p.image === cover && <span className="absolute left-2 top-2 bg-forest px-2 py-0.5 text-[11px] font-semibold uppercase text-white">Cover</span>}
              </div>
              <div className="space-y-2 p-3">
                <input
                  defaultValue={p.caption}
                  placeholder="Caption"
                  aria-label="Caption"
                  onBlur={(e) => e.target.value !== p.caption && run(() => savePhotoCaption(p.id, e.target.value))}
                  className="w-full border border-lichen px-2 py-1.5 text-[14px] focus:border-moss focus:outline-none"
                />
                <div className="flex flex-wrap gap-1.5">
                  <button type="button" disabled={i === 0} onClick={() => run(() => moveRow("gallery_photos", ids, p.id, -1))} aria-label="Move earlier" className={`${smallBtn} !px-2 disabled:opacity-30`}><Icon name="left" className="h-4 w-4" /></button>
                  <button type="button" disabled={i === photos.length - 1} onClick={() => run(() => moveRow("gallery_photos", ids, p.id, 1))} aria-label="Move later" className={`${smallBtn} !px-2 disabled:opacity-30`}><Icon name="right" className="h-4 w-4" /></button>
                  {p.image !== cover && <button type="button" onClick={() => run(() => setCover(albumId, p.image))} className={smallBtn}>Make cover</button>}
                  <button type="button" onClick={() => window.confirm("Delete this photo?") && run(() => deletePhoto(p.id))} className={`${dangerBtn} ml-auto`}>Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
