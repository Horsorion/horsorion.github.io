import type { Locale } from "./i18n";

const SITE = "https://www.horsorion.com";
const ORG_ID = `${SITE}/#organization`;
const SITE_ID = `${SITE}/#website`;

/* ─────────────────────────────────────────────────────────────────────────
   Organization — single canonical Organization node, referenced by @id.
   ───────────────────────────────────────────────────────────────────────── */
export function getOrganizationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Horsorion",
    legalName: "Horsorion",
    url: SITE,
    logo: {
      "@type": "ImageObject",
      url: `${SITE}/images/brand/Horsorion_favicon.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE}/images/og.png`,
    email: "horsorion@gmail.com",
    description:
      locale === "en"
        ? "Hong Kong horse racing data infrastructure for professional syndicates, quantitative teams, and racing analytics groups. Coverage from 1980 to today."
        : "為 syndicate、量化團隊及賽馬分析機構提供香港賽馬數據基礎設施，涵蓋 1980 年至今的賽事與場外數據。",
    foundingDate: "2015",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "HK",
        addressRegion: "Hong Kong",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "HK",
      addressRegion: "Hong Kong SAR",
    },
    areaServed: [
      { "@type": "Place", name: "Asia-Pacific" },
      { "@type": "Place", name: "Europe" },
      { "@type": "Place", name: "Americas" },
    ],
    knowsAbout: [
      "Hong Kong horse racing",
      "Hong Kong Jockey Club",
      "Sha Tin Racecourse",
      "Happy Valley Racecourse",
      "Sectional timing",
      "Point-in-time data",
      "Quantitative betting models",
      "Horse racing analytics",
      "Tote pool data",
      "Racecard data",
    ],
    knowsLanguage: ["en", "zh-Hant"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "horsorion@gmail.com",
        telephone: "+852-9600-5554",
        availableLanguage: ["English", "Cantonese", "Mandarin"],
        areaServed: "Worldwide",
      },
    ],
    sameAs: ["https://www.linkedin.com/company/horsorion"],
  };
}

/* ─────────────────────────────────────────────────────────────────────────
   WebSite — gives Google a SearchAction sitelinks search box opportunity.
   ───────────────────────────────────────────────────────────────────────── */
export function getWebSiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE,
    name: "Horsorion",
    inLanguage: locale === "en" ? "en" : "zh-Hant-HK",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/* ─────────────────────────────────────────────────────────────────────────
   Product — high-level product card for the home page.
   ───────────────────────────────────────────────────────────────────────── */
export function getProductSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name:
      locale === "en"
        ? "Horsorion Hong Kong Horse Racing Data"
        : "Horsorion 香港賽馬數據平台",
    brand: { "@id": ORG_ID },
    category: "B2B Data Infrastructure",
    description:
      locale === "en"
        ? "Hong Kong horse racing datasets — pre-race, post-race, horse profiles, sectional timing, and tote-pool odds — delivered as historical bulk files, REST API (waitlist), or custom feeds."
        : "香港賽馬數據集 — 賽前、賽後、馬匹基礎、分段時間與彩池賠率 — 以歷史批量、REST API（waitlist）或自訂 feed 交付。",
    image: `${SITE}/images/og.png`,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "HKD",
        description:
          locale === "en"
            ? "Contact for pricing — customised by dataset scope and delivery method."
            : "報價需聯絡 — 按數據範圍與交付方式客製。",
      },
      url: `${SITE}/contact`,
      seller: { "@id": ORG_ID },
    },
  };
}

/* ─────────────────────────────────────────────────────────────────────────
   Service — what we sell, machine-readable.
   ───────────────────────────────────────────────────────────────────────── */
export function getServiceSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType:
      locale === "en"
        ? "Hong Kong horse racing data infrastructure"
        : "香港賽馬數據基礎設施",
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Place", name: "Worldwide" },
    audience: {
      "@type": "BusinessAudience",
      audienceType:
        locale === "en"
          ? "Horse racing syndicates, quantitative trading teams, market-making desks, racing analytics groups, AI / SaaS product teams"
          : "賽馬 syndicate、量化團隊、莊家做市組、賽馬分析公司、AI / SaaS 產品團隊",
    },
    description:
      locale === "en"
        ? "Cleaned, point-in-time Hong Kong racing datasets covering 1980 to today, delivered as historical CSV / Parquet, REST API (waitlist), or custom feeds."
        : "經清洗、point-in-time 處理嘅香港賽馬歷史數據（1980 至今），以歷史 CSV / Parquet、REST API（waitlist）或自訂 feed 交付。",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `${SITE}/contact`,
    },
  };
}

