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

/**
 * Categories come from Sanity, so the menu is built at render time rather than
 * from a constant. The parent "Blogs" link still reaches the full list, which
 * is why there is no "All articles" row.
 */
function withCategories(categories) {
  if (!categories?.length) return NAV;
  const children = categories.map((c) => ({
    href: `/category/${c.slug}`,
    label: c.title,
  }));
  return NAV.map((item) =>
    item.href === "/blogs" ? { ...item, children } : item
  );
}

export default function Header({ categories = [] }) {
  const nav = withCategories(categories);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  // href of the mobile group whose children are showing, or null for none.
  const [openSub, setOpenSub] = useState(null);
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
    // Reopening the sheet should show the short list again, not whatever
    // section happened to be expanded last time.
    if (!open) setOpenSub(null);
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Tapping the link for the page you are already on leaves the pathname
  // unchanged, so the sheet has to be closed by hand as well.
  const closeMenu = () => setOpen(false);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /**
   * The dropdown opens on `:hover` or `:focus-within`. A mouse click leaves
   * focus sitting on the link it hit, so `:focus-within` kept the panel open
   * even after the pointer had left — dropping focus closes it.
   *
   * `detail` counts pointer clicks, so it is 0 when the link was activated by
   * Enter. Keyboard users keep their focus ring and their open menu.
   */
  const dropFocusAfterPointerClick = (e) => {
    if (e.detail > 0) e.currentTarget.blur();
  };

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
            {nav.map((item) =>
              item.children ? (
                // Opened by hover or keyboard focus in CSS, so the parent stays
                // a real link to /blogs instead of a button that goes nowhere.
                <div key={item.href} className="nav__group">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={dropFocusAfterPointerClick}
                  >
                    {item.label}
                  </Link>
                  <div className="nav__menu">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={dropFocusAfterPointerClick}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              )
            )}
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
        <div className="mobile-menu__bar">
          <Link href="/" className="mobile-menu__brand" onClick={closeMenu}>
            <Image
              src="/images/emblem-white.png"
              alt=""
              width={34}
              height={34}
            />
            <b>First Key International</b>
          </Link>
          <button
            className="mobile-menu__close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            Close ✕
          </button>
        </div>

        <nav className="mobile-menu__nav" aria-label="Mobile">
          {nav.map((item, i) => (
            <div className="mobile-menu__item" key={item.href}>
              <div className="mobile-menu__row">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={closeMenu}
                >
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
                {item.children && (
                  // A separate control, so the row's own link still goes to the
                  // section instead of being swallowed by the expander.
                  <button
                    className="mobile-menu__toggle"
                    aria-expanded={openSub === item.href}
                    aria-label={`Show ${item.label} categories`}
                    onClick={() =>
                      setOpenSub((cur) => (cur === item.href ? null : item.href))
                    }
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
                      <path
                        d="M6 9l6 6 6-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {item.children && openSub === item.href && (
                <div className="mobile-menu__sub">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href} onClick={closeMenu}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <Link
          href="/contact"
          className="btn btn--primary"
          onClick={closeMenu}
        >
          Book a Consultation
        </Link>
      </div>
    </>
  );
}
