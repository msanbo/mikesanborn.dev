import { readFileSync } from "node:fs";
import { join } from "node:path";

export const ogImageSize = { width: 1200, height: 630 };

let cachedScreenshot: string | null = null;

function phoneScreenshotDataUri() {
  if (!cachedScreenshot) {
    const bytes = readFileSync(
      join(process.cwd(), "assets", "amberhour-phone-source.jpg")
    );
    cachedScreenshot = `data:image/jpeg;base64,${bytes.toString("base64")}`;
  }
  return cachedScreenshot;
}

export function ogImageJsx(tagline: string) {
  const screenshot = phoneScreenshotDataUri();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        background: "#f4ede3",
        padding: "70px 80px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          paddingRight: 40,
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 600, color: "#1a1410" }}>
          Mike Sanborn
        </div>
        <div style={{ fontSize: 30, color: "#5c5347", marginTop: 20 }}>
          {tagline}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: 300,
          height: 490,
          borderRadius: 32,
          border: "10px solid #1a1410",
          background: "#1a1410",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {/* next/image can't run inside next/og's ImageResponse (satori, not the DOM) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={screenshot}
          width={280}
          height={470}
          style={{ objectFit: "cover", borderRadius: 22 }}
        />
      </div>
    </div>
  );
}

const articleStats: Array<{ label: string; before: string; after: string }> = [
  { label: "PERFORMANCE", before: "82", after: "95" },
  { label: "LCP", before: "2.4s", after: "1.9s" },
  { label: "TBT", before: "608ms", after: "197ms" },
];

export function articleOgImageJsx() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#f4ede3",
        padding: "64px 80px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
          color: "#5c5347",
        }}
      >
        <div>Case study</div>
        <div>mikesanborn.dev</div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 46,
          fontWeight: 600,
          color: "#1a1410",
          lineHeight: 1.25,
          marginTop: 28,
          maxWidth: 920,
        }}
      >
        9 categories of defect an AI agent produced. Real before/after
        numbers.
      </div>

      <div
        style={{
          display: "flex",
          marginTop: "auto",
          paddingTop: 40,
          borderTop: "2px solid #1a1410",
        }}
      >
        {articleStats.map((stat) => (
          <div
            key={stat.label}
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <div
              style={{
                fontSize: 22,
                letterSpacing: 2,
                color: "#5c5347",
              }}
            >
              {stat.label}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                marginTop: 10,
                color: "#1a1410",
              }}
            >
              <div style={{ display: "flex", fontSize: 40, color: "#8a8072" }}>
                {stat.before}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 34,
                  margin: "0 14px",
                  color: "#8a8072",
                }}
              >
                →
              </div>
              <div style={{ display: "flex", fontSize: 54, fontWeight: 700 }}>
                {stat.after}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