/* ─────────────────────────────────────────────────────────────────────────
   Dataset — single most important schema for AEO + Google Dataset Search.
   ───────────────────────────────────────────────────────────────────────── */
export type DatasetOpts = {
  name: string;
  description: string;
  url: string;
  keywords?: string[];
  /** ISO date or year e.g. "1980" */
  temporalStart?: string;
  /** ISO date or year e.g. "2026" — leave empty for "ongoing" */
  temporalEnd?: string;
  /** Sample download URL if any */
  sampleUrl?: string;
  /** Variable names exposed publicly */
  variableMeasured?: string[];
  /** "free" | "contact" */
  accessMode?: "free" | "contact";
};

export function getDatasetSchema(locale: Locale, opts: DatasetOpts) {
  const temporal =
    opts.temporalStart && opts.temporalEnd
      ? `${opts.temporalStart}/${opts.temporalEnd}`
      : opts.temporalStart
        ? `${opts.temporalStart}/..`
        : undefined;

  const distribution = opts.sampleUrl
    ? [
        {
          "@type": "DataDownload",
          encodingFormat: "text/csv",
          contentUrl: opts.sampleUrl,
        },
      ]
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    inLanguage: locale === "en" ? "en" : "zh-Hant-HK",
    isAccessibleForFree: opts.accessMode === "free",
    license: "https://www.horsorion.com/legal",
    creator: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    spatialCoverage: {
      "@type": "Place",
      name: "Hong Kong",
      geo: { "@type": "GeoCoordinates", latitude: 22.3193, longitude: 114.1694 },
    },
    ...(temporal ? { temporalCoverage: temporal } : {}),
    ...(opts.keywords?.length ? { keywords: opts.keywords.join(", ") } : {}),
    ...(opts.variableMeasured?.length
      ? { variableMeasured: opts.variableMeasured }
      : {}),
    ...(distribution ? { distribution } : {}),
  };
}

/* ─────────────────────────────────────────────────────────────────────────
   BreadcrumbList — auto-derivable from the path; helper provided.
   ───────────────────────────────────────────────────────────────────────── */
export type Crumb = { name: string; url: string };

export function getBreadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

/* ─────────────────────────────────────────────────────────────────────────
   DefinedTermSet — for /glossary; helps LLMs cite term definitions.
   ───────────────────────────────────────────────────────────────────────── */
export type GlossaryTerm = { term: string; definition: string };

export function getDefinedTermSetSchema(
  locale: Locale,
  name: string,
  url: string,
  terms: GlossaryTerm[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name,
    url,
    inLanguage: locale === "en" ? "en" : "zh-Hant-HK",
    publisher: { "@id": ORG_ID },
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
      inDefinedTermSet: url,
    })),
  };
}

/* ─────────────────────────────────────────────────────────────────────────
   Place — for racecourse pages (Sha Tin, Happy Valley).
   ───────────────────────────────────────────────────────────────────────── */
export type PlaceOpts = {
  name: string;
  description: string;
  url: string;
  latitude: number;
  longitude: number;
  addressLocality: string;
};

export function getPlaceSchema(opts: PlaceOpts) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    geo: {
      "@type": "GeoCoordinates",
      latitude: opts.latitude,
      longitude: opts.longitude,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "HK",
      addressLocality: opts.addressLocality,
    },
  };
}

/* ─────────────────────────────────────────────────────────────────────────
   TechArticle — for methodology pages.
   ───────────────────────────────────────────────────────────────────────── */
export type ArticleOpts = {
  headline: string;
  description: string;
  url: string;
  about?: string[];
};

export function getTechArticleSchema(locale: Locale, opts: ArticleOpts) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    inLanguage: locale === "en" ? "en" : "zh-Hant-HK",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    image: `${SITE}/images/og.png`,
    ...(opts.about?.length
      ? { about: opts.about.map((name) => ({ "@type": "Thing", name })) }
      : {}),
  };
}

/* ─────────────────────────────────────────────────────────────────────────
   FAQPage — keep helper consistent with existing usage.
   ───────────────────────────────────────────────────────────────────────── */
export type FaqEntry = { question: string; answer: string };

export function getFaqSchema(faq: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}
