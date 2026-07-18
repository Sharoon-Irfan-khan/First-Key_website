import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { SectionHead, CTA } from "@/components/ui";
import { ProjectCard } from "@/components/cards";
import { Arrow } from "@/components/icons";
import { developers, getDeveloper } from "@/lib/developers";

export function generateStaticParams() {
  return developers.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }) {
  const d = getDeveloper(params.slug);
  if (!d) return { title: "Developer" };
  return {
    title: `${d.name} — New Projects in Dubai`,
    description: `${d.name} projects available through First Key International. ${d.tagline}`,
  };
}

export default function DeveloperPage({ params }) {
  const d = getDeveloper(params.slug);
  if (!d) notFound();

  return (
    <>
      <Hero
        page
        actions={false}
        image={d.image}
        eyebrow="Developer · Dubai"
        title={d.name}
        sub={d.tagline}
      />

      <section className="section">
        <div className="container">
          <Reveal>
            <Link href="/developers" className="link-arrow" style={{ color: "var(--slate)" }}>
              <span style={{ transform: "scaleX(-1)", display: "inline-flex" }}>
                <Arrow />
              </span>
              Back to all developers
            </Link>
          </Reveal>

          <Reveal>
            <div
              style={{
                marginTop: "36px",
                display: "flex",
                flexWrap: "wrap",
                gap: "16px 24px",
                alignItems: "baseline",
                justifyContent: "space-between",
                borderBottom: "1px solid var(--line)",
                paddingBottom: "28px",
              }}
            >
              <SectionHead eyebrow="Current projects" title="Live launches" />
              <span
                style={{
                  fontSize: "0.8rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--blue)",
                  fontWeight: 600,
                }}
              >
                {d.projectCount} {d.projectCount === 1 ? "launch" : "launches"}
              </span>
            </div>
          </Reveal>

          <div className="projects-grid" style={{ marginTop: "44px" }}>
            {d.projects.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 80}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p
              style={{
                marginTop: "44px",
                fontSize: "0.86rem",
                color: "var(--slate-light)",
                maxWidth: "70ch",
              }}
            >
              Prices and availability are set by the developer and change often.
              Contact First Key International for the latest on any project.
            </p>
          </Reveal>
        </div>
      </section>

      <CTA
        eyebrow={`Enquire about ${d.name}`}
        title="Ready to see these projects in detail?"
        text="Speak with a First Key broker for floor plans, payment plans, and the latest availability — with honest comparisons across every developer."
        image="/images/sky-downtown.jpg"
      />
    </>
  );
}
