import { ImageResponse } from "next/og";
import { articleOgImageJsx, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Image() {
  return new ImageResponse(articleOgImageJsx(), { ...size });
}
