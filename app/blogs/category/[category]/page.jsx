import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { SectionHead, CTA } from "@/components/ui";
import PostCard from "@/components/blog/PostCard";
import { getPostsByCategory } from "@/lib/sanity/queries";
import { POST_CATEGORIES } from "@/sanity/schemas/post";

export function generateStaticParams() {
  return POST_CATEGORIES.map((c) => ({ category: c.value }));
}

function findCategory(value) {
  return POST_CATEGORIES.find((c) => c.value === value);
}

export function generateMetadata({ params }) {
  const category = findCategory(params.category);
  if (!category) return { title: "Category not found" };
  return {
    title: `${category.title} — Dubai Property Insights`,
    description: `Articles on ${category.title.toLowerCase()} from the brokers at First Key International Real Estate.`,
  };
}

export default async function CategoryPage({ params }) {
  const category = findCategory(params.category);
  if (!category) notFound();

  const posts = await getPostsByCategory(category.value);

  return (
    <>
      <Hero
        page
        actions={false}
        image="/images/sky-downtown.jpg"
        eyebrow="Insights"
        title={category.title}
        sub={`Everything we have written on ${category.title.toLowerCase()}.`}
      />

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="Category"
              title={
                posts.length
                  ? `${posts.length} article${posts.length === 1 ? "" : "s"}`
                  : "Nothing here yet"
              }
            />
          </Reveal>

          {posts.length > 0 ? (
            <div className="projects-grid" style={{ marginTop: "48px" }}>
              {posts.map((p, i) => (
                <Reveal key={p._id} delay={(i % 3) * 80}>
                  <PostCard post={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <p className="lead" style={{ marginTop: "28px", maxWidth: "60ch" }}>
                We haven&rsquo;t published anything under {category.title} yet.
                Browse <Link href="/blogs">all articles</Link> in the meantime.
              </p>
            </Reveal>
          )}

          <Reveal>
            <p style={{ marginTop: "48px" }}>
              <Link href="/blogs" className="link-arrow">
                All articles
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <CTA
        eyebrow="Talk to a broker"
        title="Questions the articles didn't answer?"
        text="Get straight answers on pricing, communities and payment plans from a First Key broker."
        image="/images/sky-b.jpg"
      />
    </>
  );
}
