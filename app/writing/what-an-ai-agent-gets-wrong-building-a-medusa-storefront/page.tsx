import Link from "next/link";
import type { Metadata } from "next";

const title = "What an AI agent gets wrong building a Medusa storefront";
const description =
  "I built a multi-region Next.js storefront on Medusa 2.0 with an AI agent doing the implementation and me directing and reviewing. Here's the architecture, nine categories of defect the agent produced, and a profiling arc where the score barely moved and the fix was still real.";

const path =
  "/writing/what-an-ai-agent-gets-wrong-building-a-medusa-storefront";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, type: "article", url: path },
  twitter: { card: "summary_large_image", title, description },
};

function CiteLinks() {
  return (
    <p className="cite-line">
      <strong>Live:</strong>{" "}
      <a className="link" href="https://www.amberhour.coffee">
        https://www.amberhour.coffee
      </a>{" "}
      · <strong>Source:</strong>{" "}
      <a className="link" href="https://github.com/msanbo/coffee-demo-store">
        github.com/msanbo/coffee-demo-store
      </a>
    </p>
  );
}

export default function Writing() {
  return (
    <>
      <header className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <Link className="link mono" href="/">
            ← Mike Sanborn
          </Link>
        </div>
      </header>

      <main className="section">
        <article className="container">
          <h1>{title}</h1>
          <p className="dek">{description}</p>
          <p className="muted mono">By Mike Sanborn · August 31, 2026</p>

          <h2>1. The premise</h2>
          <p>
            Most writing about AI-assisted development is either &ldquo;the
            agent built my app in an afternoon&rdquo; or &ldquo;the agent is
            useless.&rdquo; Both are marketing. The useful version is
            specific: what the agent does well, what it gets wrong every
            time, and what review process catches the difference.
          </p>
          <p>
            This is that write-up, built around a real storefront — Amber
            Hour Coffee Co., a specialty roaster selling into the US in USD
            and the EU in EUR, with a variant-heavy catalog and mobile-first
            traffic.
          </p>
          <p>
            The implementation was agent-driven. The architecture, the
            product model, the infrastructure decisions, and every review
            pass were mine. That division is the subject.
          </p>
          <CiteLinks />

          <h2>2. What was being built</h2>
          <p>
            Requirements a real roaster would hand you, not sample-data
            requirements:
          </p>
          <ul>
            <li>
              Two currencies, country-specific URLs, region-aware pricing
              throughout
            </li>
            <li>
              Three grinds × three bag sizes per coffee — nine buyable
              variants, each with its own SKU and shipping weight
            </li>
            <li>
              Volume pricing where per-pound cost drops as bag size
              increases
            </li>
            <li>
              Origin, process, altitude, and roast level on every product,
              because that&rsquo;s what this category shops on
            </li>
            <li>A taxonomy of single origins, house blends, and ready-to-drink</li>
            <li>Fast on a phone</li>
          </ul>
          <p>
            The Medusa Next.js starter gives you a working store. It gives
            you none of the above.
          </p>

          <h2>3. Architecture</h2>
          <p>
            <strong>Regions are not countries.</strong> The most
            consequential modeling decision in the build. Amber Hour has two
            regions — United States on USD, Europe on EUR — with six
            countries mapped across them, five in the EU region. Countries
            drive URL routing and the customer-facing selector. Regions
            drive currency, pricing, and tax. Collapse them into one concept
            and you either duplicate price sets per country or you
            can&rsquo;t give France and Germany their own URLs. Routing is a{" "}
            <code>[countryCode]</code> dynamic segment at the App Router
            root, with the country resolving to a region before any product
            query runs.
          </p>
          <p>
            <strong>Server-first rendering with deliberate client
            boundaries.</strong> Product and region data are fetched on the
            server. Variant selection, cart, and the region switcher are the
            client edge. Related products and the image gallery sit behind
            Suspense with skeleton fallbacks, so primary content paints
            without waiting on secondary queries.
          </p>
          <p>
            <strong>The product model carries operational reality.</strong>{" "}
            Nine variants per product on a consistent SKU scheme (
            <code>KENYA-AA-WH-2LB</code>), with real shipping weights in
            grams — 908, 2270, 4540. Prices ladder rather than scale: Kenya
            AA at $48, $106, and $187 works out to $24.00, $21.20, and
            $18.70 per pound. Demo stores price everything at $10. Real ones
            have a pricing strategy, SKUs a warehouse can pick, and weights
            a shipping calculator can use.
          </p>
          <p>
            <strong>Object storage on a domain I control.</strong> Images on
            Cloudflare R2 behind <code>cdn.amberhour.coffee</code>. R2 over
            S3 because image bandwidth is the recurring cost that matters on
            a storefront and R2 has no egress fees; a bound custom domain
            rather than the <code>r2.dev</code> development endpoint, which
            is rate-limited and not intended for production.
          </p>
          <p>
            These were my calls. The agent implemented them quickly and
            mostly correctly. What follows is where that broke down.
          </p>

          <h2>4. What the agent got wrong</h2>
          <p>
            Not a list of bugs — a list of <em>categories</em>, because the
            categories predict what to look for next time.
          </p>

          <h3>4.1 Configuration that only works locally</h3>
          <p>
            Every page shipped <code>og:image</code> and{" "}
            <code>twitter:image</code> pointing at{" "}
            <code>https://localhost:8000/...</code>. Nothing errors.
            Nothing looks wrong in development. Production renders every
            social share with a broken preview — on a site whose
            distribution model is getting a link pasted into Slack and
            LinkedIn.
          </p>
          <p>
            Agents optimize for &ldquo;runs on my machine,&rdquo; because
            that&rsquo;s the feedback loop they&rsquo;re in. Anything that
            only fails on a different origin is invisible to them.
          </p>

          <h3>4.2 Silent omissions inside things that look complete</h3>
          <p>
            The product route&rsquo;s <code>generateMetadata</code> returned
            a title and nothing else — no description, no Open Graph, no
            Twitter card. The Contact and Why Us pages had the full set. So
            metadata &ldquo;worked,&rdquo; on the pages that mattered least,
            and the highest-value SEO surface in the store shipped bare.
          </p>
          <p>
            The agent produces the shape of the correct thing, and the
            incomplete instance is the one you don&rsquo;t happen to open.
          </p>

          <h3>4.3 Framework defaults left in place</h3>
          <p>
            The starter&rsquo;s title template survived on the product route
            long after being replaced everywhere else, so flagship pages
            read <code>... | Medusa Store</code>. Image uploads defaulted to
            the API server&rsquo;s local filesystem, which put a hostname
            derived from the backend&rsquo;s IP address into every image
            URL.
          </p>
          <p>Defaults are invisible precisely because they work.</p>

          <h3>4.4 Values that are correct at demo scale</h3>
          <p>
            The store page filters by category, roast and process, grind,
            and bag size. These are real facets. Roast and process are
            Medusa product tags — first-class <code>product_tag</code> rows,
            not metadata — and clicking one triggers a server-side re-render
            that issues a genuine <code>GET /store/products?tag_id=…</code>{" "}
            against the backend. No client-side array filtering.
          </p>
          <p>
            Inside <code>listProductsWithSort</code>, though:
          </p>
          <pre>
            <code>{`const { response: { products } } = await listProducts({
  queryParams: { ...queryParams, limit: 100 },
})
const filteredCount = products.length`}</code>
          </pre>
          <p>
            Two decisions there, both invisible at this catalog size. The
            query asks for 100 products regardless of the page size
            actually requested. And the total driving pagination is{" "}
            <code>products.length</code> — the size of that capped response
            — rather than the count Medusa&rsquo;s API returns in the same
            payload.
          </p>
          <p>
            At eight products those two numbers are identical. Pagination is
            correct. Every filter combination behaves. Nothing to see.
          </p>
          <p>
            Past 100 matches, the 101st product onward is silently
            unreachable and the UI reports no next page. Not because
            pagination broke, but because the code never asked how many
            products matched. It asked how many came back in the first
            hundred and treated that as the answer.
          </p>
          <p>
            The shape of it: an authoritative value was available — the API
            returned the real count — and the agent substituted a locally
            derived proxy that agrees with it at small N. Nothing throws.
            Nothing looks wrong. The defect sits latent in the arithmetic,
            waiting for a catalog large enough to expose it, and the catalog
            you test against is the one that never will.
          </p>

          <h3>4.5 Output that is correct by accident</h3>
          <p>
            Option values shipped with <code>rank: null</code> across the
            board, every variant at <code>variant_rank: 0</code>. Medusa
            returns them in whatever order it returns them. Bag sizes
            happened to render 2 lb, 5 lb, 10 lb — by insertion luck, not
            design. Grind and Bag Size swapped positions between products.
          </p>
          <p>
            The sneakiest category: the output is right, so nothing draws
            your attention, and the nondeterminism surfaces later on a
            different dataset or after a reseed.
          </p>

          <h3>4.6 Regressions with no visible symptom</h3>
          <p>
            The site-wide banner was a 1936-pixel-wide PNG rendered
            full-bleed with <code>priority</code> on every route and no{" "}
            <code>sizes</code> attribute, so a phone downloaded close to the
            desktop asset. Priority makes an image load <em>sooner</em>,
            not <em>smaller</em>. If the asset is wrong for the viewport,
            priority just fetches the wrong thing faster.
          </p>
          <p>
            Separately, the LCP image on the catalog page was lazy-loaded.
            The one image that must not wait, waiting.
          </p>

          <h3>4.7 Partial fixes that create new defects</h3>
          <p>
            A breadcrumb rendering <code>Kenya Aa</code> — title-casing the
            slug instead of using the product title — got &ldquo;fixed&rdquo;
            by removing the trailing crumb entirely. The symptom went away.
            So did the feature.
          </p>
          <p>
            When you report a symptom rather than a cause, verify the fix
            addressed the cause.
          </p>

          <h3>4.8 Incomplete migrations</h3>
          <p>
            Moving images to R2 covered the products that got re-uploaded.
            Others still pointed at the old origin afterward. A migration
            that works on the instance you tested is not a migration.
          </p>

          <h3>4.9 Assets taken at face value</h3>
          <p>The one I&rsquo;d have missed if I hadn&rsquo;t gone looking at bytes.</p>
          <p>
            All eight product images were 1.5–1.8MB PNGs at 1024×1024,
            carrying a <code>.jpg</code> extension. Not JPEGs. Nothing in
            the pipeline questioned it, because the filename asserted a
            format and every layer downstream believed the filename.
          </p>
          <p>
            The consequence only appears under load: on a cache miss,
            Vercel&rsquo;s image optimizer has to fetch and decode a 1.7MB
            PNG from origin before it can resize or re-encode anything.
            Warm requests were fine. Cold ones were expensive, which is
            exactly the profile that hides from casual testing and shows up
            as unexplained tail latency.
          </p>
          <p>
            The general form: the agent trusts metadata about a thing over
            the thing itself. File extensions, declared types, names. When
            they disagree with reality, nothing checks.
          </p>

          <h2>5. The review process that catches this</h2>
          <p>
            None of the above argues against agent-driven implementation.
            The build moved far faster than hand-writing it would have. It
            argues that review has to be structured, because clicking
            around finds almost none of these.
          </p>
          <p>
            <strong>Read the shipped payload, not the rendered page.</strong>{" "}
            Null ranks, metadata gaps, mixed image origins, price coverage —
            invisible in a browser, obvious in the server response.
          </p>
          <p>
            <strong>Check coverage as a count, not by sampling.</strong>{" "}
            Nine variants × eight products × two currencies is 144 price
            entries. The multi-region failure mode is that prices seed for
            the default currency and silently not the others: the US store
            works perfectly, the EU store renders empty prices, and you find
            out when a customer switches regions. The same instinct that
            catches missing EUR prices catches this: ask the system for the
            number rather than inferring it from what you happen to have in
            hand.
          </p>
          <p>
            <strong>Inspect the artifact, not its description.</strong>{" "}
            Section 4.9 exists because I eventually checked the actual bytes
            of an image rather than its filename. Extensions, declared
            types, and content-type headers are all claims. Verify the ones
            that matter.
          </p>
          <p>
            <strong>Adversarial review by a second model.</strong> Handing
            deployed output to a different model with &ldquo;find what&rsquo;s
            wrong with this&rdquo; surfaced several of these — the localhost
            metadata, the missing product OG tags, the banner sizing —
            faster than I would have. An agent reviewing its own work shares
            its own blind spots. A different one doesn&rsquo;t.
          </p>
          <p>
            <strong>Measure repeatedly, and read the distribution.</strong>{" "}
            Which is most of the next section.
          </p>

          <h2>6. Profiling: what the score didn&rsquo;t tell me</h2>
          <p>
            The homepage scored 95 on mobile. Good number, easy route — no
            image gallery, no variant selector, no client-side option
            state. Publishing it would have been the convenient move.
          </p>
          <p>
            The catalog page is the one customers browse. It came back{" "}
            <strong>82</strong>.
          </p>

          <h3>Round 1 — the obvious blocking work</h3>
          <p>
            Baseline at <code>/us/store</code>, mobile: performance 82, FCP
            930ms, LCP 2.4s, TTI 5.3s, <strong>TBT 608ms</strong>, CLS 0.
          </p>
          <p>
            CLS at 0 meant layout was solid. FCP under a second meant the
            server response was fine. TBT — over half a second of blocked
            main thread, weighted at 30% of the composite — was the
            problem. A JavaScript execution problem, not a network or
            layout one.
          </p>
          <p>
            Two causes, both agent defaults. The LCP image was lazy-loaded.
            And the category navigation was a client component in the
            layout receiving the entire category tree, with every
            product&rsquo;s full serialized description embedded in its
            props, hydrating on every route — for a menu most visitors
            never open.
          </p>
          <p>
            Result: <strong>98</strong>, TBT 156ms, LCP 1.3s.
          </p>
          <p>That looked like a finish. It wasn&rsquo;t, for two reasons.</p>

          <h3>Round 2 — the measurement tool was the payload</h3>
          <p>
            TTI had barely moved: 5.3s to 5.2s, while TBT collapsed. Those
            normally track together. Blocking work had come off the main
            thread, but something was still keeping the page from settling.
          </p>
          <p>
            The Lighthouse treemap answered it. Total JavaScript was 386.9
            KiB, and Google Tag Manager&rsquo;s <code>gtag.js</code> was{" "}
            <strong>169.4 KiB of it — 44%</strong>, more than three times
            the largest first-party chunk. It loads late and asynchronously,
            so it never showed up in TBT, but it kept the network and main
            thread busy long after primary content was done.
          </p>
          <p>
            I&rsquo;d tried mitigating it first — deferring the script,
            then giving the demo its own GA4 property — before concluding
            that a demo storefront doesn&rsquo;t need analytics at all.
          </p>
          <p>
            Result: bundle 386.9 → <strong>214.9 KiB</strong>, TTI 5.2s →{" "}
            <strong>3.1s</strong>.
          </p>
          <p>And the score went <em>down</em>, 98 to 96.</p>

          <h3>Round 3 — the number I&rsquo;d published was a lucky run</h3>
          <p>
            A single Lighthouse run is a sample. I&rsquo;d written 1.3s LCP
            into a draft on the strength of one of them. Three runs put the
            LCP median at 2.6s, with individual runs ranging 1.4s to 3.2s.
          </p>
          <p>
            So the 1.3s was the outlier and 2.6s was the truth. The score
            hadn&rsquo;t dropped because removing analytics hurt anything;
            it had dropped because the first number was never real.
          </p>
          <p>
            An 1.8-second spread on one metric while FCP held within 46ms
            of itself points at a single remote resource with unpredictable
            fetch time. The LCP element: the first product image.
          </p>

          <h3>Round 4 — fixing delivery, and finding it wasn&rsquo;t enough</h3>
          <p>
            Bound <code>cdn.amberhour.coffee</code> to the R2 bucket, off
            the rate-limited <code>r2.dev</code> development endpoint. Added{" "}
            <code>priority</code> to the first four grid items —{" "}
            <code>index &lt; 4</code> covers the full first row at every
            breakpoint, from two-column mobile to four-column desktop,
            rather than just the first pair.
          </p>
          <p>
            Five-run median: performance <strong>95</strong>, LCP{" "}
            <strong>2.4s</strong>, TBT 192ms, CLS 0. Range 86–98.
          </p>
          <p>
            Better, not fixed. Two of five runs still landed in the 80s,
            and LCP still had a 3.4s tail. Delivery wasn&rsquo;t the
            bottleneck.
          </p>

          <h3>Round 5 — the source files</h3>
          <p>
            This is section 4.9. All eight product images were 1.5–1.8MB
            PNGs mislabeled <code>.jpg</code>. Every cache miss forced the
            optimizer to fetch and decode a ~1.7MB PNG from origin before
            it could produce anything.
          </p>
          <p>
            Converted all eight to real WebP at quality 82:{" "}
            <strong>60–100KB, roughly 95% smaller</strong>. Uploaded to R2,
            updated eight <code>image.url</code> and eight{" "}
            <code>product.thumbnail</code> rows, deleted the old PNGs,
            revalidated the storefront cache and confirmed the live page
            serves <code>.webp</code> sources. A cold-cache transform of
            the largest remaining source, 92KB, now takes 350ms.
          </p>
          <p>
            <strong>
              Five-run median: performance 95, FCP 914ms, LCP 1.9s, TTI
              3.1s, TBT 197ms, CLS 0.
            </strong>
          </p>

          <h3>What the median hid</h3>
          <p>
            The median score is 95. It was also 95 before this round. By
            that measure, converting the images did nothing.
          </p>
          <p>
            The distribution says otherwise.{" "}
            <strong>The range moved from 86–98 to 90–98</strong> — the
            floor rose four points. LCP median went 2.4s to 1.9s and the
            spread narrowed from 2.0s to 1.5s.
          </p>
          <p>
            That&rsquo;s what fixing tail latency looks like. The good runs
            were already good, so the median barely moves; the bad runs
            stop being bad. If I&rsquo;d reported only the median
            I&rsquo;d have concluded the fix was worthless, and if
            I&rsquo;d reported only my best run I&rsquo;d have claimed 98
            and been wrong twice over.
          </p>

          <h3>The full arc</h3>
          <div className="table-wrap">
            <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Round</th>
                  <th>Change</th>
                  <th>Runs</th>
                  <th>Perf</th>
                  <th>LCP</th>
                  <th>TTI</th>
                  <th>TBT</th>
                  <th>JS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Baseline</td>
                  <td>—</td>
                  <td>—</td>
                  <td>82</td>
                  <td>2.4s</td>
                  <td>5.3s</td>
                  <td>608ms</td>
                  <td>387 KiB</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Eager LCP image, trimmed nav payload</td>
                  <td>1</td>
                  <td>98</td>
                  <td>1.3s</td>
                  <td>5.2s</td>
                  <td>156ms</td>
                  <td>387 KiB</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Removed GA4</td>
                  <td>1</td>
                  <td>96</td>
                  <td>2.6s</td>
                  <td>3.1s</td>
                  <td>137ms</td>
                  <td>215 KiB</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>CDN domain, priority on first row</td>
                  <td>5</td>
                  <td>95</td>
                  <td>2.4s</td>
                  <td>3.2s</td>
                  <td>192ms</td>
                  <td>215 KiB</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>PNG → WebP, 95% smaller</td>
                  <td>5</td>
                  <td>
                    <strong>95</strong>
                  </td>
                  <td>
                    <strong>1.9s</strong>
                  </td>
                  <td>
                    <strong>3.1s</strong>
                  </td>
                  <td>
                    <strong>197ms</strong>
                  </td>
                  <td>
                    <strong>216 KiB</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
            <div className="table-fade" aria-hidden="true" />
          </div>

          <p>
            <strong>Final, /us/store, mobile:</strong> performance 95
            (median of five, range 90–98), accessibility 100, best
            practices 96, SEO 92. FCP 914ms, LCP 1.9s, TTI 3.1s, TBT 197ms,
            CLS 0.
          </p>
          <CiteLinks />

          <h2>7. What I&rsquo;d do differently</h2>
          <p>
            Never substitute a derived value for an authoritative one. The
            API returned the count; the code computed its own from the
            response length. They agreed, so the substitution was
            invisible. Anything an upstream system tells you authoritatively
            should be used rather than recomputed, especially when your
            test data is too small for the two to disagree.
          </p>
          <p>
            Set option and variant ranks in the seed script rather than
            finding the ordering problem through the UI. Anything rendered
            in a specific order needs that order in the data.
          </p>
          <p>
            Validate assets on upload. A check that a file&rsquo;s actual
            format matches its extension, and that source images are under
            a size budget, would have caught section 4.9 before it ever
            reached production. Cheap to add, and it&rsquo;s the class of
            bug an agent will reintroduce every time.
          </p>
          <p>
            Measure five runs from the beginning. I wrote a single-run
            number into a draft and had to retract it. The tool tells you
            it&rsquo;s an estimate; believe it.
          </p>

          <h2>8. Why this is the write-up worth reading</h2>
          <p>
            The interesting skill in agent-assisted development isn&rsquo;t
            prompting. It&rsquo;s knowing what to distrust. The agent
            produces something that runs, looks right, and carries defects
            that only appear in production, on mobile, in a second region,
            on a cold cache, or after a reseed. Every category above is
            predictable, which is what makes the list worth having.
          </p>
          <p>
            It will also hand you a 95 on the easy route while the page
            your customers use sits at 82, and hand you a 1.3s LCP that
            turns out to be the best of five samples. Neither of those is
            the agent lying. They&rsquo;re the agent answering exactly what
            was asked and nothing more, which is the whole job description
            of the person reviewing it.
          </p>
          <p>
            If your team is building commerce this way — and most are,
            whether or not it&rsquo;s in the process doc — the review layer
            is where the risk lives.
          </p>

          <p className="closing-tagline">
            I build Next.js storefronts on Medusa. Multi-region,
            variant-heavy catalogs, checkout, performance.
          </p>
          <p className="mono">
            <a className="link" href="mailto:mike@mikesanborn.dev">
              mike@mikesanborn.dev
            </a>
          </p>
        </article>
      </main>
    </>
  );
}
