import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "./ui";
import { Arrow } from "./icons";
import CountUp from "./CountUp";

export default function Hero({
  image,
  imageAlt = "Dubai skyline",
  logo,
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
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="100vw"
          quality={75}
          priority
          fetchPriority="high"
        />
      </div>
      <div className="hero__wash" />
      <div className="container hero__inner">
        {logo}
        {eyebrow && (
          <Eyebrow light>{eyebrow}</Eyebrow>
        )}
        <h1 className="display hero__title">{title}</h1>
        {sub && <p className="hero__sub">{sub}</p>}
        {/* `actions` may be a custom set of buttons; `true` keeps the default pair. */}
        {actions && actions !== true && (
          <div className="hero__actions">{actions}</div>
        )}
        {actions === true && (
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
                <b>
                  <CountUp value={s.value} />
                </b>
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
