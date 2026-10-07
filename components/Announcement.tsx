import { ext } from "@/lib/nav";
import type { Announcement as Item } from "@/lib/types";
import { Icon } from "./Icon";

export function Announcement({ items: list }: { items: Item[] }) {
  if (!list.length) return null;
  // The list is rendered twice so the ticker can loop without a gap.
  const items = [...list, ...list];
  return (
    <div className="border-b border-lichen/50 bg-mint py-2" role="region" aria-label="Announcements">
      <div className="wrap flex items-center gap-3">
        <span className="flex shrink-0 items-center gap-2 bg-moss px-3 py-1 text-[12px] font-medium uppercase tracking-wider text-white">
          <Icon name="speaker" className="h-4 w-4" />
          <span className="hidden sm:inline">Latest News</span>
        </span>
        <div className="group relative flex-1 overflow-hidden">
          <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:flex-wrap">
            {items.map((a, i) => (
              <li key={i} aria-hidden={i >= list.length} className="flex items-center whitespace-nowrap pr-8 text-[13.5px] text-moss">
                <span className="mr-2 h-2 w-2 rounded-full bg-sage" />
                <a href={a.file_url || a.link || "/downloads/circulars"} {...ext(a.file_url || a.link)} tabIndex={i >= list.length ? -1 : undefined} className="hover:text-moss hover:underline">{a.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
