"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProjectGallery({ images = [], name = "" }) {
  const [active, setActive] = useState(0);
  if (!images.length) return null;

  return (
    <div className="prop-gallery">
      <div className="prop-gallery__main">
        <Image
          src={images[active]}
          alt={`${name} — view ${active + 1}`}
          fill
          sizes="(max-width: 900px) 100vw, 800px"
          priority={active === 0}
        />
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
              <Image src={src} alt="" fill sizes="140px" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
