import Link from "next/link";

const ARTICLE_PATH =
  "/writing/what-an-ai-agent-gets-wrong-building-a-medusa-storefront";

const TRIAL_URL =
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
              <a className="link" href={TRIAL_URL}>
                JobsiteHQ
              </a>
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
            <p className="eyebrow mono">Mike Sanborn · Builder of JobsiteHQ</p>
            <h1>I build JobsiteHQ.</h1>
            <p className="lede">
              A punch list and invoicing app for handymen and small-crew
              contractors. I design it, write every line of it, and answer
              the support email myself.
            </p>
            <p>
              <a className="button" href={TRIAL_URL}>
                Try JobsiteHQ free
              </a>
            </p>
            <p className="mono muted">14 days free. No card.</p>
          </div>
        </section>

        {/* WHAT IT DOES */}
        <section className="section">
          <div className="container container--wide">
            <p className="eyebrow mono">What it does</p>
            <h2>Talk through the job. Get the punch list.</h2>
            <p>
              Walk the site and say what needs doing. JobsiteHQ writes the
              punch list, the estimate, and the invoice while you&apos;re
              still standing there, and your client pays it by card
              straight from the link.
            </p>
            <ul className="fact-list">
              <li>
                Runs on your phone. No app store, no laptop, no paperwork
                night
              </li>
              <li>
                Estimates turn into invoices when the client approves, with
                your markup on materials
              </li>
              <li>
                Card payments go straight to your bank through Stripe at
                their standard rate. Nothing added on top
              </li>
              <li>
                $24.99 a month or $199 a year. Unlimited jobs, no per-job
                fees, no setup call
              </li>
            </ul>
          </div>
        </section>

        {/* HOW IT'S BUILT */}
        <section className="section">
          <div className="container container--wide">
            <p className="eyebrow mono">How it&apos;s built</p>
            <h2>Built for basements, ladders, and dead zones</h2>
            <p>
              Most job apps are built for the office and squeezed onto a
              phone. I built JobsiteHQ the other way around, for the places
              you actually work.
            </p>
            <ul className="fact-list">
              <li>
                <strong>No signal, no problem.</strong> Jobs, photos,
                receipts, and recordings save on the phone first and sync
                the moment you have bars again
              </li>
              <li>
                <strong>Your walkthrough can&apos;t get lost.</strong> The
                recording is saved every second, so a locked screen or a
                crash doesn&apos;t cost you the job
              </li>
              <li>
                <strong>You stay in charge.</strong> The punch list is
                written from what you said, and nothing is saved until
                you&apos;ve checked it over
              </li>
              <li>
                <strong>Your money never passes through me.</strong>{" "}
                Payments run on Stripe and land in your own bank account
              </li>
              <li>
                <strong>Your records are backed up every night.</strong>
              </li>
            </ul>
          </div>
        </section>

        {/* WHO BUILDS IT */}
        <section className="section">
          <div className="container container--wide">
            <p className="eyebrow mono">Who builds it</p>
            <h2>A developer, not a call center</h2>
            <p>
              I&apos;m a software developer in Wisconsin. Before JobsiteHQ I
              built production web stores like{" "}
              <a className="link" href="https://www.amberhour.coffee">
                Amber Hour Coffee Co.
              </a>
              , which sells into the US and the EU from one codebase and
              scores in the 90s on Google&apos;s mobile speed test.
            </p>
            <p>
              I hold my work to a measured standard, and I write about it:{" "}
              <Link className="link" href={ARTICLE_PATH}>
                What an AI agent gets wrong building a Medusa storefront
              </Link>{" "}
              is about checking every claim instead of trusting the first
              good number.
            </p>
            <p>
              If something in JobsiteHQ doesn&apos;t work the way you need,
              email me. You&apos;ll reach the person who can fix it.
            </p>
            <p>
              <a className="button" href={TRIAL_URL}>
                Try JobsiteHQ free
              </a>
            </p>
            <p className="mono muted">14 days free. No card.</p>
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
            <a className="link" href={TRIAL_URL}>
              jobsitehq.app
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
        </div>
      </footer>
    </>
  );
}
