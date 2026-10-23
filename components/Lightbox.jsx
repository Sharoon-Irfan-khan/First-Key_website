"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

const Chevron = ({ dir }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points={dir === "prev" ? "15 5 8 12 15 19" : "9 5 16 12 9 19"} />
  </svg>
);

// Full-screen viewer shared by the awards and photo galleries. `index` is the
// open item (null when closed); arrows, Escape and swipe all drive `onIndex`.
export default function Lightbox({ items, index, onIndex, onClose, label }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const touchX = useRef(null);
  const open = index !== null && index !== undefined;
  const count = items.length;

  const go = (step) => onIndex((index + step + count) % count);

  useEffect(() => {
    if (!open) return;
    // Hand focus back to whichever thumbnail opened the viewer once it closes.
    const opener = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      opener?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        // keep keyboard focus inside the dialog
        const els = dialogRef.current.querySelectorAll("button");
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  if (!open) return null;
  const item = items[index];

  return createPortal(
    <div
      ref={dialogRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50 && count > 1) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="lightbox__bar">
        <span className="lightbox__count">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
        <button ref={closeRef} className="lightbox__close" onClick={onClose} aria-label="Close viewer">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </button>
      </div>

      <figure className="lightbox__figure" key={item.src}>
        <div className="lightbox__frame">
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            sizes="(max-width: 900px) 100vw, 80vw"
            quality={85}
            priority
          />
        </div>
        {(item.title || item.caption) && (
          <figcaption className="lightbox__caption">
            <b>{item.title || item.caption}</b>
            {item.meta && <span>{item.meta}</span>}
          </figcaption>
        )}
      </figure>

      {count > 1 && (
        <>
          <button className="lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label="Previous image">
            <Chevron dir="prev" />
          </button>
          <button className="lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label="Next image">
            <Chevron dir="next" />
          </button>
        </>
      )}
    </div>,
    document.body
  );
}
