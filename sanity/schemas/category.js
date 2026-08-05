/**
 * A blog topic. Its own document type rather than a fixed list in code, so the
 * team can add, rename or reorder topics in the Studio without a deploy.
 *
 * The slug is what appears in the URL (/category/<slug>) and what the
 * navigation links to, so changing it moves the page — see the field note.
 */
export const category = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Shown in the Blogs menu and on the category page.",
      validation: (Rule) => Rule.required().max(80),
    },
    {
      name: "slug",
      title: "URL slug",
      type: "slug",
      description:
        "The address of the category, e.g. /category/renting-in-dubai. Changing this breaks any link already shared.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description:
        "One line explaining the topic. Shown at the top of the category page and used as its search-engine summary.",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "order",
      title: "Menu position",
      type: "number",
      description:
        "Lower numbers come first in the Blogs menu. Leave blank and the topic falls to the end, sorted by title.",
    },
  ],
  orderings: [
    {
      title: "Menu order",
      name: "menuOrder",
      by: [
        { field: "order", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
};
