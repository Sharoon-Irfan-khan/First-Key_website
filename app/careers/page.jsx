import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { Eyebrow, SectionHead } from "@/components/ui";
import CareersForm from "@/components/CareersForm";
import { Chart, Handshake, Compass, Shield } from "@/components/icons";

export const metadata = {
  title: "Careers — Join First Key International Real Estate",
  description:
    "Build your real estate career with First Key International in Dubai. We're always looking for driven brokers and consultants. Send us your application and let's talk.",
};

const benefits = [
  {
    icon: <Chart />,
    title: "Real earning potential",
    text: "Competitive commission on an established pipeline of buyers, sellers, and off-plan launches.",
  },
  {
    icon: <Handshake />,
    title: "Strong developer access",
    text: "Work across 50+ leading developers and a brand clients already trust.",
  },
  {
    icon: <Compass />,
    title: "Support to grow",
    text: "Mentorship, marketing, and admin support so you can focus on closing deals.",
  },
  {
    icon: <Shield />,
    title: "Licensed and compliant",
    text: "A professional, fully compliant brokerage that does things the right way.",
  },
];

export default function Careers() {
  return (
    <>
      <Hero
        page
        actions={false}
        image="/images/sky-towers.jpg"
        eyebrow="Careers"
        title="Build your real estate career with First Key"
        sub="We're a Dubai brokerage built on clarity, honesty, and results — and we're always looking for driven people to grow with us. If that sounds like you, we'd like to hear from you."
      />

      {/* Why work with us */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="Why work with us"
              title="A place to do your best work"
              center
            />
          </Reveal>
          <div className="cards" style={{ marginTop: "56px" }}>
            {benefits.map((b, i) => (
              <Reveal key={b.title} className="card" delay={i * 80}>
                <div className="service__ico">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="section bg-mist">
        <div className="container contact-grid">
          <Reveal className="contact-info">
            <Eyebrow>Apply now</Eyebrow>
            <div className="prose">
              <p>
                We don't always advertise specific roles, but we're happy to
                hear from talented brokers, consultants, and support staff.
                Tell us a little about yourself and we'll be in touch if there's
                a strong fit.
              </p>
              <p style={{ marginTop: "18px" }}>
                To attach your CV, email it directly to{" "}
                <a href="mailto:info@firstkeyint.com" style={{ color: "var(--blue)" }}>
                  info@firstkeyint.com
                </a>
                .
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <CareersForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
