import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { CTA } from "@/components/ui";
import { Arrow } from "@/components/icons";
import PortableBody from "@/components/blog/PortableBody";
import { getPost, getPostSlugs } from "@/lib/sanity/queries";
import { imageUrl } from "@/lib/sanity/image";
import { formatPostDate } from "@/lib/sanity/format";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return { title: "Article not found" };
  const cover = imageUrl(post.coverImage, 1200);
  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: "article",
      publishedTime: post.publishedAt,
      images: cover ? [cover] : undefined,
    },
  };
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const cover = imageUrl(post.coverImage, 1800);

  return (
    <>
      <article className="section post">
        <div className="container container--narrow">
          <Reveal>
            <Link href="/blogs" className="link-arrow" style={{ color: "var(--slate)" }}>
              <span style={{ transform: "scaleX(-1)", display: "inline-flex" }}>
                <Arrow />
              </span>
              Back to all articles
            </Link>
          </Reveal>

          <Reveal>
            <p className="post__date">{formatPostDate(post.publishedAt)}</p>
            <h1 className="display post__title">{post.title}</h1>
            {post.excerpt && <p className="lead post__lead">{post.excerpt}</p>}
          </Reveal>

          {cover && (
            <Reveal>
              <div className="post__cover">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cover} alt={post.coverImage?.alt || ""} />
              </div>
            </Reveal>
          )}

          <Reveal>
            <PortableBody value={post.body} />
          </Reveal>
        </div>
      </article>

      <CTA
        eyebrow="Talk to a broker"
        title="Want advice on your own purchase?"
        text="Speak with a First Key broker for honest figures on any community or project in Dubai."
        image="/images/sky-a.jpg"
      />
    </>
  );
}
