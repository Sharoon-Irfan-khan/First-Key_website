import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { SectionHead, CTA } from "@/components/ui";
import PostCard from "@/components/blog/PostCard";
import { getPosts } from "@/lib/sanity/queries";

export const metadata = {
  title: "Dubai Property Insights & Market News",
  description:
    "Market updates, buying guides and community spotlights from the brokers at First Key International Real Estate.",
};

export default async function Blog() {
  const posts = await getPosts();

  return (
    <>
      <Hero
        page
        actions={false}
        image="/images/sky-downtown.jpg"
        eyebrow="Insights"
        title="Dubai property, explained clearly"
        sub="Market updates, buying guides and community spotlights — written by the brokers who work these deals every day."
      />

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="Latest articles"
              title={posts.length ? "From the First Key desk" : "Articles are on the way"}
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
                We are putting together our first pieces on the Dubai market. In
                the meantime, speak with a broker directly — we are happy to talk
                through prices, communities and payment plans.
              </p>
            </Reveal>
          )}
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
