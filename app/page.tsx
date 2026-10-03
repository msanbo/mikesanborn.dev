import Image from "next/image";
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
            <h1>I build and run small software products.</h1>
            <p className="lede">
              Focused apps for people who work with their hands, not at a
              desk.
            </p>
            <a className="link mono" href="#products">
              See what I&apos;ve built ↓
            </a>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="section" id="products">
          <div className="container container--wide">
            <p className="eyebrow mono">Product · Live</p>
            <h2>JobsiteHQ</h2>
            <p>
              A punch list and invoicing app for handymen and small-crew
              contractors. Walk the job and talk through what needs doing.
              JobsiteHQ turns the recording into a punch list, an estimate,
              and an invoice the client pays through Stripe.
            </p>
            <ul className="fact-list">
              <li>
                Installs from the browser, no app store. Works with no
                signal on site and syncs when it&apos;s back
              </li>
              <li>
                Audio is saved every second, so a locked phone or a crash
                doesn&apos;t lose a walkthrough
              </li>
              <li>
                Speech to transcript (Deepgram Nova-3) to punch list
                (Claude), reviewed by the contractor before anything is
                saved
              </li>
              <li>
                Stripe Connect payment links, so money goes straight to the
                contractor. Itemized invoices, materials markup, and
                progress payments
              </li>
              <li>
                $24.99/mo or $199/yr, with a 14-day trial and no card
                required
              </li>
            </ul>
            <p className="mono muted" style={{ fontSize: "0.875rem" }}>
              Next.js · Supabase · Stripe Connect · IndexedDB · service
              worker
            </p>
            <p className="mono" style={{ fontSize: "0.875rem" }}>
              <a className="link" href="https://jobsitehq.app">
                jobsitehq.app →
              </a>
            </p>
          </div>
        </section>

        {/* WRITING */}
        <section className="section">
          <div className="container container--wide">
            <p className="eyebrow mono">Writing</p>
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

        {/* EARLIER WORK */}
        <section className="section">
          <div className="container container--wide">
            <p className="eyebrow mono">Earlier work</p>
            <h2>Amber Hour Coffee Co.</h2>
            <p>
              A production Medusa storefront for a specialty roaster
              selling into the US and the EU: two regions, six
              country-routed storefronts, and nine buyable variants per
              product, each with its own SKU and shipping weight.
            </p>

            <div className="work-evidence">
              <p>
                <strong>
                  Catalog page, mobile: 95 Lighthouse performance
                </strong>{" "}
                — median of five runs, range 90–98, up from 82. LCP 1.9s,
                CLS 0, accessibility 100.
              </p>
              <Image
                src="/amberhour-catalog.webp"
                alt="Amber Hour Coffee Co. store page, showing the header, hero banner, and All products grid"
                width={320}
                height={440}
              />
            </div>

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

        {/* HOW I BUILD */}
        <section className="section">
          <div className="container container--wide">
            <h2>How I build</h2>
            <p>
              Every product is built to run itself: automated onboarding,
              billing handled by Stripe&apos;s customer portal, and
              scheduled backups. If something needs me every day, I
              haven&apos;t finished building it.
            </p>
            <p>
              I design, build, launch, and market each one myself — from
              the database and the billing to the landing page.
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
              href="https://www.linkedin.com/in/michael-sanborn-759834b/"
            >
              LinkedIn
            </a>
          </p>
          <p className="mono">
            <a className="link" href="https://github.com/msanbo">
              GitHub
            </a>
          </p>
          <p>Building in public from Wisconsin.</p>
          <p className="muted">
            I still take a small number of Next.js storefront builds and
            audits.{" "}
            <a className="link" href="mailto:mike@mikesanborn.dev">
              Email me
            </a>
            .
          </p>
        </div>
      </footer>
    </>
  );
}
