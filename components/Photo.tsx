import Image from "next/image";

// A photo slot. src is a file name in public/images/ (the original photos) or a full URL
// (photos uploaded through the admin panel). next/image lazy-loads it and serves a resized
// WebP/AVIF; the green gradient underneath shows while it loads, or alone when src is empty.
const fallback =
  "repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0 2px, transparent 2px 14px), linear-gradient(160deg, #6B9071 0%, #375534 45%, #0F2A1D 100%)";

export const imageUrl = (src: string) => (/^(https?:)?\/\//.test(src) || src.startsWith("/") ? src : `/images/${src}`);

export function Photo({
  src,
  alt,
  className = "",
  position = "center",
  sizes = "100vw",
  priority = false,
  plain = false,
}: {
  src: string;
  alt: string;
  className?: string;
  position?: string;
  sizes?: string;
  priority?: boolean;
  plain?: boolean;
}) {
  // The image fills its wrapper, so the wrapper must be positioned.
  const positioned = /\b(absolute|fixed|relative)\b/.test(className) ? "" : "relative ";
  return (
    <div className={`${positioned}overflow-hidden ${className}`} style={plain ? undefined : { backgroundImage: fallback }}>
      {src && <Image src={imageUrl(src)} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: position }} />}
    </div>
  );
}
