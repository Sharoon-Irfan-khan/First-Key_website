/**
 * The one document type behind the blog.
 * Editors fill this in at /studio; the site reads it in app/blogs.
 */
export const post = {
  name: "post",
  title: "Blog post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(120),
    },
    {
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "content",
      description: "The address of the post, e.g. /blogs/dubai-market-2026",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      group: "content",
      to: [{ type: "category" }],
      description:
        "Pick the topic this post belongs to. Manage the list under Categories.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Publish date",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    },
    {
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "content",
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
      group: "content",
      rows: 3,
      description: "One or two sentences shown on the blog list.",
      validation: (Rule) => Rule.max(300),
    },
    {
      name: "body",
      title: "Content",
      type: "array",
      group: "content",
      of: [
        {
          type: "block",
          // H1 is deliberately absent: the post title is already the page's
          // single h1, so a second one in the body would confuse search engines.
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Heading 5", value: "h5" },
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
              { title: "Underline", value: "underline" },
              { title: "Strike", value: "strike-through" },
              { title: "Code", value: "code" },
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
                    description:
                      "Full address (https://…) or a path on this site (/contact).",
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                        allowRelative: true,
                      }),
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

    /* ---------------------------------------------------------------
       SEO — every field is optional and falls back to the content above,
       so a post left untouched here still gets sensible tags.
       --------------------------------------------------------------- */
    {
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      group: "seo",
      description:
        "Title shown in Google. Leave blank to use the post title. Aim for under 60 characters.",
      validation: (Rule) => Rule.max(70),
    },
    {
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      group: "seo",
      rows: 3,
      description:
        "Summary shown under the title in Google. Leave blank to use the excerpt. Aim for 150–160 characters.",
      validation: (Rule) => Rule.max(180),
    },
    {
      name: "ogImage",
      title: "Social share image",
      type: "image",
      group: "seo",
      description:
        "Image used when the post is shared on WhatsApp, LinkedIn or Facebook. Leave blank to use the cover image.",
      options: { hotspot: true },
    },
    {
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      group: "seo",
      description:
        "Only fill this in if the same article is published somewhere else and that copy should rank instead.",
    },
    {
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      group: "seo",
      description:
        "Turn on for drafts or thin pages you do not want Google to list.",
      initialValue: false,
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
    select: {
      title: "title",
      date: "publishedAt",
      category: "category.title",
      media: "coverImage",
    },
    prepare({ title, date, category, media }) {
      const when = date ? new Date(date).toLocaleDateString("en-GB") : "No date";
      return {
        title,
        media,
        subtitle: category ? `${category} · ${when}` : when,
      };
    },
  },
};
