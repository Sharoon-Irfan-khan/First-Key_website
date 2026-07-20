import { PortableText } from "next-sanity";
import { imageUrl } from "@/lib/sanity/image";

const components = {
  types: {
    image: ({ value }) => {
      const src = imageUrl(value, 1400);
      if (!src) return null;
      return (
        <figure className="post__figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={value.alt || ""} loading="lazy" decoding="async" />
          {value.alt && <figcaption>{value.alt}</figcaption>}
        </figure>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || "";
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
};

export default function PortableBody({ value }) {
  if (!value?.length) return null;
  return (
    <div className="prose post__body">
      <PortableText value={value} components={components} />
    </div>
  );
}
