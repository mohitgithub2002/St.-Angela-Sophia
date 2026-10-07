import type { NextConfig } from "next";

// Photos uploaded through the admin panel are served from Supabase Storage.
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL) : null;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
      ...(supabase
        ? [{ protocol: supabase.protocol.replace(":", "") as "http" | "https", hostname: supabase.hostname, port: supabase.port, pathname: "/storage/v1/object/public/**" }]
        : []),
    ],
  },
  // Job applications carry a résumé of up to 5 MB.
  experimental: { serverActions: { bodySizeLimit: "6mb" } },
};

export default nextConfig;
