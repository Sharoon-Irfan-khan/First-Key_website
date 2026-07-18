import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { SectionHead, CTA } from "@/components/ui";

export const metadata = {
  title: "About — A Real Estate Broker Company in Dubai",
  description:
    "First Key International is a Dubai-based brokerage built on honesty, clear numbers, and deep local knowledge. Meet the team that puts your goals first.",
};

const values = [
  {
    title: "Honesty",
    text: "We give straight advice and follow through on what we say.",
  },
  {
    title: "Clear numbers",
    text: "Clients see real figures and market facts before every decision.",
  },
  {
    title: "Client focus",
    text: "Each case is shaped around the person in front of us.",
  },
  {
    title: "Local knowledge",
    text: "Deep familiarity with Dubai's communities keeps our guidance sharp and current.",
  },
];

export default function About() {
  return (
    <>
      <Hero
        page
        actions={false}
        image="/images/sky-burjalarab.jpg"
        eyebrow="About First Key International"
        title="Property decisions made easier, with honest experts beside you"
        sub="A Dubai-based brokerage built on a simple idea: the market rewards knowledge and clear thinking — so we lead with both."
      />

      {/* Story */}
      <section className="section">
        <div className="container split split--media-right">
          <Reveal className="split__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dubai-d.jpg" alt="A First Key residence at dusk" />
            <div className="badge">
              <b>10+</b>
              <span>Years of combined industry experience</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHead
              eyebrow="Our story"
              title="Built from a clear gap in the market"
            />
            <div className="prose" style={{ marginTop: "24px" }}>
              <p>
                Founded on over ten years of combined industry experience, First
                Key International grew from a clear gap in the market. Buyers and
                sellers wanted brokers who put clarity first.
              </p>
              <p>
                Today we serve clients across Dubai and the UAE, connecting them
                with homes and investments that fit their goals and their
                budget — guiding first-time buyers and seasoned investors alike.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <section className="section bg-navy">
        <div className="container">
          <Reveal>
            <SectionHead
              light
              center
              eyebrow="Our mission"
              title="To make buying, selling, and leasing simple and clear for every client"
              lead="We measure success by the clients who return to us and the referrals they send our way."
            />
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="Our core values"
              title="What guides every conversation"
            />
          </Reveal>
          <div className="cards" style={{ marginTop: "56px" }}>
            {values.map((v, i) => (
              <Reveal key={v.title} className="card" delay={i * 80}>
                <span className="card__index">0{i + 1} / 04</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Licensed */}
      <section className="section bg-mist">
        <div className="container split">
          <Reveal>
            <SectionHead
              eyebrow="Licensed, local, and ready to help"
              title="Compliant, professional service you can rely on"
            />
            <div className="prose" style={{ marginTop: "24px" }}>
              <p>
                As a licensed brokerage operating within UAE regulations, First
                Key International gives you service that stays fully compliant at
                every step.
              </p>
              <p>
                Our team stays current with market shifts, so the advice you
                receive today reflects the market today — not last year's
                headlines.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} className="split__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/sky-jbr.jpg" alt="Dubai Marina and JBR skyline" />
          </Reveal>
        </div>
      </section>

      <CTA
        eyebrow="Get started"
        title="Want brokers who put your goals first?"
        text="Meet the First Key team and get started with a clear plan."
        image="/images/sky-marina-towers.jpg"
      />
    </>
  );
}
