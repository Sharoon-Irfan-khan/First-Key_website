import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { CTA } from "@/components/ui";
import { Arrow } from "@/components/icons";
import PortableBody from "@/components/blog/PortableBody";
import { getPost, getPosts } from "@/lib/sanity/queries";
import { imageUrl, imageSrcSet } from "@/lib/sanity/image";
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

// Schema.org FAQPage markup, derived from the post body itself rather than a
// separate Studio field. Activates only when an editor has written a body
// section styled exactly "Frequently Asked Questions" (h2) followed by
// question/answer pairs (h3 + normal paragraphs) — posts without that
// section (i.e. every article published before this) render unaffected.
function faqJsonLd(body) {
  if (!Array.isArray(body)) return null;

  const blockText = (block) =>
    (block.children || []).map((c) => c.text || "").join("").trim();

  const faqStart = body.findIndex(
    (b) =>
      b._type === "block" &&
      b.style === "h2" &&
      blockText(b).toLowerCase() === "frequently asked questions"
  );
  if (faqStart === -1) return null;

  const pairs = [];
  let question = null;
  let answerParts = [];

  const flush = () => {
    if (question && answerParts.length) {
      pairs.push({ question, answer: answerParts.join(" ") });
    }
    question = null;
    answerParts = [];
  };

  for (let i = faqStart + 1; i < body.length; i++) {
    const b = body[i];
    if (b._type !== "block") continue;
    if (b.style === "h2") break; // next section — FAQ block ends
    if (b.style === "h3") {
      flush();
      question = blockText(b);
    } else if (question && b.style === "normal" && !b.listItem) {
      answerParts.push(blockText(b));
    }
  }
  flush();

  if (pairs.length < 2) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pairs.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: { "@type": "Answer", text: qa.answer },
    })),
  };
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  // 820px is the article's own max-width (.container--narrow), so 1600 comfortably
  // covers a 2x-DPR desktop reader without shipping that size to a phone.
  const cover = imageUrl(post.coverImage, 1600);
  const coverSrcSet = imageSrcSet(post.coverImage, [640, 820, 1200, 1600]);
  const faq = faqJsonLd(post.body);

  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD from CMS-authored fields only; escape "<" so it can't break out of the script tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(post)).replace(/</g, "\\u003c"),
        }}
      />
      {faq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faq).replace(/</g, "\\u003c"),
          }}
        />
      )}
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
                <img
                  src={cover}
                  srcSet={coverSrcSet}
                  sizes="(max-width: 820px) 100vw, 820px"
                  alt={post.coverImage?.alt || ""}
                  fetchPriority="high"
                  decoding="async"
                />
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
