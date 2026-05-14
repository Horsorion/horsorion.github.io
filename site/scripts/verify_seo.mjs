import fs from "node:fs";
import path from "node:path";

const ROOT = "dist";

const pages = [
  "index.html",
  "coverage/index.html",
  "open-data/index.html",
  "glossary/index.html",
  "data/index.html",
  "why/index.html",
  "about/index.html",
  "courses/sha-tin/index.html",
  "courses/happy-valley/index.html",
  "methodology/sectional-timing/index.html",
  "methodology/point-in-time/index.html",
  "en/index.html",
  "en/coverage/index.html",
  "en/glossary/index.html",
  "en/about/index.html",
];

let ok = 0;
let fail = 0;

for (const p of pages) {
  const file = path.join(ROOT, p);
  if (!fs.existsSync(file)) {
    console.log(`MISSING ${p}`);
    fail++;
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  const ldRe = /<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g;
  const blocks = [];
  let m;
  while ((m = ldRe.exec(html))) {
    try {
      blocks.push(JSON.parse(m[1]));
    } catch {
      blocks.push({ "@type": "PARSE_ERROR" });
    }
  }
  const types = blocks.map((b) => b["@type"]);
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  const hreflang = (html.match(/hreflang="[^"]+"/g) || []).length;
  console.log("─".repeat(70));
  console.log(`PAGE  ${p}`);
  console.log(`title ${titleMatch?.[1]?.slice(0, 90) ?? "—"}`);
  console.log(`desc  ${descMatch?.[1]?.slice(0, 90) ?? "—"}…`);
  console.log(`url   ${canonical?.[1] ?? "—"}`);
  console.log(`json  ${types.join(" + ") || "—"}  (${blocks.length} blocks)`);
  console.log(`href  ${hreflang} hreflang tags`);
  if (blocks.length >= 2 && titleMatch && descMatch && canonical) ok++;
  else fail++;
}

console.log("=".repeat(70));
console.log(`PASS ${ok}/${pages.length}, FAIL ${fail}/${pages.length}`);
process.exit(fail > 0 ? 1 : 0);
