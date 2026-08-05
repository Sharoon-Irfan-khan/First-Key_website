/**
 * The Studio's left-hand Content list.
 *
 * Sanity's default lists one entry per document type. Categories are a
 * supporting type rather than something editors browse alongside posts, so the
 * list is spelled out instead: posts first, the ones still missing a category
 * surfaced at the top, and categories last.
 */
export const structure = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Blog Posts — Needs Category")
        .child(
          S.documentList()
            .title("Needs a category")
            // Catches two cases: never set, and set before categories became
            // documents — those hold a plain string, so the reference does not
            // resolve and the topic would silently vanish from the site.
            .filter(
              '_type == "post" && (!defined(category) || !defined(category->_id))'
            )
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),
      S.listItem()
        .title("Blog Posts (All)")
        .child(
          S.documentList()
            .title("Blog posts")
            .filter('_type == "post"')
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),
      S.divider(),
      S.listItem()
        .title("Categories")
        .child(
          S.documentList()
            .title("Categories")
            .filter('_type == "category"')
            .defaultOrdering([
              { field: "order", direction: "asc" },
              { field: "title", direction: "asc" },
            ])
        ),
    ]);
