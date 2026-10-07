import type { Metadata, Viewport } from "next";
import { Roboto, Roboto_Slab } from "next/font/google";
import "./globals.css";

const slab = Roboto_Slab({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-slab" });
const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], variable: "--font-roboto" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "St. Angela Sophia Senior Secondary School, Jaipur", template: "%s | St. Angela Sophia School, Jaipur" },
  description:
    "A CBSE girls' school in Jaipur run by the Mission Sisters of Ajmer, educating girls from Nursery to Class XII since 1926.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0F2A1D" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${slab.variable} ${roboto.variable}`}>
      <body className="bg-white font-sans text-[15px] leading-[1.8] text-moss antialiased">{children}</body>
    </html>
  );
}
