import Link from "next/link";
import { Arrow } from "../icons";
import { imageUrl } from "@/lib/sanity/image";
import { formatPostDate } from "@/lib/sanity/format";

export default function PostCard({ post }) {
  const cover = imageUrl(post.coverImage, 900);

  return (
    <Link href={`/blogs/${post.slug}`} className="pjcard">
      <div className="pjcard__media">
        {cover ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={cover} alt={post.coverImage?.alt || ""} loading="lazy" />
        ) : (
          <div className="pjcard__placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="pjcard__body">
        <p className="pjcard__loc">{formatPostDate(post.publishedAt)}</p>
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
