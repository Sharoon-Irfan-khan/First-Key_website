import Link from "next/link";
import { Arrow, Bed, Bath, Area } from "./icons";

export function PropertyCard({ p }) {
  return (
    <article className="pcard">
      <div className="pcard__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.title} loading="lazy" />
        <span className="pcard__tag">{p.tag}</span>
      </div>
      <div className="pcard__body">
        <span className="pcard__loc">{p.community}</span>
        <h3>{p.title}</h3>
        <div className="pcard__price">{p.price}</div>
        <div className="pcard__meta">
          {p.beds > 0 && (
            <span>
              <Bed /> {p.beds} Bed
            </span>
          )}
          <span>
            <Bath /> {p.baths} Bath
          </span>
          <span>
            <Area /> {p.area}
          </span>
        </div>
      </div>
    </article>
  );
}

export function DeveloperCard({ d, index }) {
  const count = d.projectCount ?? (d.projects ? d.projects.length : 0);
  return (
    <Link href={`/developers/${d.slug}`} className="devcard">
      <div className="devcard__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={d.image} alt="" loading="lazy" />
      </div>
      <div className="devcard__wash" />
      <div className="devcard__inner">
        <span className="devcard__num">
          {String(index + 1).padStart(2, "0")} — Developer
        </span>
        <h3>{d.name}</h3>
        <p className="devcard__tag">{d.tagline}</p>
        <div className="devcard__foot">
          {d.from && (
            <div className="devcard__stat">
              <b>{d.from}</b>
              <span>Starting from</span>
            </div>
          )}
          {d.from && <div className="devcard__sep" />}
          <div className="devcard__stat">
            <b>{count}</b>
            <span>Live projects</span>
          </div>
          <span className="link-arrow">
            View projects <Arrow />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ProjectCard({ p }) {
  return (
    <Link href={p.href || "/contact"} className="pjcard">
      <div className="pjcard__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.name} loading="lazy" />
      </div>
      <div className="pjcard__body">
        <h3>{p.name}</h3>
        {p.community && <p className="pjcard__loc">{p.community}</p>}
        <div className="pjcard__foot">
          <strong className="pjcard__price">{p.price}</strong>
          <span className="link-arrow">
            View details <Arrow />
          </span>
        </div>
      </div>
    </Link>
  );
}
