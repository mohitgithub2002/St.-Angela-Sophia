export function Crest({ className = "h-[52px] w-[46px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 46 52" className={className} aria-hidden="true">
      <path d="M23 1C11 1 2 9.5 2 21v29h42V21C44 9.5 35 1 23 1Z" fill="#375534" />
      <path d="M23 6C14 6 7 13 7 22v24h32V22C39 13 32 6 23 6Z" fill="none" stroke="#AEC3B0" strokeWidth="1.2" strokeDasharray="0 3.4" strokeLinecap="round" />
      <path d="M12 33c4-2 8-2 11 1 3-3 7-3 11-1v8c-4-2-8-2-11 1-3-3-7-3-11-1v-8Z" fill="#ffffff" />
      <path d="M23 34v8" stroke="#6B9071" strokeWidth="1.2" />
      <path d="M23 13l2.2 5.4 5.6.4-4.3 3.6 1.4 5.5L23 25l-4.9 2.9 1.4-5.5-4.3-3.6 5.6-.4L23 13Z" fill="#E3EED4" />
    </svg>
  );
}
