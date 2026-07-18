"use client";

import { useState } from "react";

export default function ProjectGallery({ images = [], name = "" }) {
  const [active, setActive] = useState(0);
  if (!images.length) return null;

  return (
    <div className="prop-gallery">
      <div className="prop-gallery__main">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[active]} alt={`${name} — view ${active + 1}`} />
      </div>
      {images.length > 1 && (
        <div className="prop-gallery__thumbs">
          {images.map((src, i) => (
            <button
              key={src + i}
              className={`prop-gallery__thumb ${i === active ? "is-active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${name}`}
              aria-current={i === active ? "true" : undefined}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
