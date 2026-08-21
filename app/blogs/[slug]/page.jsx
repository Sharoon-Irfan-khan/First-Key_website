import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { CTA } from "@/components/ui";
import { Arrow } from "@/components/icons";
import PortableBody from "@/components/blog/PortableBody";
import { getPost, getPosts } from "@/lib/sanity/queries";
import { imageUrl } from "@/lib/sanity/image";
import { formatPostDate } from "@/lib/sanity/format";

export async function generateStaticParams() {
  // getPosts() (unlike getPostSlugs()) returns slugs normalized to clean
  // kebab-case, so a mistyped Studio slug still builds under its proper URL.
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return { title: "Article not found" };

  // Every SEO field is optional in the Studio, so each one falls back to the
  // content the editor already wrote.
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt || undefined;
  const share = imageUrl(post.ogImage || post.coverImage, 1200);

  return {
    title,
    description,
    alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
    robots: post.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      images: share ? [share] : undefined,
    },
    twitter: {
      card: share ? "summary_large_image" : "summary",
      title,
      description,
      images: share ? [share] : undefined,
    },
  };
}

// Schema.org Article markup for search engines. There is no author persona on
// this site, so First Key is credited as both author and publisher rather
// than inventing a byline.
function articleJsonLd(post) {
  const url = `https://firstkeyint.com/blogs/${post.slug}`;
  const image = imageUrl(post.ogImage || post.coverImage, 1200);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription || post.excerpt || undefined,
    image: image ? [image] : undefined,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    author: { "@type": "Organization", name: "First Key International Real Estate", url: "https://firstkeyint.com" },
    publisher: {
      "@type": "Organization",
      name: "First Key International Real Estate",
      logo: { "@type": "ImageObject", url: "https://firstkeyint.com/images/emblem-blue.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": post.canonicalUrl || url },
  };
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const cover = imageUrl(post.coverImage, 1800);

  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD from CMS-authored fields only; escape "<" so it can't break out of the script tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(post)).replace(/</g, "\\u003c"),
        }}
      />
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
            <p className="post__date">
              {post.category?.slug && (
                <>
                  <Link href={`/category/${post.category.slug}`}>
                    {post.category.title}
                  </Link>
                  {" · "}
                </>
              )}
              {formatPostDate(post.publishedAt)}
            </p>
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
