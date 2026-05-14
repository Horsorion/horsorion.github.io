/**
 * fetch_unsplash.mjs
 *
 * Downloads a curated set of Unsplash photos for the Horsorion website.
 * Outputs:
 *   site/public/images/unsplash/<key>.jpg  — downloaded images
 *   site/src/lib/unsplash-images.ts         — typed manifest with attribution
 *
 * Run: node scripts/fetch_unsplash.mjs
 * Requires Node 18+ (uses global fetch).
 */

import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Config ──────────────────────────────────────────────────────────────────
const ACCESS_KEY =
  process.env.UNSPLASH_ACCESS_KEY || "vCtHlen3lqP9LcZHkHs95S1tbgJLsEVzkUioc6tVxj4";

const OUTPUT_DIR = path.join(__dirname, "../site/public/images/unsplash");
const MANIFEST_PATH = path.join(__dirname, "../site/src/lib/unsplash-images.ts");

// Photo "slots" — key, what we'll use it for, and the best search query.
// More specific queries → better results for niche topics.
const SLOTS = [
  {
    key: "race-action",
    use: "Homepage editorial strip / hero accent",
    query: "horse racing jockey race track action",
    orientation: "landscape",
    size: "regular",
  },
  {
    key: "racecourse-aerial",
    use: "Homepage background or About page strip",
    query: "racecourse grandstand aerial stadium horse racing",
    orientation: "landscape",
    size: "full",
  },
  {
    key: "crowd-stands",
    use: "Use-cases editorial background",
    query: "horse racing crowd spectators grandstand",
    orientation: "landscape",
    size: "regular",
  },
  {
    key: "data-screen",
    use: "Data / integration section accent",
    query: "data analysis trading screen dark monitors",
    orientation: "landscape",
    size: "regular",
  },
  {
    key: "hk-city-night",
    use: "About / contact atmosphere",
    query: "hong kong city skyline night lights",
    orientation: "landscape",
    size: "full",
  },
  {
    key: "horse-detail",
    use: "Why / solutions editorial detail",
    query: "racehorse detail close up training",
    orientation: "landscape",
    size: "regular",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function searchUnsplash(query, orientation, perPage = 5) {
  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", query);
  url.searchParams.set("orientation", orientation);
  url.searchParams.set("per_page", String(perPage));
  url.searchParams.set("content_filter", "high");
  url.searchParams.set("client_id", ACCESS_KEY);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Unsplash search failed: ${res.status} ${res.statusText}`);
  return res.json();
}

function downloadFile(urlStr, destPath) {
  return new Promise((resolve, reject) => {
    const dest = fs.createWriteStream(destPath);
    const follow = (u) => {
      https
        .get(u, (response) => {
          if (response.statusCode === 301 || response.statusCode === 302) {
            follow(response.headers.location);
            return;
          }
          if (response.statusCode !== 200) {
            reject(new Error(`HTTP ${response.statusCode} for ${u}`));
            return;
          }
          response.pipe(dest);
          dest.on("finish", () => dest.close(resolve));
          dest.on("error", reject);
        })
        .on("error", reject);
    };
    follow(urlStr);
  });
}

// Pick the "best" result — prefer wider photos with high download counts
function pickBest(results, size) {
  if (!results || results.length === 0) return null;
  // Sort by likes desc as a proxy for quality
  const sorted = [...results].sort((a, b) => b.likes - a.likes);
  const chosen = sorted[0];
  return {
    url: chosen.urls[size] || chosen.urls.regular,
    photoPage: chosen.links.html,
    altDescription: chosen.alt_description || chosen.description || "Racing photo",
    photographer: {
      name: chosen.user.name,
      url: chosen.user.links.html,
    },
    width: chosen.width,
    height: chosen.height,
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const manifest = {};
const errors = [];

console.log("Horsorion — Unsplash image fetch\n");

for (const slot of SLOTS) {
  process.stdout.write(`[${slot.key}] Searching "${slot.query}"…`);
  try {
    const data = await searchUnsplash(slot.query, slot.orientation);
    const pick = pickBest(data.results, slot.size);

    if (!pick) {
      console.log(" ✗ no results");
      errors.push(slot.key);
      continue;
    }

    const destName = `${slot.key}.jpg`;
    const destPath = path.join(OUTPUT_DIR, destName);
    process.stdout.write(` downloading…`);
    await downloadFile(pick.url, destPath);

    manifest[slot.key] = {
      src: `/images/unsplash/${destName}`,
      alt: pick.altDescription,
      credit: {
        name: pick.photographer.name,
        url: pick.photographer.url,
        photoUrl: pick.photoPage,
      },
      width: pick.width,
      height: pick.height,
    };

    console.log(` ✓  (by ${pick.photographer.name})`);
  } catch (e) {
    console.log(` ✗ ${e.message}`);
    errors.push(slot.key);
  }
}

// ─── Write TypeScript manifest ───────────────────────────────────────────────

const ts = `/**
 * Auto-generated by scripts/fetch_unsplash.mjs
 * Do not edit manually — re-run the script to refresh images.
 *
 * Attribution: Unsplash License — free to use, credit appreciated.
 * Per Unsplash guidelines: "Photo by [name] on Unsplash" in alt / caption.
 */

export type UnsplashImage = {
  src: string;
  alt: string;
  credit: { name: string; url: string; photoUrl: string };
  width: number;
  height: number;
};

export const unsplashImages = ${JSON.stringify(manifest, null, 2)} as const satisfies Record<string, UnsplashImage>;

export type ImageKey = keyof typeof unsplashImages;
`;

fs.writeFileSync(MANIFEST_PATH, ts, "utf8");

console.log(`\nManifest written → ${MANIFEST_PATH}`);
if (errors.length) console.warn(`\n⚠ Failed slots: ${errors.join(", ")}`);
console.log(`\nDone — ${Object.keys(manifest).length}/${SLOTS.length} images ready.`);
