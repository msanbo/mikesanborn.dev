import Link from "next/link";

const ARTICLE_PATH =
  "/writing/what-an-ai-agent-gets-wrong-building-a-medusa-storefront";

export default function Home() {
  return (
    <>
      <header className="section" style={{ paddingBottom: 0 }}>
        <div className="container container--wide">
          <nav
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span className="mono">Mike Sanborn</span>
            <span style={{ display: "flex", gap: "1.5rem" }}>
              <Link className="link" href={ARTICLE_PATH}>
                Writing
              </Link>
              <a className="link" href="mailto:mike@mikesanborn.dev">
                Contact
              </a>
            </span>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="section">
          <div className="container container--wide">
            <p className="eyebrow mono">Mike Sanborn</p>
            <h1>I build Next.js storefronts on Medusa.</h1>
            <p className="lede">
              The frontend layer specifically: multi-region routing,
              variant-heavy catalogs, checkout, and performance.
            </p>
            <a className="link mono" href="mailto:mike@mikesanborn.dev">
              mike@mikesanborn.dev
            </a>
            <p className="mono muted">Currently booking from 9/25/26</p>
          </div>
        </section>

        {/* WRITING — deliberately first, ahead of the demo */}
        <section className="section">
          <div className="container container--wide">
            <h2>What an AI agent gets wrong building a Medusa storefront</h2>
            <p>
              I built a production storefront with an AI agent doing the
              implementation and me directing and reviewing it. The speed
              wasn&apos;t the interesting part. The interesting part was that
              the agent produced the same nine categories of defect every
              time — configuration that only works locally, silent omissions
              inside things that look complete, data-model shortcuts that
              block a feature three weeks later, image files whose
              extensions lied about their format.
            </p>
            <p>
              It also handed me a 95 Lighthouse score on the easy route
              while the page customers actually browse sat at 82, and a
              1.3s LCP that turned out to be the best of five samples.
            </p>
            <p>
              Most teams are building this way now, whether or not
              it&apos;s in the process doc. The review layer is where the
              risk sits, and almost nobody is writing about it concretely.
            </p>
            <Link className="link" href={ARTICLE_PATH}>
              Read it →
            </Link>
          </div>
        </section>

        {/* WORK */}
        <section className="section">
          <div className="container container--wide">
            <h2>Amber Hour Coffee Co.</h2>
            <p>
              A production storefront for a specialty roaster selling into
              the US and the EU. Built to a real spec rather than a
              sample-data one.
            </p>
            <ul className="fact-list">
              <li>
                Two regions and two currencies across six country-routed
                storefronts, with region-aware pricing throughout
              </li>
              <li>
                Nine buyable variants per product — three grinds by three
                bag sizes — each with its own SKU and shipping weight
              </li>
              <li>
                Volume pricing that ladders by bag size, a category
                taxonomy, and per-product origin, process, altitude, and
                roast data
              </li>
              <li>
                Images on Cloudflare R2 behind a bound custom domain, WebP,
                through responsive next/image
              </li>
              <li>
                App Router with server-first rendering, deliberate client
                boundaries, and Suspense on secondary queries
              </li>
            </ul>

            <p>
              <strong>
                Catalog page, mobile: 95 Lighthouse performance
              </strong>{" "}
              — median of five runs, range 90–98, up from 82. LCP 1.9s,
              CLS 0, accessibility 100.
            </p>

            <p className="mono" style={{ fontSize: "0.875rem" }}>
              <a className="link" href="https://www.amberhour.coffee">
                View the store →
              </a>{" "}
              ·{" "}
              <a
                className="link"
                href="https://github.com/msanbo/coffee-demo-store"
              >
                Read the code →
              </a>
            </p>
          </div>
        </section>

        {/* WORKING TOGETHER */}
        <section className="section">
          <div className="container container--wide">
            <h2>Working together</h2>

            <div className="pricing-card">
              <h3>Storefront Sprint — $6,500, four weeks</h3>
              <p>
                You have Medusa running and a storefront that still looks
                like the starter. I take it to branded and
                production-ready: design system, product and collection
                pages, cart and checkout, responsive and performance
                passes, deploy. Fixed scope, fixed delivery date, one
                round of revisions.
              </p>
            </div>

            <div className="pricing-card">
              <h3>Full Storefront Build — from $18,000</h3>
              <p>
                Ground-up storefront. Custom design implementation,
                multi-region and multi-currency, i18n, search and
                filtering, accounts and order history, custom checkout,
                CMS integration, analytics, handoff documentation. Ten to
                fourteen weeks depending on regions and integrations.
              </p>
            </div>

            <div className="pricing-card">
              <h3>Storefront Audit — $1,500, one week</h3>
              <p>
                A written teardown of an existing headless storefront:
                performance against measured Core Web Vitals across five
                runs, checkout friction, cart and session handling, SEO
                and metadata, mobile, accessibility. Ends with a
                prioritized fix list. Credited in full toward any build
                booked within 30 days.
              </p>
            </div>

            <h3>How I work</h3>
            <p>
              I build storefronts alongside a full-time role, which means
              fixed scope and a committed delivery date rather than daily
              availability. I reply to email within 24 hours and I
              don&apos;t miss dates. If you need someone in your
              standups, I&apos;m not your person — and I&apos;ll tell you
              that on the first call rather than the third week.
            </p>

            <p className="muted">
              <strong>Not a fit for:</strong> backend Medusa architecture,
              emergency rescues with a launch date inside two weeks, or a
              small Shopify store that would be worse off replatformed.
            </p>
          </div>
        </section>
      </main>

      <footer>
        <div className="container container--wide">
          <p className="mono">
            <a className="link" href="mailto:mike@mikesanborn.dev">
              mike@mikesanborn.dev
            </a>
          </p>
          <p className="mono">
            <a
              className="link"
              href="https://github.com/msanbo/coffee-demo-store"
            >
              GitHub
            </a>{" "}
            ·{" "}
            <a
              className="link"
              href="https://www.linkedin.com/in/michael-sanborn-759834b/"
            >
              LinkedIn
            </a>
          </p>
          <p>
            Based in Wisconsin, working with teams anywhere in US and
            European time zones.
          </p>
        </div>
      </footer>
    </>
  );
}
