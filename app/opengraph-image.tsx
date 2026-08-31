import { ImageResponse } from "next/og";
import { ogImageJsx, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Image() {
  return new ImageResponse(
    ogImageJsx("I build Next.js storefronts on Medusa."),
    { ...size }
  );
}
