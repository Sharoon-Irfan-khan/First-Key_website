import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import PropertyForm from "@/components/PropertyForm";
import { Chart, Handshake, Shield } from "@/components/icons";

export const metadata = {
  title: "List Your Property — First Key International Real Estate",
  description:
    "Sell or rent your property in Dubai with First Key International. Share your property details and our brokers will handle valuation, marketing, and serious buyers — from first enquiry to signed contract.",
};

const points = [
  {
    icon: <Chart />,
    title: "Priced on real data",
    text: "We value your property on current market figures — not guesswork — so it's positioned to sell or lease fast.",
  },
  {
    icon: <Handshake />,
    title: "Serious buyers only",
    text: "Your listing is marketed to qualified, ready buyers and tenants across our network.",
  },
  {
    icon: <Shield />,
    title: "Handled end to end",
    text: "One dedicated broker manages viewings, negotiation, and paperwork from first enquiry to handover.",
  },
];

export default function ListProperty() {
  return (
    <>
      <Hero
        page
        actions={false}
        image="/images/sky-marina-towers.jpg"
        eyebrow="List Your Property"
        title="List your property with brokers who deliver"
        sub="Selling or renting out in Dubai? Share a few details about your property and a First Key broker will contact you with a clear valuation and a plan to get it in front of the right buyers."
      />

      <section className="section">
        <div className="container contact-grid">
          <Reveal className="contact-info">
            <Eyebrow>Why list with First Key</Eyebrow>
            {points.map((p) => (
              <div className="contact-item" key={p.title}>
                <span className="contact-item__ico">{p.icon}</span>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.text}</p>
                </div>
              </div>
            ))}
            <p className="prose" style={{ marginTop: "8px" }}>
              Prefer to talk first? Call{" "}
              <a href="tel:+971545011151" style={{ color: "var(--blue)" }}>
                +971 54 501 1151
              </a>{" "}
              or email{" "}
              <a href="mailto:info@firstkeyint.com" style={{ color: "var(--blue)" }}>
                info@firstkeyint.com
              </a>
              .
            </p>
          </Reveal>

          <Reveal delay={120}>
            <PropertyForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
