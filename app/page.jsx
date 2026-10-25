import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { Eyebrow, SectionHead, CTA } from "@/components/ui";
import {
  Arrow,
  Compass,
  Scale,
  Chat,
  Shield,
  Briefcase,
  HomeKey,
  Ledger,
  TaxDoc,
  Strategy,
  YouTube,
} from "@/components/icons";
import { developers } from "@/lib/developers";
import { COMPANY, corporateServices } from "@/lib/corporateServices";
import { awards, moments } from "@/lib/gallery";
import { AwardsShowcase, MomentsGallery } from "@/components/Gallery";
import VideoGallery from "@/components/VideoGallery";
import { CHANNEL_URL, getChannelVideos } from "@/lib/youtube";

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
  {
    icon: <Briefcase />,
    title: "Corporate Services",
    text: "Mortgage consultancy, accounting, tax follow-up and business support through our sister company, First Key Corporate Services.",
    href: "/corporate-services",
  },
];

const csIcons = {
  mortgage: <HomeKey size={20} />,
  ledger: <Ledger size={20} />,
  tax: <TaxDoc size={20} />,
  briefcase: <Briefcase size={20} />,
  strategy: <Strategy size={20} />,
};

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

export default async function Home() {
  const { videos, shorts } = await getChannelVideos();

  return (
    <>
      <Hero
        image="/images/sky-jbr2.jpg"
        eyebrow="First Key International · Dubai"
        title="Real estate brokers in Dubai who deliver"
        sub="We help you buy, sell, and lease ready and off-plan property across Dubai and the wider UAE — simplifying every step, from your first viewing to the final handover. From our Business Bay office, a dedicated broker guides you through projects from 50+ leading developers, with honest advice and real figures at every stage."
        stats={[
          { value: "10+", label: "Years combined experience" },
          { value: "50+", label: "Leading developers" },
          { value: "1000+", label: "Happy customers" },
          { value: "24/7", label: "Broker availability" },
        ]}
      />

      {/* Intro / search made simple */}
      <section className="section">
        <div className="container split">
          <Reveal className="split__media">
            <Image
              src="/images/jbr-bluewaters.jpg"
              alt="Bluewaters Island and Ain Dubai seen across JBR beach"
              width={800}
              height={600}
              sizes="(max-width: 900px) 100vw, 50vw"
              loading="lazy"
            />
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
        <div className="container container-wide">
          <Reveal>
            <SectionHead
              eyebrow="Full-service across the UAE"
              title="From homes to commercial spaces"
              lead="We cover the full range of property needs, with the same clarity on every kind of deal."
            />
          </Reveal>
          <div className="services services--five" style={{ marginTop: "56px" }}>
            {services.map((s, i) => (
              <Reveal
                key={s.title}
                className={`service ${s.href ? "service--cs" : ""}`}
                delay={i * 90}
              >
                <div className="service__ico">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                {s.href && (
                  <Link href={s.href} className="link-arrow service__link">
                    Learn more <Arrow />
                  </Link>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* First Key Corporate Services */}
      <section className="section home-cs">
        <div className="container split split--media-right">
          <Reveal className="split__media">
            <Image
              src="/images/corporate/hero-glass-towers.jpg"
              alt="Looking up at glass office towers against a clear blue sky"
              width={800}
              height={600}
              sizes="(max-width: 900px) 100vw, 50vw"
              loading="lazy"
            />
            <div className="badge">
              <b>5</b>
              <span>Licensed business services</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Image
              src="/images/corporate/fkcs-logo-color.svg"
              alt="First Key Corporate Services"
              width={210}
              height={61}
              className="home-cs__logo"
              unoptimized
            />
            <SectionHead
              eyebrow="Our sister company"
              title="First Key Corporate Services"
              lead="Beyond property, First Key Corporate Services supports companies and individuals across the UAE with financial administration, mortgage advisory and management consultancy — with the same clear communication you get from our brokers."
            />
            <ul className="home-cs__list">
              {corporateServices.map((c) => (
                <li key={c.slug}>
                  <Link href={`/corporate-services#${c.slug}`}>
                    <span className="home-cs__ico">{csIcons[c.icon]}</span>
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="home-cs__note">
              {COMPANY.legalName} is a separately registered company · Trade
              licence no. {COMPANY.licenceNumber}
            </p>
            <div style={{ marginTop: "32px" }}>
              <Link href="/corporate-services" className="btn btn--primary">
                Explore Corporate Services <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Developers strip */}
      <section className="section-tight devband">
        <div className="devband__media">
          <Image
            src="/images/sky-marina-towers.jpg"
            alt=""
            fill
            sizes="100vw"
            loading="lazy"
          />
        </div>
        <div className="devband__wash" />
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

      {/* YouTube channel — hidden entirely if YouTube can't be reached */}
      {(videos.length > 0 || shorts.length > 0) && (
        <section className="section bg-mist video-section" id="videos">
          <div className="container awards-head">
            <Reveal>
              <SectionHead
                eyebrow="First Key on YouTube"
                title="Explore First Key in Motion"
                lead="Discover Dubai's finest properties, market insights, and exclusive real estate experiences through our latest videos."
              />
            </Reveal>
            <Reveal delay={120}>
              <a
                href={`${CHANNEL_URL}?sub_confirmation=1`}
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <YouTube /> Subscribe on YouTube
              </a>
            </Reveal>
          </div>
          <VideoGallery videos={videos} shorts={shorts} />
        </section>
      )}

      {/* Awards & recognition */}
      <section className="section bg-navy awards-section" id="awards">
        <div className="container awards-head">
          <Reveal>
            <SectionHead
              light
              eyebrow="Awards & recognition"
              title="Our Awards & Recognition"
              lead="Celebrating Excellence, Building Trust."
            />
          </Reveal>
          <Reveal delay={120}>
            <Link href="/gallery#awards" className="btn btn--outline-light">
              View All Awards <Arrow />
            </Link>
          </Reveal>
        </div>
        <AwardsShowcase awards={awards.filter((a) => a.home)} />
      </section>

      {/* Life at First Key */}
      <section className="section bg-mist">
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="Our gallery"
              title="Life at First Key"
              lead="Moments, Connections & Milestones."
              center
            />
          </Reveal>
          <div style={{ marginTop: "56px" }}>
            <MomentsGallery photos={moments.filter((m) => m.home)} />
          </div>
          <Reveal className="moments-more">
            <Link href="/gallery" className="btn btn--primary">
              View Full Gallery <Arrow />
            </Link>
          </Reveal>
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
