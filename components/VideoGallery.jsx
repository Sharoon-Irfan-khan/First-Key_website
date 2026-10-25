"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Reveal from "./Reveal";
import { formatPostDate } from "@/lib/sanity/format";

const Chevron = ({ dir, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points={dir === "prev" ? "15 5 8 12 15 19" : "9 5 16 12 9 19"} />
  </svg>
);

const Play = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5.6v12.8a.9.9 0 0 0 1.37.77l10.2-6.4a.9.9 0 0 0 0-1.54L9.37 4.83A.9.9 0 0 0 8 5.6z" />
  </svg>
);

// Thumbnails are tried best-first; a size YouTube never generated for an
// upload just falls through to the next one instead of showing a broken image.
// oar2 is the true vertical Shorts frame; hq720/hqdefault exist for everything.
const thumbs = (id, short) =>
  (short ? ["oar2", "hq720", "hqdefault"] : ["maxresdefault", "hq720", "hqdefault"]).map(
    (f) => `https://i.ytimg.com/vi/${id}/${f}.jpg`
  );

function Thumb({ id, short, alt }) {
  const sources = thumbs(id, short);
  const [n, setN] = useState(0);
  return (
    <Image
      src={sources[n]}
      alt={alt}
      fill
      sizes={short ? "(max-width: 620px) 62vw, 260px" : "(max-width: 620px) 86vw, 460px"}
      loading="lazy"
      onError={() => setN((i) => Math.min(i + 1, sources.length - 1))}
    />
  );
}

function Rail({ label, count, items, short, onPlay }) {
  const track = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

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
    <div className={`vrail ${short ? "vrail--shorts" : ""}`}>
      <div className="container vrail__head">
        <h3 className="vrail__label">
          {label}
          <span>{String(count).padStart(2, "0")}</span>
        </h3>
        {!(edge.start && edge.end) && (
          <div className="vrail__controls">
            <button className="vrail__btn" onClick={() => scroll(-1)} disabled={edge.start} aria-label={`Scroll ${label} left`}>
              <Chevron dir="prev" />
            </button>
            <button className="vrail__btn" onClick={() => scroll(1)} disabled={edge.end} aria-label={`Scroll ${label} right`}>
              <Chevron dir="next" />
            </button>
          </div>
        )}
      </div>
      <Reveal delay={120}>
        <ul className="vrail__track" ref={track}>
          {items.map((v, i) => (
            <li key={v.id} className="vcard">
              <button
                className="vcard__frame"
                onClick={() => onPlay(i)}
                aria-label={`Play ${short ? "Short" : "video"}: ${v.fullTitle}`}
                title={v.fullTitle}
              >
                <Thumb id={v.id} short={short} alt="" />
                <span className="vcard__shade" />
                <span className="vcard__play"><Play /></span>
                {short && <span className="vcard__tag">Shorts</span>}
              </button>
              <div className="vcard__text">
                {v.publishedAt && <span className="vcard__meta">{formatPostDate(v.publishedAt)}</span>}
                <h4 className="vcard__title">{v.title}</h4>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

// Full-screen YouTube player. The iframe only exists while open, so the
// homepage loads no YouTube scripts until a visitor actually presses play.
function Player({ items, index, short, onIndex, onClose }) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const open = index !== null;
  const count = items.length;
  const go = (step) => onIndex((index + step + count) % count);

  useEffect(() => {
    if (!open) return;
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
      else if (e.key === "ArrowRight" && count > 1) go(1);
      else if (e.key === "ArrowLeft" && count > 1) go(-1);
      else if (e.key === "Tab") {
        const els = dialogRef.current.querySelectorAll("button, iframe");
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
  const v = items[index];
  const src = `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&playsinline=1&modestbranding=1`;

  return createPortal(
    <div
      ref={dialogRef}
      className="lightbox vplayer"
      role="dialog"
      aria-modal="true"
      aria-label={v.fullTitle}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="lightbox__bar">
        <span className="lightbox__count">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
        <button ref={closeRef} className="lightbox__close" onClick={onClose} aria-label="Close video">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </button>
      </div>

      <figure className={`vplayer__figure ${short ? "vplayer__figure--short" : ""}`} key={v.id}>
        <div className="vplayer__frame">
          <iframe
            src={src}
            title={v.fullTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <figcaption className="lightbox__caption">
          <b>{v.title}</b>
          <a
            className="vplayer__yt"
            href={short ? `https://www.youtube.com/shorts/${v.id}` : `https://www.youtube.com/watch?v=${v.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on YouTube
          </a>
        </figcaption>
      </figure>

      {count > 1 && (
        <>
          <button className="lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label="Previous video">
            <Chevron dir="prev" size={22} />
          </button>
          <button className="lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label="Next video">
            <Chevron dir="next" size={22} />
          </button>
        </>
      )}
    </div>,
    document.body
  );
}

export default function VideoGallery({ videos, shorts }) {
  // { list: "videos" | "shorts", index } while a video is playing
  const [playing, setPlaying] = useState(null);
  const lists = { videos, shorts };

  return (
    <div className="vgallery">
      {videos.length > 0 && (
        <Rail
          label="Featured videos"
          count={videos.length}
          items={videos}
          onPlay={(index) => setPlaying({ list: "videos", index })}
        />
      )}
      {shorts.length > 0 && (
        <Rail
          label="Shorts"
          count={shorts.length}
          items={shorts}
          short
          onPlay={(index) => setPlaying({ list: "shorts", index })}
        />
      )}
      <Player
        items={playing ? lists[playing.list] : []}
        index={playing ? playing.index : null}
        short={playing?.list === "shorts"}
        onIndex={(index) => setPlaying((p) => ({ ...p, index }))}
        onClose={() => setPlaying(null)}
      />
    </div>
  );
}
