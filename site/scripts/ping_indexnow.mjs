#!/usr/bin/env node
/**
 * Notify IndexNow-compatible search engines (Bing, Yandex, Naver, Seznam,
 * Yep, etc.) that the Horsorion sitemap has changed.
 *
 * Run after every successful production deploy:
 *
 *   node scripts/ping_indexnow.mjs
 *
 * The IndexNow key is published at /<key>.txt so receiving search engines
 * can verify ownership.
 *
 * Spec: https://www.indexnow.org/documentation
 */

const HOST = "www.horsorion.com";
const KEY  = "ef72e618679fee6ea1f4bf42c36f3b2e";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URLS = [
  `https://${HOST}/`,
  `https://${HOST}/data`,
  `https://${HOST}/coverage`,
  `https://${HOST}/open-data`,
  `https://${HOST}/glossary`,
  `https://${HOST}/solutions`,
  `https://${HOST}/why`,
  `https://${HOST}/about`,
  `https://${HOST}/resources`,
  `https://${HOST}/legal`,
  `https://${HOST}/contact`,
  `https://${HOST}/courses/sha-tin`,
  `https://${HOST}/courses/happy-valley`,
  `https://${HOST}/methodology/sectional-timing`,
  `https://${HOST}/methodology/point-in-time`,
  // English alternates
  `https://${HOST}/en`,
  `https://${HOST}/en/data`,
  `https://${HOST}/en/coverage`,
  `https://${HOST}/en/open-data`,
  `https://${HOST}/en/glossary`,
  `https://${HOST}/en/solutions`,
  `https://${HOST}/en/why`,
  `https://${HOST}/en/about`,
  `https://${HOST}/en/resources`,
  `https://${HOST}/en/legal`,
  `https://${HOST}/en/contact`,
  `https://${HOST}/en/courses/sha-tin`,
  `https://${HOST}/en/courses/happy-valley`,
  `https://${HOST}/en/methodology/sectional-timing`,
  `https://${HOST}/en/methodology/point-in-time`,
];

const ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
];

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: URLS,
};

async function ping(endpoint) {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    console.log(`[indexnow] ${endpoint} → ${res.status} ${res.statusText}`);
  } catch (e) {
    console.error(`[indexnow] ${endpoint} → ERROR`, e?.message ?? e);
  }
}

await Promise.all(ENDPOINTS.map(ping));
console.log(`[indexnow] submitted ${URLS.length} URLs.`);
