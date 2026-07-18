import Link from "next/link";
import { Eyebrow } from "./ui";
import { Arrow } from "./icons";

export default function Hero({
  image,
  eyebrow,
  title,
  sub,
  actions = true,
  stats,
  page = false,
}) {
  return (
    <section className={`hero ${page ? "hero--page" : ""}`}>
      <div className="hero__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="Dubai skyline" fetchPriority="high" />
      </div>
      <div className="hero__wash" />
      <div className="container hero__inner">
        {eyebrow && (
          <Eyebrow light>{eyebrow}</Eyebrow>
        )}
        <h1 className="display hero__title">{title}</h1>
        {sub && <p className="hero__sub">{sub}</p>}
        {actions && (
          <div className="hero__actions">
            <Link href="/developers" className="btn btn--light">
              Explore Developers <Arrow />
            </Link>
            <Link href="/contact" className="btn btn--outline-light">
              Book a Consultation
            </Link>
          </div>
        )}
        {stats && (
          <div className="hero__stats">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {!page && (
        <div className="scroll-cue" aria-hidden="true">
          Scroll
        </div>
      )}
    </section>
  );
}
