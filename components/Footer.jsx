import Link from "next/link";
import Image from "next/image";
import { IconLinkedin, IconInstagram, WhatsApp } from "./icons";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link href="/" className="brand" aria-label="First Key International — home">
              <Image
                src="/images/emblem-white.png"
                alt=""
                width={46}
                height={46}
                className="brand__emblem"
              />
              <span className="brand__word">
                <b>First Key International</b>
                <small>Real Estate</small>
              </span>
            </Link>
            <p>
              Real estate brokers in Dubai who deliver. We help you buy, sell,
              and lease across Dubai and the wider UAE — with clarity at every
              step.
            </p>
          </div>

          <div className="footer__col">
            <h4>Explore</h4>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/developers">Developers</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="footer__col">
            <h4>Services</h4>
            <Link href="/contact">Buying</Link>
            <Link href="/contact">Selling</Link>
            <Link href="/contact">Leasing</Link>
            <Link href="/contact">Commercial</Link>
            <Link href="/developers">Off-Plan</Link>
          </div>

          <div className="footer__col">
            <h4>Get in touch</h4>
            <a href="tel:+971545011151">+971 54 501 1151</a>
            <a href="mailto:info@firstkeyint.com">info@firstkeyint.com</a>
            <p>Dubai, United Arab Emirates</p>
            <p>Mon–Fri · 9:00 AM – 6:00 PM</p>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} First Key International Real Estate. All rights reserved.</span>
          <div className="socials">
            <a href="https://wa.me/971545011151" aria-label="WhatsApp" target="_blank" rel="noreferrer">
              <WhatsApp />
            </a>
            <a
              href="https://www.linkedin.com/company/firstkeyinternationalrealestate/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <IconLinkedin />
            </a>
            <a
              href="https://www.instagram.com/firstkeyint"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <IconInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
