import { ImageResponse } from "next/og";
import { ogImageJsx, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Image() {
  return new ImageResponse(
    ogImageJsx(
      "Software that holds up.",
      "Software developer in Wisconsin. Building JobsiteHQ."
    ),
    { ...size }
  );
}
