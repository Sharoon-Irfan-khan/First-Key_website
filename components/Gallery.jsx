"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import Lightbox from "./Lightbox";

const Chevron = ({ dir }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points={dir === "prev" ? "15 5 8 12 15 19" : "9 5 16 12 9 19"} />
  </svg>
);

const Expand = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

const awardMeta = (a) => [a.issuer, a.year].filter(Boolean).join(" · ");

// Awards: a horizontal "exhibition wall". Every piece keeps its own aspect
// ratio at a shared height, so certificate text is never cropped.
export function AwardsShowcase({ awards }) {
  const track = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [open, setOpen] = useState(null);
  const items = awards.map((a) => ({ ...a, meta: awardMeta(a) }));

  useEffect(() => {
    const el = track.current;
    const update = () =>
      setEdge({
        start: el.scrollLeft < 8,
        end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8,
      });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (dir) =>
    track.current.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <div className="awards">
      <div className="container awards__controls">
        <button className="awards__btn" onClick={() => scroll(-1)} disabled={edge.start} aria-label="Scroll awards left">
          <Chevron dir="prev" />
        </button>
        <button className="awards__btn" onClick={() => scroll(1)} disabled={edge.end} aria-label="Scroll awards right">
          <Chevron dir="next" />
        </button>
      </div>
      <Reveal delay={120}>
        <ul className="awards__track" ref={track}>
          {items.map((a, i) => (
            <li key={a.src} className="award">
              <button
                className="award__frame"
                style={{ "--r": a.width / a.height }}
                onClick={() => setOpen(i)}
                aria-label={`View ${a.title}${a.meta ? `, ${a.meta}` : ""}`}
              >
                <Image src={a.src} alt={a.alt} fill sizes="(max-width: 620px) 80vw, 460px" loading="lazy" />
                <span className="award__zoom"><Expand /></span>
              </button>
              <div className="award__text">
                {a.meta && <span className="award__meta">{a.meta}</span>}
                <h3 className="award__title">{a.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
      <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} label="Awards and recognition" />
    </div>
  );
}

const GAP = 20;

// Justified rows: fill each row towards the container width at the target
// height, breaking wherever the row height lands closest to that target. A
// short final row keeps the target height instead of being blown up.
function justify(photos, width) {
  const target = width < 620 ? 260 : width < 960 ? 260 : 300;
  const heightOf = (ratio, n) => (width - GAP * (n - 1)) / ratio;
  const rows = [];
  let row = [];
  let ratio = 0;
  photos.forEach((p, i) => {
    const r = p.width / p.height;
    if (ratio * target + GAP * (row.length - 1) >= width - r * target) {
      // adding this photo would overflow: keep it only if that is closer to target
      const withIt = heightOf(ratio + r, row.length + 1);
      const without = heightOf(ratio, row.length);
      if (row.length && Math.abs(without - target) < Math.abs(withIt - target)) {
        rows.push({ items: row, ratio, full: true });
        row = [];
        ratio = 0;
      }
    }
    row.push(i);
    ratio += r;
  });
  if (row.length) {
    const natural = ratio * target * 1.3 + GAP * (row.length - 1);
    rows.push({ items: row, ratio, full: natural >= width, maxWidth: ratio * target + GAP * (row.length - 1) });
  }
  return rows;
}

// Company photos: editorial justified rows at natural aspect ratios, so every
// row is flush on both edges and nothing is cropped.
export function MomentsGallery({ photos }) {
  const wrap = useRef(null);
  const [open, setOpen] = useState(null);
  // Desktop container width until measured, so the server render matches.
  const [width, setWidth] = useState(1112);

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setWidth(Math.round(e.contentRect.width)));
    ro.observe(wrap.current);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <div className="moments" ref={wrap}>
        {justify(photos, width).map((row) => (
          <ul
            key={row.items[0]}
            className="moments__row"
            style={row.full ? undefined : { maxWidth: row.maxWidth }}
          >
            {row.items.map((i, n) => {
              const p = photos[i];
              const r = p.width / p.height;
              return (
                <Reveal
                  as="li"
                  key={p.src}
                  className="moment"
                  delay={n * 90}
                  style={{ flexGrow: r, aspectRatio: `${p.width} / ${p.height}` }}
                >
                  <button className="moment__btn" onClick={() => setOpen(i)} aria-label={`View photo: ${p.caption}`}>
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes={`(max-width: 620px) ${Math.min(100, Math.round((r / row.ratio) * 100))}vw, ${Math.round((r / row.ratio) * 1200)}px`}
                      loading="lazy"
                    />
                    <span className="moment__cap">
                      <span>{p.caption}</span>
                      <Expand />
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </ul>
        ))}
      </div>
      <Lightbox items={photos} index={open} onIndex={setOpen} onClose={() => setOpen(null)} label="Life at First Key photo gallery" />
    </>
  );
}
