import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { Eyebrow, SectionHead, CTA } from "@/components/ui";
import { Arrow, Compass, Scale, Chat, Shield } from "@/components/icons";
import { developers } from "@/lib/developers";

const services = [
  {
    icon: <Compass />,
    title: "Buying",
    text: "Homes and investment property in Dubai and across the UAE, matched to your goals and budget.",
  },
  {
    icon: <Scale />,
    title: "Selling",
    text: "Pricing built on real market data, marketed to serious buyers from first enquiry to signed contract.",
  },
  {
    icon: <Chat />,
    title: "Leasing",
    text: "Leasing that stays smooth for tenants and landlords alike, with clear terms on both sides.",
  },
  {
    icon: <Shield />,
    title: "Commercial",
    text: "Offices and retail units for businesses ready to grow in the UAE's key districts.",
  },
];

const reasons = [
  {
    title: "Local expertise",
    text: "Our brokers know Dubai's communities, pricing, and paperwork inside out.",
  },
  {
    title: "Clear numbers",
    text: "You receive honest advice and real figures at every stage of the journey.",
  },
  {
    title: "Direct communication",
    text: "We stay connected through efficient, built-in tools, so you always reach us fast.",
  },
  {
    title: "Results that last",
    text: "Over ten years of combined experience, focused on returns that hold their value.",
  },
];

export default function Home() {
  return (
    <>
      <Hero
        image="/images/sky-downtown.jpg"
        eyebrow="First Key International · Dubai"
        title="Real estate brokers in Dubai who deliver"
        sub="We help you buy, sell, and lease property across Dubai and the wider UAE — simplifying every step, from your first viewing to the final handover."
        stats={[
          { value: "10+", label: "Years combined experience" },
          { value: "17", label: "Leading developers" },
          { value: "24/7", label: "Broker availability" },
        ]}
      />

      {/* Intro / search made simple */}
      <section className="section">
        <div className="container split">
          <Reveal className="split__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dubai-c.jpg" alt="A luxury villa managed by First Key" />
            <div className="badge">
              <b>1:1</b>
              <span>A dedicated broker on every deal</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHead
              eyebrow="Your property search, made simple"
              title="A complex market, turned into a clear path"
              lead="Whether you are buying a first home or a serious investment, we listen to your goals, match you with the right property, and handle the paperwork from start to finish."
            />
            <ul className="key-list">
              <li>
                <span>Every client works with a dedicated broker who stays reachable throughout.</span>
              </li>
              <li>
                <span>Honest advice and real figures before every decision you make.</span>
              </li>
              <li>
                <span>One point of contact from first viewing to final handover.</span>
              </li>
            </ul>
            <div style={{ marginTop: "36px" }}>
              <Link href="/about" className="link-arrow">
                About First Key <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-mist">
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="Full-service across the UAE"
              title="From homes to commercial spaces"
              lead="We cover the full range of property needs, with the same clarity on every kind of deal."
            />
          </Reveal>
          <div className="services" style={{ marginTop: "56px" }}>
            {services.map((s, i) => (
              <Reveal key={s.title} className="service" delay={i * 90}>
                <div className="service__ico">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Developers strip */}
      <section className="section bg-navy">
        <div className="container">
          <Reveal>
            <SectionHead
              light
              eyebrow="Leading developers, one broker"
              title="Access across the names that shaped Dubai's skyline"
              lead="From established master communities to fresh off-plan launches, we connect you with property from these developers — with honest comparisons across every one."
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="logo-row" style={{ marginTop: "56px", justifyContent: "flex-start" }}>
              {developers.slice(0, 9).map((d) => (
                <span key={d.name}>{d.name}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ marginTop: "44px" }}>
              <Link href="/developers" className="btn btn--light">
                Explore all developers <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why choose */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="Why clients choose First Key"
              title="Brokers who put your goals first"
              center
            />
          </Reveal>
          <div className="cards" style={{ marginTop: "56px" }}>
            {reasons.map((r, i) => (
              <Reveal key={r.title} className="card" delay={i * 80}>
                <span className="card__index">
                  0{i + 1} / 04
                </span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Open the right door"
        title="Ready to move forward?"
        text="Speak with a First Key broker today and let us open the right door for you."
        image="/images/sky-bluewaters.jpg"
      />
    </>
  );
}
