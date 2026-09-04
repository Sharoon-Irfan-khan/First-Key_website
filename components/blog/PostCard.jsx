import Link from "next/link";
import { Arrow } from "../icons";
import { imageUrl, imageSrcSet } from "@/lib/sanity/image";
import { formatPostDate } from "@/lib/sanity/format";

// Card sits in a 2-column grid above 700px (roughly half the container) and
// goes full-width below it — see .projects-grid in globals.css.
const CARD_SIZES = "(max-width: 700px) 100vw, 50vw";

export default function PostCard({ post }) {
  const cover = imageUrl(post.coverImage, 900);
  const coverSrcSet = imageSrcSet(post.coverImage, [400, 600, 900, 1200]);
  const category = post.category?.title;

  return (
    <Link href={`/blogs/${post.slug}`} className="pjcard">
      <div className="pjcard__media">
        {cover ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={cover}
            srcSet={coverSrcSet}
            sizes={CARD_SIZES}
            alt={post.coverImage?.alt || ""}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="pjcard__placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="pjcard__body">
        <p className="pjcard__loc">
          {category ? `${category} · ` : ""}
          {formatPostDate(post.publishedAt)}
        </p>
        <h3>{post.title}</h3>
        {post.excerpt && <p className="postcard__excerpt">{post.excerpt}</p>}
        <div className="pjcard__foot">
          <span className="link-arrow">
            Read article <Arrow />
          </span>
        </div>
      </div>
    </Link>
  );
}
