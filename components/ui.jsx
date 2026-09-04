import Image from "next/image";
import Link from "next/link";
import KeyMark from "./KeyMark";
import { Arrow } from "./icons";

export function Eyebrow({ children, light = false, center = false }) {
  return (
    <span
      className={`eyebrow ${light ? "eyebrow--light" : ""} ${
        center ? "eyebrow--center" : ""
      }`}
    >
      <KeyMark size={30} />
      {children}
    </span>
  );
}

export function SectionHead({ eyebrow, title, lead, light, center }) {
  return (
    <div className={`sect-head ${center ? "sect-head--center" : ""}`}>
      {eyebrow && (
        <Eyebrow light={light} center={center}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className="h2">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

export function CTA({
  eyebrow = "Open the right door",
  title = "Ready to move forward?",
  text = "Speak with a First Key broker today and let us open the right door for you.",
  image = "/images/sky-marina.jpg",
}) {
  return (
    <section className="cta section">
      <div className="cta__media">
        <Image src={image} alt="" fill sizes="100vw" loading="lazy" />
      </div>
      <div className="cta__wash" />
      <div className="container cta__inner">
        <Eyebrow light center>
          {eyebrow}
        </Eyebrow>
        <h2 className="h2">{title}</h2>
        <p className="lead">{text}</p>
        <div className="cta__actions">
          <Link href="/contact" className="btn btn--light">
            Contact Us <Arrow />
          </Link>
          <a href="tel:+971545011151" className="btn btn--outline-light">
            +971 54 501 1151
          </a>
        </div>
      </div>
    </section>
  );
}
