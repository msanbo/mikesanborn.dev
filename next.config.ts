import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Pin the project root explicitly: a stray yarn.lock in the parent
  // (home) directory otherwise makes Next.js guess the workspace root.
  turbopack: {
    root: __dirname,
  },
  images: {
    // Static export has no server, so the Image Optimization API can't run
    // at request time. Pre-size and pre-compress screenshots (WebP/AVIF)
    // before dropping them in /public — next/image still handles lazy
    // loading and layout stability, just not runtime resizing.
    unoptimized: true,
  },
};

export default nextConfig;
