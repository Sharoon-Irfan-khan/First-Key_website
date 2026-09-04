import Image from "next/image";
import Link from "next/link";
import { Arrow, Bed, Bath, Area } from "./icons";

// .projects-grid runs 2-up above 700px and stacks to 1-up below it (see
// globals.css); .dev-list is always a single full-width column.
const GRID_CARD_SIZES = "(max-width: 700px) 100vw, 50vw";
const FULL_WIDTH_SIZES = "100vw";

export function PropertyCard({ p }) {
  return (
    <article className="pcard">
      <div className="pcard__media">
        <Image src={p.image} alt={p.title} fill sizes={GRID_CARD_SIZES} loading="lazy" />
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
        <Image src={d.image} alt="" fill sizes={FULL_WIDTH_SIZES} loading="lazy" />
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
        <Image src={p.image} alt={p.name} fill sizes={GRID_CARD_SIZES} loading="lazy" />
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
