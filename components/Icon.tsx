type Name =
  | "book" | "heart" | "star" | "globe" | "chart" | "flask" | "pen" | "menu" | "close"
  | "info" | "building" | "home" | "trophy" | "bullhorn" | "cap" | "phone" | "mail" | "pin"
  | "speaker" | "arrow" | "up" | "left" | "right" | "calendar" | "quote" | "screen" | "sun";

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
};

export type IconName = Name;

export function Icon({ name, className = "h-10 w-10" }: { name: Name; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
