import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { SectionHead, CTA } from "@/components/ui";
import { AwardsShowcase, MomentsGallery } from "@/components/Gallery";
import { awards, moments } from "@/lib/gallery";

export const metadata = {
  title: "Gallery — Awards, Recognition & Life at First Key",
  description:
    "Awards and recognition received by First Key International Real Estate, plus moments from guest visits, partner meetings and company milestones in Dubai.",
  alternates: { canonical: "/gallery" },
};

export default function Gallery() {
  return (
    <>
      <Hero
        page
        actions={false}
        image="/images/sky-downtown.jpg"
        eyebrow="Gallery"
        title="Recognition earned, relationships built"
        sub="The awards our work has received, and the people and moments behind it."
      />

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
        </div>
        <AwardsShowcase awards={awards} />
      </section>

      <section className="section bg-mist" id="life-at-first-key">
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
            <MomentsGallery photos={moments} />
          </div>
        </div>
      </section>

      <CTA image="/images/sky-bluewaters.jpg" />
    </>
  );
}
