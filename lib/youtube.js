// Server-only: reads the public First Key International YouTube channel so the
// homepage gallery stays current without anyone touching the site. Nothing is
// downloaded or re-hosted — only ids, titles and dates; the player and the
// thumbnails are served by YouTube itself.
//
// Two sources, same result shape:
//   1. YouTube Data API v3, when YOUTUBE_API_KEY is set (up to 50 per list,
//      skips private/unlisted uploads). The key is read here on the server and
//      never reaches the browser — do NOT give it a NEXT_PUBLIC_ prefix.
//   2. YouTube's public RSS feeds otherwise (no key, latest 15 per list).
// If the API call fails for any reason the RSS feed is tried before giving up.

const DEFAULT_CHANNEL_ID = "UCBHALRrPe7H7mzx7a0t2giw"; // @FirstKeyInternational

export const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || DEFAULT_CHANNEL_ID;
export const CHANNEL_URL = "https://www.youtube.com/@FirstKeyInternational";

// How often the homepage re-checks the channel, in seconds.
const REVALIDATE = 60 * 60;

// Every channel has two auto-generated playlists alongside its uploads list:
// UULF = long-form videos only, UUSH = Shorts only. Swapping the "UC" prefix
// of the channel id is how YouTube itself builds them.
const playlistId = (kind) => `${kind === "shorts" ? "UUSH" : "UULF"}${CHANNEL_ID.slice(2)}`;

const LIMITS = { videos: 9, shorts: 12 };

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };
function decode(str) {
  return str
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&(amp|lt|gt|quot|apos);/g, (_, e) => ENTITIES[e]);
}

// Hashtags help on YouTube but read as clutter on a card. The untouched title
// is kept alongside for tooltips and screen readers.
function tidyTitle(title) {
  // A tag must start with a letter, so "#1 broker" survives.
  const clean = title.replace(/#[\p{L}_][\p{L}\p{N}_]*/gu, " ").replace(/\s+/g, " ").trim();
  return clean || title.trim();
}

const toItem = (id, title, publishedAt) => ({
  id,
  title: tidyTitle(title),
  fullTitle: title.trim(),
  publishedAt,
});

async function fromApi(kind, key) {
  const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  url.search = new URLSearchParams({
    part: "snippet,contentDetails,status",
    playlistId: playlistId(kind),
    maxResults: String(LIMITS[kind]),
    key,
  });
  const res = await fetch(url, { next: { revalidate: REVALIDATE, tags: ["youtube"] } });
  // A channel with no Shorts yet has no UUSH playlist: that is an empty list,
  // not an error worth falling back over.
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`Data API ${res.status}`);
  const data = await res.json();
  return (data.items || [])
    .filter((it) => it.status?.privacyStatus === "public")
    .map((it) =>
      toItem(
        it.contentDetails.videoId,
        it.snippet.title,
        it.contentDetails.videoPublishedAt || it.snippet.publishedAt
      )
    );
}

async function fromFeed(kind) {
  const res = await fetch(
    `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId(kind)}`,
    { next: { revalidate: REVALIDATE, tags: ["youtube"] } }
  );
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`RSS feed ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .map(([, entry]) => {
      const pick = (tag) => entry.match(new RegExp(`<${tag}>([^<]*)</${tag}>`))?.[1];
      const id = pick("yt:videoId");
      return id ? toItem(id, decode(pick("title") || ""), pick("published")) : null;
    })
    .filter(Boolean)
    .slice(0, LIMITS[kind]);
}

async function load(kind) {
  const key = process.env.YOUTUBE_API_KEY;
  if (key) {
    try {
      return await fromApi(kind, key);
    } catch (err) {
      console.error(`[youtube] ${kind} via Data API failed, using RSS:`, err.message);
    }
  }
  try {
    return await fromFeed(kind);
  } catch (err) {
    console.error(`[youtube] ${kind} via RSS failed:`, err.message);
    return [];
  }
}

/** Latest public uploads, newest first: `{ videos, shorts }`. Never throws. */
export async function getChannelVideos() {
  const [videos, shorts] = await Promise.all([load("videos"), load("shorts")]);
  return { videos, shorts };
}
