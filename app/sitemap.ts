import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mikesanborn.dev";

  return [
    {
      url: base,
      lastModified: new Date("2026-08-31"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/writing/what-an-ai-agent-gets-wrong-building-a-medusa-storefront`,
      lastModified: new Date("2026-08-31"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
