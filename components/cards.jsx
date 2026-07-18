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
  return (
    <article className="devcard">
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
            <b>{d.projects}</b>
            <span>Live projects</span>
          </div>
          <Link href="/contact" className="link-arrow">
            View projects <Arrow />
          </Link>
        </div>
      </div>
    </article>
  );
}
