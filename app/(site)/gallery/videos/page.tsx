import type { Metadata } from "next";
import { Empty, PageShell } from "@/components/page/PageShell";
import { getVideos } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Video Gallery" };

// Accepts the usual YouTube link forms: watch?v=, youtu.be/, /embed/, /shorts/, /live/.
const youtubeId = (url: string) => url.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/)?.[1];

export default async function Videos() {
  const videos = await getVideos();
  return (
    <PageShell section="gallery" href="/gallery/videos" intro="Videos of Annual Day, Sports Day and other major school events.">
      {videos.length === 0 && <Empty>Videos will appear here.</Empty>}
      <ul className="grid gap-6 md:grid-cols-2">
        {videos.map((v) => {
          const id = youtubeId(v.url);
          return (
            <li key={v.id} className="bg-white shadow-[0_2px_10px_rgba(0,0,0,.08)]">
              {id ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${id}`}
                  title={v.title}
                  loading="lazy"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="aspect-video w-full border-0"
                />
              ) : (
                <a href={v.url} target="_blank" rel="noopener" className="grid aspect-video place-items-center bg-forest text-white">Watch video</a>
              )}
              <div className="p-4">
                <h2 className="text-[17px] font-semibold">{v.title}</h2>
                {v.date && <p className="text-[13px] text-moss/80">{formatDate(v.date)}</p>}
              </div>
            </li>
          );
        })}
      </ul>
    </PageShell>
  );
}
