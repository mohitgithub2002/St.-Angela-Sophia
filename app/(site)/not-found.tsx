import Link from "next/link";
import { MPD_HREF } from "@/lib/nav";

export default function NotFound() {
  return (
    <div className="wrap py-24 text-center">
      <p className="font-serif text-[64px] font-bold leading-none text-lichen">404</p>
      <h1 className="mt-3 text-[28px] font-bold uppercase">Page not found</h1>
      <p className="mt-2">The page you were looking for has moved or no longer exists.</p>
      <p className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn">Home</Link>
        <Link href={MPD_HREF} className="btn !bg-white !text-moss ring-1 ring-moss ring-inset hover:!bg-moss hover:!text-white">Mandatory Public Disclosure</Link>
        <Link href="/contact" className="btn !bg-white !text-moss ring-1 ring-moss ring-inset hover:!bg-moss hover:!text-white">Contact</Link>
      </p>
    </div>
  );
}
