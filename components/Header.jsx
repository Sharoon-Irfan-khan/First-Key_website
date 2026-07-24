"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/developers", label: "Developers" },
  { href: "/list-property", label: "List Property" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Pages with a full-bleed dark hero start transparent; others stay solid.
    const hasHero = !!document.querySelector(".hero");
    const onScroll = () => setSolid(!hasHero || window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className={`header ${solid ? "header--solid" : "header--top"}`}>
        <div className="container header__inner">
          <Link href="/" className="brand" aria-label="First Key International — home">
            <Image
              src={solid ? "/images/emblem-blue.png" : "/images/emblem-white.png"}
              alt=""
              width={42}
              height={42}
              className="brand__emblem"
              priority
            />
            <span className="brand__word">
              <b>First Key International</b>
              <small>Real Estate</small>
            </span>
          </Link>

          <nav className="nav" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header__cta">
            <Link href="/contact" className="btn btn--header">
              Book a Consultation
            </Link>
          </div>

          <button
            className="nav-toggle"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${open ? "is-open" : ""}`}>
        <Link
          href="/"
          className="mobile-menu__brand"
          onClick={() => setOpen(false)}
        >
          <Image src="/images/emblem-white.png" alt="" width={34} height={34} />
          <b>First Key International</b>
        </Link>
        <button
          className="mobile-menu__close"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          Close ✕
        </button>
        <nav aria-label="Mobile">
          {NAV.map((item, i) => (
            <Link key={item.href} href={item.href}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="btn btn--primary">
          Book a Consultation
        </Link>
      </div>
    </>
  );
}
