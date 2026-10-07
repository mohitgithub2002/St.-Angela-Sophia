"use client";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Photo } from "./Photo";

// Photo grid that opens a full-screen viewer with previous/next and keyboard support.
export function Lightbox({ photos }: { photos: { id: string; src: string; caption: string }[] }) {
  const [i, setI] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const go = (step: number) => setI((n) => (n === null ? n : (n + step + photos.length) % photos.length));

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (i !== null && !d.open) d.showModal();
    if (i === null && d.open) d.close();
  }, [i]);

  const p = i === null ? null : photos[i];
  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((ph, n) => (
          <li key={ph.id}>
            <button onClick={() => setI(n)} className="group relative block aspect-[4/3] w-full overflow-hidden" aria-label={`Open photo ${n + 1}${ph.caption ? `: ${ph.caption}` : ""}`}>
              <Photo src={ph.src} alt={ph.caption} sizes="(min-width: 1024px) 230px, 50vw" className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" />
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={dialog}
        onClose={() => setI(null)}
        onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}
        className="m-auto h-[100dvh] max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-black/90"
      >
        {p && (
          <div className="relative flex h-full flex-col items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && setI(null)}>
            <div className="relative h-[80vh] w-full max-w-5xl">
              <Photo src={p.src} alt={p.caption} sizes="100vw" plain className="absolute inset-0 [&_img]:!object-contain" />
            </div>
            <p className="mt-3 text-center text-white">{p.caption} <span className="text-white/60">({(i ?? 0) + 1} / {photos.length})</span></p>
            <button onClick={() => setI(null)} aria-label="Close" className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><Icon name="close" className="h-6 w-6" /></button>
            {photos.length > 1 && (
              <>
                <button onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><Icon name="left" className="h-6 w-6" /></button>
                <button onClick={() => go(1)} aria-label="Next photo" className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><Icon name="right" className="h-6 w-6" /></button>
              </>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
