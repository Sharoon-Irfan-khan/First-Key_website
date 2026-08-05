# Seeding the blog categories

`categories.ndjson` holds the five starting topics. Import it once, or skip it
entirely and create the same five by hand under **Categories** in the Studio —
the file only saves typing.

```bash
npx sanity login          # once, in a browser
npx sanity dataset import sanity/seed/categories.ndjson production --replace
```

`--replace` overwrites documents with the same `_id`, so running it twice is
safe and will not create duplicates. Drop the flag if you have edited the
wording in the Studio and do not want it reset.

The `_id`s are deliberately readable (`category-renting-in-dubai`) rather than
random, so a re-import updates the existing documents instead of adding a
second copy of each.

## After importing

Existing posts written before categories became documents still hold a plain
string in their `category` field, which no longer resolves. Open **Blog Posts —
Needs Category** in the Studio and re-pick the topic on each one — that list is
filtered to show exactly the posts affected, and empties as you fix them.
