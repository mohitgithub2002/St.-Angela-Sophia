type Name =
  | "book" | "heart" | "star" | "globe" | "chart" | "flask" | "pen" | "menu" | "close"
  | "info" | "building" | "home" | "trophy" | "bullhorn" | "cap" | "phone" | "mail" | "pin"
  | "speaker" | "arrow" | "up" | "left" | "right" | "calendar" | "quote" | "screen" | "sun"
  | "download" | "camera" | "shield" | "rupee" | "file" | "plus" | "trash" | "user" | "play" | "gear"
  | "logout" | "external" | "inbox" | "check" | "upload" | "eye" | "image" | "bus" | "list";

const paths: Record<Name, React.ReactNode> = {
  book: <><path d="M6 10c5-2 10-2 14 2 4-4 9-4 14-2v20c-5-2-10-2-14 2-4-4-9-4-14-2Z" /><path d="M20 12v20" /></>,
  heart: <path d="M20 33S6 25 6 15a7 7 0 0 1 14-2 7 7 0 0 1 14 2c0 10-14 18-14 18Z" />,
  star: <path d="M20 5l4 9 10 1-7.5 7 2 10L20 27l-8.5 5 2-10L6 15l10-1Z" />,
  globe: <><circle cx="20" cy="20" r="14" /><path d="M6 20h28M20 6c4 4 6 9 6 14s-2 10-6 14c-4-4-6-9-6-14s2-10 6-14Z" /></>,
  chart: <><path d="M8 32V18M16 32V10M24 32V20M32 32V7" /><path d="M4 32h32" /></>,
  flask: <><path d="M16 5h8M17.5 5v10L9 32a2.5 2.5 0 0 0 2.3 3.5h17.4A2.5 2.5 0 0 0 31 32l-8.5-17V5" /><path d="M12 26h16" /></>,
  pen: <><path d="M9 29l3.5-10L28 7l3.5 3.5L19.5 26Z" /><path d="M9 29l7-1.8M7 34h26" /></>,
  menu: <path d="M7 12h26M7 20h26M7 28h26" />,
  close: <path d="M10 10l20 20M30 10L10 30" />,
  info: <><circle cx="20" cy="20" r="14" /><path d="M20 18v10M20 12.5v.5" /></>,
  building: <><path d="M8 34V12l12-6 12 6v22Z" /><path d="M14 18h3M23 18h3M14 24h3M23 24h3M17 34v-5h6v5" /></>,
  home: <><path d="M6 19L20 7l14 12" /><path d="M10 16v18h20V16M17 34v-9h6v9" /></>,
  trophy: <><path d="M13 6h14v8a7 7 0 0 1-14 0Z" /><path d="M13 9H7c0 5 3 7 6 7M27 9h6c0 5-3 7-6 7M20 21v6M14 33h12M16 33l1-6h6l1 6" /></>,
  bullhorn: <><path d="M7 16v8h5l14 7V9l-14 7Z" /><path d="M12 24l2 9h4l-2-8M30 16a5 5 0 0 1 0 8" /></>,
  cap: <><path d="M3 15l17-7 17 7-17 7Z" /><path d="M10 18v8c3 3 7 4 10 4s7-1 10-4v-8M35 16v9" /></>,
  phone: <path d="M10 6h6l3 8-4 3a20 20 0 0 0 8 8l3-4 8 3v6a3 3 0 0 1-3 3C17 33 7 23 7 9a3 3 0 0 1 3-3Z" />,
  mail: <><rect x="5" y="9" width="30" height="22" rx="2" /><path d="M5 11l15 11 15-11" /></>,
  pin: <><path d="M20 35s11-10 11-19a11 11 0 0 0-22 0c0 9 11 19 11 19Z" /><circle cx="20" cy="16" r="4" /></>,
  speaker: <><path d="M6 16v8h6l10 7V9l-10 7Z" /><path d="M27 15a7 7 0 0 1 0 10M31 11a12 12 0 0 1 0 18" /></>,
  arrow: <path d="M8 20h24M24 12l8 8-8 8" />,
  up: <path d="M12 24l8-8 8 8" />,
  left: <path d="M24 10l-10 10 10 10" />,
  right: <path d="M16 10l10 10-10 10" />,
  quote: <path d="M8 28c0-8 3-13 9-16M8 28h8v-8H8M23 28c0-8 3-13 9-16M23 28h8v-8h-8" />,
  calendar: <><rect x="6" y="9" width="28" height="25" rx="2" /><path d="M6 16h28M13 5v7M27 5v7" /></>,
  screen: <><rect x="5" y="7" width="30" height="20" rx="2" /><path d="M20 27v6M13 33h14M11 21l6-6 4 4 7-7" /></>,
  sun: <><circle cx="20" cy="20" r="6" /><path d="M20 5v4M20 31v4M5 20h4M31 20h4M9.4 9.4l2.8 2.8M27.8 27.8l2.8 2.8M9.4 30.6l2.8-2.8M27.8 12.2l2.8-2.8" /></>,
  download: <><path d="M20 6v20M12 18l8 8 8-8" /><path d="M7 30v4h26v-4" /></>,
  upload: <><path d="M20 26V6M12 14l8-8 8 8" /><path d="M7 30v4h26v-4" /></>,
  camera: <><path d="M5 13h7l3-4h10l3 4h7v20H5Z" /><circle cx="20" cy="22" r="6" /></>,
  shield: <><path d="M20 5l13 5v9c0 8-6 14-13 16-7-2-13-8-13-16v-9Z" /><path d="M14 20l4 4 8-8" /></>,
  rupee: <path d="M12 8h17M12 15h17M16 8c10 0 10 14 0 14h-4l14 12" />,
  file: <><path d="M10 5h13l8 8v22H10Z" /><path d="M23 5v8h8M15 21h11M15 27h11" /></>,
  plus: <path d="M20 8v24M8 20h24" />,
  trash: <><path d="M7 11h26M16 11V7h8v4M10 11l2 23h16l2-23" /><path d="M17 17v11M23 17v11" /></>,
  user: <><circle cx="20" cy="14" r="7" /><path d="M7 35c1-7 6-11 13-11s12 4 13 11" /></>,
  play: <><circle cx="20" cy="20" r="15" /><path d="M16 13v14l11-7Z" /></>,
  gear: <><circle cx="20" cy="20" r="5" /><path d="M20 5v5M20 30v5M5 20h5M30 20h5M9.4 9.4l3.5 3.5M27.1 27.1l3.5 3.5M9.4 30.6l3.5-3.5M27.1 12.9l3.5-3.5" /></>,
  logout: <><path d="M17 7H8v26h9" /><path d="M16 20h17M27 14l6 6-6 6" /></>,
  external: <><path d="M23 7h10v10M33 7L18 22" /><path d="M29 24v9H7V11h9" /></>,
  inbox: <><path d="M5 22l5-15h20l5 15v11H5Z" /><path d="M5 22h9l2 4h8l2-4h9" /></>,
  check: <path d="M8 21l8 8 16-17" />,
  eye: <><path d="M3 20s6-11 17-11 17 11 17 11-6 11-17 11S3 20 3 20Z" /><circle cx="20" cy="20" r="5" /></>,
  image: <><rect x="5" y="7" width="30" height="26" rx="2" /><circle cx="14" cy="15" r="3" /><path d="M5 29l9-9 7 7 5-5 9 9" /></>,
  bus: <><rect x="8" y="5" width="24" height="25" rx="3" /><path d="M8 18h24M13 30v4M27 30v4" /><circle cx="14" cy="24" r="1.5" /><circle cx="26" cy="24" r="1.5" /></>,
  list: <path d="M14 10h20M14 20h20M14 30h20M6 10h2M6 20h2M6 30h2" />,
};

export type IconName = Name;

export const ICON_NAMES = Object.keys(paths) as Name[];

// name may come from the database, so unknown names fall back to a star.
export function Icon({ name, className = "h-10 w-10" }: { name: Name | (string & {}); className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name as Name] ?? paths.star}
    </svg>
  );
}
