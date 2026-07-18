import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { SectionHead, CTA } from "@/components/ui";
import { DeveloperCard } from "@/components/cards";
import { developers } from "@/lib/developers";

export const metadata = {
  title: "Property Developers in Dubai: Latest Projects",
  description:
    "Access Dubai's leading property developers through one local broker — Emaar, DAMAC, Sobha, Nakheel, Meraas and more. Ready homes and off-plan opportunities.",
};

export default function Developers() {
  return (
    <>
      <Hero
        page
        actions={false}
        image="/images/sky-a.jpg"
        eyebrow="Developers"
        title="Dubai's leading property developers, one local broker"
        sub="Dubai's skyline is shaped by developers known for quality and delivery. We connect you with property from these names — ready homes and off-plan, in one place."
      />

      {/* Intro */}
      <section className="section-tight">
        <div className="container">
          <div className="split">
            <Reveal>
              <SectionHead
                eyebrow="Access across leading developers"
                title="Compare communities, plans, and handover dates"
              />
            </Reveal>
            <Reveal delay={120}>
              <p className="lead">
                We work across Dubai's major developers, so you compare
                communities, payment plans, and handover dates with clear
                guidance. Your options stay open and your choice stays informed.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Developer cards — the stacked banner pattern */}
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="dev-list">
            {developers.map((d, i) => (
              <Reveal key={d.name}>
                <DeveloperCard d={d} index={i} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p
              className="lead"
              style={{ marginTop: "48px", textAlign: "center" }}
            >
              New launches arrive often. Ask us what fits your goals.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Off-plan + why broker */}
      <section className="section bg-mist">
        <div className="container split">
          <Reveal>
            <SectionHead
              eyebrow="Off-plan opportunities"
              title="Attractive prices, flexible payment plans"
            />
            <p className="lead" style={{ marginTop: "20px" }}>
              Off-plan property offers attractive prices and flexible payment
              plans for buyers who plan ahead. Our brokers explain each
              project's timeline, payment structure, and investment outlook — so
              you buy with full understanding.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <SectionHead
              eyebrow="Why buy through a broker"
              title="Honest comparisons, loyal to you"
            />
            <p className="lead" style={{ marginTop: "20px" }}>
              Working with an independent broker gives you honest comparisons
              across every developer, clear terms, and guidance built around
              your goals. Your broker stays loyal to you, so your interests lead
              every conversation.
            </p>
          </Reveal>
        </div>
      </section>

      <CTA
        eyebrow="See your options side by side"
        title="Curious which developer fits your goals?"
        text="Talk to a First Key broker and see your options side by side."
        image="/images/sky-downtown.jpg"
      />
    </>
  );
}
