import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import KeyMark from "@/components/KeyMark";
import { SectionHead, CTA } from "@/components/ui";
import CorporateEnquiryForm from "@/components/CorporateEnquiryForm";
import {
  Arrow,
  Check,
  Pin,
  WhatsApp,
  HomeKey,
  Ledger,
  TaxDoc,
  Briefcase,
  Strategy,
} from "@/components/icons";
import { COMPANY, corporateServices } from "@/lib/corporateServices";

const SITE = "https://firstkeyint.com";
const PATH = "/corporate-services";
const TITLE =
  "First Key Corporate Services | Business & Corporate Solutions Dubai";
const DESCRIPTION =
  "Explore mortgage consultancy, accounting and bookkeeping, taxation procedures follow-up, corporate services, and management consultancy with First Key Corporate Services in Dubai.";

export const metadata = {
  // Absolute so the real estate company's name isn't appended — this page
  // belongs to the separate corporate services business.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "Corporate Services Dubai",
    "Corporate Services UAE",
    "Mortgage Consultancy Dubai",
    "Accounting and Bookkeeping Dubai",
    "Taxation Procedures Follow-Up UAE",
    "Management Consultancy Dubai",
    "Corporate Services Provider Dubai",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    siteName: "First Key Corporate Services",
    type: "website",
    locale: "en_AE",
    images: [
      {
        url: "/images/sky-b.jpg",
        width: 1920,
        height: 1280,
        alt: "Dubai business district skyline at night",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/sky-b.jpg"],
  },
};

const ICONS = {
  mortgage: HomeKey,
  ledger: Ledger,
  tax: TaxDoc,
  briefcase: Briefcase,
  strategy: Strategy,
};

const steps = [
  {
    title: "Initial Consultation",
    text: "A conversation about your business, your situation, and what prompted you to reach out.",
  },
  {
    title: "Understanding Your Requirements",
    text: "We review the details, documents, and priorities involved so the scope is clear on both sides.",
  },
  {
    title: "Tailored Service Guidance",
    text: "You receive practical guidance and a defined plan for the service that fits your needs.",
  },
  {
    title: "Coordination & Ongoing Support",
    text: "We coordinate the agreed work, keep you updated, and stay available as your needs evolve.",
  },
];

const reasons = [
  {
    title: "Client-focused consultation",
    text: "Every engagement starts with listening to what your business actually needs.",
  },
  {
    title: "Multiple corporate services under one business",
    text: "Mortgage, accounting, tax follow-up, corporate and management support through one point of contact.",
  },
  {
    title: "Structured communication",
    text: "Clear next steps, organized documentation, and regular updates throughout.",
  },
  {
    title: "Professional administrative support",
    text: "Careful handling of records, paperwork, and follow-up so nothing is left hanging.",
  },
  {
    title: "Solutions tailored to your business",
    text: "Guidance shaped around individual business requirements rather than one-size-fits-all packages.",
  },
];

const WA_TEXT = encodeURIComponent(
  "Hello First Key Corporate Services, I'd like to discuss my business requirements.",
);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}${PATH}#organization`,
      name: COMPANY.name,
      legalName: COMPANY.legalName,
      url: `${SITE}${PATH}`,
      logo: `${SITE}/images/corporate/fkcs-logo-color.png`,
      image: `${SITE}/images/sky-b.jpg`,
      description: DESCRIPTION,
      identifier: {
        "@type": "PropertyValue",
        propertyID: "Trade Licence Number",
        value: COMPANY.licenceNumber,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Business Centre, Floor 3, Building A3, Business Park",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      areaServed: { "@type": "Country", name: "United Arab Emirates" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Corporate Services",
        itemListElement: corporateServices.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.text,
          },
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        {
          "@type": "ListItem",
          position: 2,
          name: "Corporate Services",
          item: `${SITE}${PATH}`,
        },
      ],
    },
  ],
};

