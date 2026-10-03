import Image from "next/image";
import Link from "next/link";

const ARTICLE_PATH =
  "/writing/what-an-ai-agent-gets-wrong-building-a-medusa-storefront";

const JOBSITEHQ_URL =
  "https://jobsitehq.app/?utm_source=mikesanborn.dev&utm_medium=referral";

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
          <div className="container container--wide hero-grid">
            <div>
              <p className="eyebrow mono">Mike Sanborn · Wisconsin</p>
              <h1>I build software that holds up on a bad day.</h1>
              <p className="lede">
                I&apos;m a software developer. Right now I&apos;m building
                JobsiteHQ, a punch list and invoicing app for contractors. If
                you use it, I&apos;m the person who wrote it and the person who
                answers your email.
              </p>
              <p>
                <a className="button" href="mailto:mike@mikesanborn.dev">
                  Email me
                </a>
              </p>
              <p className="mono muted">I reply within 24 hours.</p>
            </div>
            <figure className="hero-photo">
              <Image
                src="/mike-fishing.webp"
                alt="Mike kneeling in a backyard with his young son, holding up a stringer of trout"
                width={720}
                height={960}
                sizes="(min-width: 760px) 300px, 100vw"
                priority
              />
              <figcaption>Off the clock in Wisconsin.</figcaption>
            </figure>
          </div>
        </section>

        {/* HOW I WORK */}
        <section className="section">
          <div className="container container--wide">
            <p className="eyebrow mono">How I work</p>
            <h2>What you can count on</h2>
            <ul className="fact-list">
              <li>
                <strong>I build for the worst conditions, not the demo.</strong>{" "}
                JobsiteHQ works in basements with no signal and saves a
                recording every second, because a dropped connection or a dead
                battery on site shouldn&apos;t cost anyone their work.
              </li>
              <li>
                <strong>I measure instead of guessing.</strong> When I report a
                number, it&apos;s the median of repeated runs, not the best one.
                My last store went from 82 to 95 on Google&apos;s mobile speed
                test, measured across five runs.
              </li>
              <li>
                <strong>I check the work, including the AI&apos;s.</strong> I
                use AI tools to build faster, and I review everything they
                produce. I{" "}
                <Link className="link" href={ARTICLE_PATH}>
                  wrote about what they get wrong
                </Link>{" "}
                and how I catch it.
              </li>
              <li>
                <strong>Your money and records are handled properly.</strong>{" "}
                Payments run on Stripe and go straight to your bank, never
                through me. Data is backed up every night.
              </li>
              <li>
                <strong>You can reach me.</strong> No call center and no ticket
                queue. Email me and you get the person who can fix it.
              </li>
            </ul>
          </div>
        </section>

        {/* WORK */}
        <section className="section">
          <div className="container container--wide">
            <p className="eyebrow mono">What I&apos;ve built</p>

            <h2>JobsiteHQ</h2>
            <p>
              A punch list and invoicing app for handymen and small-crew
              contractors. Walk the job, talk through what needs doing, and it
              writes the punch list, the estimate, and the invoice. Runs on a
              phone, works offline, and the client pays by card from the link.
            </p>
            <p className="mono" style={{ fontSize: "0.875rem" }}>
              <a className="link" href={JOBSITEHQ_URL}>
                jobsitehq.app →
              </a>
            </p>

            <h2 style={{ marginTop: "2.5rem" }}>Amber Hour Coffee Co.</h2>
            <p>
              A production online store for a specialty coffee roaster, selling
              into the US and the EU in two currencies across six country
              storefronts. 95 on Google&apos;s mobile speed test (median of five
              runs) and 100 for accessibility.
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

        {/* WRITING */}
        <section className="section">
          <div className="container container--wide">
            <p className="eyebrow mono">Writing</p>
            <h2>What an AI agent gets wrong building a Medusa storefront</h2>
            <p>
              I built a production store with an AI agent writing the code and
              me directing and reviewing it. It made the same nine kinds of
              mistake every time, and handed me a 95 speed score on an easy page
              while the page customers actually use sat at 82. This is what I
              found and how I check for it now.
            </p>
            <Link className="link" href={ARTICLE_PATH}>
              Read it →
            </Link>
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
            {" · "}
            <a className="link" href="https://github.com/msanbo">
              GitHub
            </a>
          </p>
          <p>Based in Wisconsin.</p>
        </div>
      </footer>
    </>
  );
}
