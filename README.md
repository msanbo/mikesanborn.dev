# mikesanborn.dev

Next.js, statically exported, deployed on Vercel. One route (`/`) plus one
article route at its own slug — no `[slug]` dynamic segment, no content
pipeline, just a literal nested folder:
`app/writing/what-an-ai-agent-gets-wrong-building-a-medusa-storefront/`.
No CMS, no MDX, no blog index — content lives in `page.tsx` files as plain
JSX.

## Content status

All real. No placeholder copy remains (`grep -rn PLACEHOLDER app/` returns
nothing) — hero, the full case-study article, Amber Hour case study,
pricing tiers, contact, metadata, OG images, and favicon all come from the
source docs. The article's byline date is hardcoded to August 31, 2026 —
update it if this ships later.

The homepage's Work section carries one screenshot — the Amber Hour
catalog page on mobile, next to the Lighthouse numbers it backs up. It's
`public/amberhour-catalog.webp`, a pre-sized (320×537, ~2x for a 160px
display width) WebP derived from `assets/amberhour-phone-source.jpg`,
which is also still used inside the homepage's OG image phone-frame
mockup. Regenerate it with `sips`/`cwebp` if the source screenshot ever
changes — see the git history on this file for the exact commands. No
other image appears on the homepage or in the article; the article's
arc/results table is its own visual and doesn't need one.

## Local dev

```bash
npm run dev
```

## Build (static export)

```bash
npm run build
```

Output goes to `out/`. Preview it with `npx serve out`.

## Metadata checklist

- `metadataBase` is set in `app/layout.tsx` to `https://mikesanborn.dev` —
  update this first if the domain ever changes, or every relative OG/canonical
  URL silently points at the wrong host.
- Both routes set `alternates.canonical` explicitly (root layout for `/`,
  the article's own metadata for its slug) — this is the URL that goes in
  every cross-post's `canonical_url` front matter (dev.to, Hashnode) so
  SEO accrues here, not there.
- Title/description are set per-route, not copy-pasted — check both after
  editing copy.
- OG images are real graphics, not gradients, and **not shared** between
  routes: the homepage renders a phone-frame mockup of the Amber Hour
  catalog screenshot; the article renders its own before/after performance
  stats (Perf/LCP/TBT) as a graphic, built from the same numbers in
  section 6. Both live in `lib/og-image.tsx` (`next/og`, reading
  `assets/amberhour-phone-source.jpg` at build time for the homepage one).
  Each route needs its **own** `opengraph-image.tsx` file — Next does not
  inherit a parent segment's file-based OG image once a route defines its
  own `openGraph`/`twitter` metadata object, so a route with custom
  metadata and no image file of its own silently ships with no `og:image`
  at all. Verify with LinkedIn's Post Inspector before sending a single
  email.
- Favicon is generated via `app/icon.tsx` (same `next/og` mechanism).

## Cross-posting the article

Publish here first. Wait a few days for it to get indexed, then cross-post
to dev.to / Hashnode with `canonical_url` (dev.to front matter) or the
equivalent Hashnode field set to the canonical URL above. Skip Medium.

## Deploy

Push to a GitHub repo and import it in Vercel (framework preset: Next.js —
it auto-detects `output: "export"` and serves the static output).

After deploying, re-run Lighthouse (mobile) against the live URL as the
real check — local runs against a dev-machine preview server can read a
couple points low on LCP due to Lighthouse's simulated-throttling model;
the production numbers on Vercel's edge are what actually matter.
