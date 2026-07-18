import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectEnquiry from "@/components/ProjectEnquiry";
import { Arrow, Check, Pin } from "@/components/icons";
import { getDeveloper, getProject, allProjectParams } from "@/lib/developers";

export function generateStaticParams() {
  return allProjectParams;
}

export function generateMetadata({ params }) {
  const p = getProject(params.slug, params.project);
  const d = getDeveloper(params.slug);
  if (!p) return { title: "Project" };
  return {
    title: `${p.name} — ${d?.name || "Dubai"} | ${p.price}`,
    description:
      p.description?.[0]?.slice(0, 155) ||
      `${p.name} by ${d?.name} in ${p.community}. ${p.price}.`,
  };
}

export default function ProjectPage({ params }) {
  const d = getDeveloper(params.slug);
  const p = getProject(params.slug, params.project);
  if (!d || !p) notFound();

  const specEntries = Object.entries(p.spec || {});

  return (
    <>
      {/* Page head */}
      <section className="page-head">
        <div className="container">
          <Link href={`/developers/${d.slug}`} className="link-arrow back-link">
            <span style={{ transform: "scaleX(-1)", display: "inline-flex" }}>
              <Arrow />
            </span>
            Back to {d.name}
          </Link>
          <Eyebrow>{d.name} · Dubai</Eyebrow>
          <h1 className="h2 page-head__title">{p.name}</h1>
          {p.community && <p className="page-head__loc">{p.community}</p>}
        </div>
      </section>

      {/* Gallery + spec */}
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="property-detail">
            <Reveal>
              <ProjectGallery images={p.gallery} name={p.name} />
            </Reveal>

            <Reveal delay={100}>
              <div className="detail-spec">
                <div className="prop-price">{p.price}</div>
                <dl className="spec-list">
                  {specEntries.map(([k, v]) => (
                    <div className="spec-row" key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <a href="#enquire" className="btn btn--primary detail-spec__cta">
                  Request floor plans <Arrow />
                </a>
              </div>
            </Reveal>
          </div>

          {p.description?.length > 0 && (
            <Reveal className="prose detail-desc">
              {p.description.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </Reveal>
          )}
        </div>
      </section>

      {/* Amenities */}
      {p.amenities?.length > 0 && (
        <section className="section-tight bg-mist">
          <div className="container">
            <Reveal>
              <Eyebrow>Amenities</Eyebrow>
              <h2 className="h3" style={{ marginTop: "16px", marginBottom: "40px" }}>
                Life inside {p.name}
              </h2>
            </Reveal>
            <Reveal>
              <ul className="amenity-grid">
                {p.amenities.map((a) => (
                  <li className="amenity-item" key={a}>
                    <span className="amenity-tick">
                      <Check size={14} />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {/* Location */}
      {p.location?.length > 0 && (
        <section className="section-tight">
          <div className="container">
            <Reveal>
              <Eyebrow>Location</Eyebrow>
              <h2 className="h3" style={{ marginTop: "16px" }}>
                {p.locationArea || p.community}
              </h2>
            </Reveal>
            <Reveal>
              <ul className="loc-grid" style={{ marginTop: "36px" }}>
                {p.location.map((l) => (
                  <li className="loc-item" key={l}>
                    <span className="loc-pin">
                      <Pin size={18} />
                    </span>
                    {l}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {/* Enquiry */}
      <div id="enquire" />
      <ProjectEnquiry project={p.name} developer={d.name} />

      {/* Disclaimer */}
      <div className="container">
        <p className="detail-disclaimer">
          Prices, sizes, payment plans, and handover dates are set by the
          developer and change often. Some details are indicative — contact
          First Key International Real Estate to confirm the latest on {p.name}.
        </p>
      </div>
    </>
  );
}
