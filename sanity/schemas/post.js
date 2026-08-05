/**
 * The fixed set of topics a post can sit under. Editors pick one from a
 * dropdown — adding a new topic means adding a line here, not typing free text,
 * so the labels stay consistent across the blog.
 */
export const POST_CATEGORIES = [
  { title: "Dubai Community", value: "dubai-community" },
  { title: "UAE Property Market", value: "uae-property-market" },
  { title: "Real Estate Investment", value: "real-estate-investment" },
  { title: "Selling in Dubai", value: "selling-in-dubai" },
  { title: "Renting in Dubai", value: "renting-in-dubai" },
];

/** Turns a stored category value back into the label editors picked. */
export function categoryLabel(value) {
  return POST_CATEGORIES.find((c) => c.value === value)?.title || "";
}

/**
 * The one document type behind the blog.
 * Editors fill this in at /studio; the site reads it in app/blogs.
 */
export const post = {
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    },
    {
      name: "slug",
      title: "URL slug",
      type: "slug",
      description: "The address of the post, e.g. /blogs/dubai-market-2026",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      description: "Pick the topic this post belongs to.",
      options: { list: POST_CATEGORIES, layout: "dropdown" },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Publish date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    },
    {
      name: "coverImage",
      title: "Cover image",
      type: "image",
      description: "Shown on the blog list and at the top of the post.",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the image for screen readers and search engines.",
        },
      ],
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "One or two sentences shown on the blog list.",
      validation: (Rule) => Rule.max(300),
    },
    {
      name: "body",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  {
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (Rule) =>
                      Rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
      ],
    },
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", date: "publishedAt", category: "category", media: "coverImage" },
    prepare({ title, date, category, media }) {
      const when = date ? new Date(date).toLocaleDateString("en-GB") : "No date";
      const label = categoryLabel(category);
      return {
        title,
        media,
        subtitle: label ? `${label} · ${when}` : when,
      };
    },
  },
};
