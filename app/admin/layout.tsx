import type { Metadata } from "next";

export const metadata: Metadata = { title: { default: "Admin", template: "%s | School Admin" }, robots: { index: false, follow: false } };

export default function AdminRoot({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#f6f8f3]">{children}</div>;
}