export default function CorporateServices() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* 1 — Hero */}
      <Hero
        page
        image="/images/sky-b.jpg"
        imageAlt="Dubai business district skyline at night"
        logo={
          <Image
            src="/images/corporate/fkcs-logo-reversed.svg"
            alt="First Key Corporate Services"
            width={232}
            height={67}
            className="cs-hero__logo"
            unoptimized
            priority
          />
        }
        eyebrow="Corporate Services · Dubai"
        title="Your Trusted Partner in Business & Corporate Solutions"
        sub="From corporate support and financial administration to management consultancy and mortgage advisory, First Key Corporate Services delivers professional solutions designed to support businesses and individuals across the UAE."
        actions={
          <>
            <a href="#enquiry" className="btn btn--light">
              Speak to Our Experts <Arrow />
            </a>
            <a href="#services" className="btn btn--outline-light">
              Explore Our Services
            </a>
          </>
        }
      />

      {/* 2 — About */}
      <section className="section">
        <div className="container split split--media-right">
          <Reveal className="split__media">
            <Image
              src="/images/sky-a.jpg"
              alt="Emirates Towers and the Museum of the Future along Sheikh Zayed Road, Dubai's business corridor"
              width={800}
              height={600}
              sizes="(max-width: 900px) 100vw, 50vw"
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={120}>
            <SectionHead
              eyebrow="About First Key Corporate Services"
              title="Business Solutions Built Around Your Needs"
            />
            <div className="prose" style={{ marginTop: "24px" }}>
              <p>
                First Key Corporate Services is a UAE-based corporate services
                business supporting companies and individuals with mortgage
                consultancy, accounting and bookkeeping, taxation procedures
                follow-up, corporate services, and management consultancy.
              </p>
              <p>
                We focus on clear communication, organized administration, and
                practical guidance — so you understand each step and can make
                informed decisions for your business.
              </p>
            </div>

            <dl className="cs-entity">
              <Image
                src="/images/corporate/fkcs-logo-color.svg"
                alt="First Key Corporate Services logo"
                width={190}
                height={55}
                className="cs-entity__logo"
                unoptimized
              />
              <div>
                <dt>Registered name</dt>
                <dd>{COMPANY.legalName}</dd>
              </div>
              <div>
                <dt>Trade licence no.</dt>
                <dd>{COMPANY.licenceNumber}</dd>
              </div>
              <div>
                <dt>Legal form</dt>
                <dd>{COMPANY.legalForm}</dd>
              </div>
            </dl>
            <p className="cs-entity__note">
              A separately registered company from First Key International Real
              Estate. Looking for property instead?{" "}
              <Link href="/developers">Explore Dubai developers</Link> with our
              real estate team.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3 — Services */}
      <section className="section bg-mist cs-anchor" id="services">
        <div className="container">
          <Reveal>
            <SectionHead
              center
              eyebrow="Our services"
              title="Five licensed services, one point of contact"
              lead="Each service below is a licensed business activity of First Key Corporate Services DWC-LLC."
            />
          </Reveal>
          <div className="cs-services">
            {corporateServices.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                // The fade-in lives on a wrapper so its transition can't
                // clash with the card's own hover transition.
                <Reveal
                  key={s.slug}
                  id={s.slug}
                  className="cs-card-wrap"
                  delay={(i % 3) * 90}
                >
                  <article className="cs-card">
                    <div className="cs-card__top">
                      <span className="service__ico">
                        <Icon />
                      </span>
                      <span className="card__index">
                        0{i + 1} / 0{corporateServices.length}
                      </span>
                    </div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <ul className="key-list cs-card__list">
                      {s.highlights.map((h) => (
                        <li key={h}>
                          <KeyMark size={22} />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#enquiry"
                      data-service={s.title}
                      className="link-arrow cs-card__cta"
                    >
                      {s.cta} <Arrow />
                    </a>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 — How we work */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="How we work"
              title="A clear, four-step process"
              lead="Straightforward from the first conversation, so you always know where things stand."
            />
          </Reveal>
          <ol className="cs-steps">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} className="cs-step" delay={i * 100}>
                <span className="cs-step__n">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 — Why us */}
      <section className="section bg-navy">
        <div className="container cs-why">
          <Reveal>
            <SectionHead
              light
              eyebrow="Why First Key Corporate Services"
              title="Professional Support. Practical Solutions."
              lead="A dependable partner for the administrative, financial, and advisory side of running a business in the UAE."
            />
          </Reveal>
          <ul className="cs-why__list">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 80}>
                <span className="cs-why__ico">
                  <Check size={18} />
                </span>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 — Contact & consultation */}
      <section className="section cs-anchor" id="enquiry">
        <div className="container contact-grid">
          <Reveal className="contact-info">
            <SectionHead
              eyebrow="Contact & consultation"
              title="Let's Discuss Your Business Requirements"
              lead="Tell us which service you need and a little about your business. We'll come back to you with clear next steps."
            />
            <a
              href={`https://wa.me/971545011151?text=${WA_TEXT}`}
              className="btn btn--whatsapp cs-wa"
              target="_blank"
              rel="noreferrer"
            >
              <WhatsApp /> Enquire on WhatsApp
            </a>
            <div className="contact-item">
              <span className="contact-item__ico">
                <Pin />
              </span>
              <div>
                <h4>Registered office</h4>
                <p>{COMPANY.address}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <CorporateEnquiryForm />
          </Reveal>
        </div>
      </section>

      {/* 7 — Final CTA */}
      <CTA
        eyebrow="First Key Corporate Services"
        title="Let's Move Your Business Forward"
        text="Connect with First Key Corporate Services to explore professional solutions tailored to your business needs."
        image="/images/sky-downtown.jpg"
        actions={
          <a href="#enquiry" className="btn btn--light">
            Get in Touch <Arrow />
          </a>
        }
      />

      <section className="cs-disclosure">
        <div className="container">
          <p>
            Services on this page are provided by {COMPANY.legalName} (Trade
            Licence No. {COMPANY.licenceNumber}), a separately registered
            company and a distinct legal entity from First Key International
            Real Estate. Information on this page is general in nature and is
            not financial, tax, or legal advice. Mortgage consultancy is
            advisory only; financing decisions and approvals rest with the
            lender.
          </p>
        </div>
      </section>
    </>
  );
}
