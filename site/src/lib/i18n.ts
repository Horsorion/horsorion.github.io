export type Locale = "zh-Hant" | "en";

export const locales: Locale[] = ["zh-Hant", "en"];

export type LeadIntent =
  | "request-info"
  | "request-dictionary"
  | "request-sample"
  | "talk-to-us"
  | "api-waitlist";

export type NavItem = {
  href: string;
  label: string;
};

export type SiteCopy = {
  locale: Locale;
  langTag: string;
  siteName: string;
  titleSuffix: string;
  nav: NavItem[];
  cta: {
    requestInfo: string;
    whatsapp: string;
    talkOnWhatsapp: string;
  };
  footer: {
    tagline: string;
    contactHeading: string;
    legal: string;
    nda: string;
    github: string;
  };
  contact: {
    email: string;
    whatsapp: string;
    telegram: string;
    officeHours: string;
    responseTime: string;
  };
  leadForm: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    company: string;
    role: string;
    syndicateSize: string;
    datasets: string;
    delivery: string;
    message: string;
    submit: string;
    success: string;
    error: string;
    intentLabels: Record<LeadIntent, string>;
    syndicateSizes: string[];
    deliveryOptions: string[];
    datasetOptions: string[];
  };
};

const zhHant: SiteCopy = {
  locale: "zh-Hant",
  langTag: "zh-Hant-HK",
  siteName: "Horsorion",
  titleSuffix: "香港賽馬 B2B 數據供應商",
  nav: [
    { href: "/", label: "主頁" },
    { href: "/data", label: "數據目錄" },
    { href: "/solutions", label: "解決方案" },
    { href: "/why", label: "為何選擇我們" },
    { href: "/about", label: "關於" },
    { href: "/resources", label: "資源" },
    { href: "/contact", label: "聯絡" },
  ],
  cta: {
    requestInfo: "索取資料",
    whatsapp: "WhatsApp 聯絡",
    talkOnWhatsapp: "WhatsApp 洽談",
  },
  footer: {
    tagline: "以數據基礎設施支援香港賽馬專業團隊",
    contactHeading: "聯絡查詢",
    legal: "版權所有",
    nda: "可提供 NDA 及合約",
    github: "GitHub",
  },
  contact: {
    email: "horsorion@gmail.com",
    whatsapp: "+852 96005554",
    telegram: "Horsorion",
    officeHours: "辦公時間：週一至週五 10:00–18:00（香港時間）",
    responseTime: "一般於 1 個工作天內回覆",
  },
  leadForm: {
    title: "索取資料",
    subtitle: "留下聯絡方式，我們會以電郵或 WhatsApp 跟進並提供相應資料。",
    name: "姓名",
    email: "電郵",
    company: "公司 / 團隊",
    role: "職位",
    syndicateSize: "團隊規模",
    datasets: "感興趣的數據類別",
    delivery: "交付偏好",
    message: "需求說明",
    submit: "提交查詢",
    success: "已收到查詢，我們會盡快聯絡你。",
    error: "提交失敗，請稍後再試或直接以 WhatsApp 聯絡。",
    intentLabels: {
      "request-info": "索取資料",
      "request-dictionary": "索取數據字典",
      "request-sample": "索取樣本數據",
      "talk-to-us": "與我們洽談",
      "api-waitlist": "加入 API Waitlist",
    },
    syndicateSizes: ["1-3 人", "4-10 人", "11-30 人", "30 人以上"],
    deliveryOptions: ["歷史批量檔案", "API", "自訂 feed", "尚未確定"],
    datasetOptions: [
      "賽事資料",
      "馬匹資料",
      "過往成績",
      "排位表",
      "分段排名",
      "獸醫報告",
      "天氣狀況",
      "彩池賠率",
      "試閘評語",
      "賽事影片",
      "自訂數據",
    ],
  },
};

const en: SiteCopy = {
  locale: "en",
  langTag: "en",
  siteName: "Horsorion",
  titleSuffix: "Hong Kong Horse Racing B2B Data Provider",
  nav: [
    { href: "/en", label: "Home" },
    { href: "/en/data", label: "Data Catalogue" },
    { href: "/en/solutions", label: "Solutions" },
    { href: "/en/why", label: "Why Horsorion" },
    { href: "/en/about", label: "About" },
    { href: "/en/resources", label: "Resources" },
    { href: "/en/contact", label: "Contact" },
  ],
  cta: {
    requestInfo: "Request Info",
    whatsapp: "WhatsApp",
    talkOnWhatsapp: "Talk on WhatsApp",
  },
  footer: {
    tagline: "Data infrastructure for professional Hong Kong racing teams",
    contactHeading: "Contact",
    legal: "All rights reserved",
    nda: "NDA and contracts available",
    github: "GitHub",
  },
  contact: {
    email: "horsorion@gmail.com",
    whatsapp: "+852 96005554",
    telegram: "Horsorion",
    officeHours: "Office hours: Mon–Fri 10:00–18:00 (HKT)",
    responseTime: "Typical response within 1 business day",
  },
  leadForm: {
    title: "Request Info",
    subtitle: "Leave your details and we will follow up by email or WhatsApp with the right materials.",
    name: "Name",
    email: "Email",
    company: "Company / Team",
    role: "Role",
    syndicateSize: "Team size",
    datasets: "Datasets of interest",
    delivery: "Delivery preference",
    message: "Requirements",
    submit: "Submit enquiry",
    success: "Thanks — we received your enquiry and will be in touch shortly.",
    error: "Submission failed. Please try again or contact us on WhatsApp.",
    intentLabels: {
      "request-info": "Request info",
      "request-dictionary": "Request data dictionary",
      "request-sample": "Request sample data",
      "talk-to-us": "Talk to us",
      "api-waitlist": "Join API waitlist",
    },
    syndicateSizes: ["1-3 people", "4-10 people", "11-30 people", "30+ people"],
    deliveryOptions: ["Historical bulk files", "API", "Custom feed", "Not sure yet"],
    datasetOptions: [
      "Race data",
      "Horse profiles",
      "Past performance",
      "Racecards",
      "Sectionals",
      "Veterinary reports",
      "Weather",
      "Tote pools",
      "Trial commentary",
      "Race video",
      "Custom data",
    ],
  },
};

const copyByLocale: Record<Locale, SiteCopy> = {
  "zh-Hant": zhHant,
  en,
};

export function getCopy(locale: Locale): SiteCopy {
  return copyByLocale[locale];
}

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "zh-Hant";
}

export function localizePath(pathname: string, locale: Locale): string {
  const normalized = pathname.replace(/\/$/, "") || "/";
  const withoutLocale =
    normalized === "/en"
      ? "/"
      : normalized.startsWith("/en/")
        ? normalized.slice(3) || "/"
        : normalized;

  if (locale === "en") {
    return withoutLocale === "/" ? "/en" : `/en${withoutLocale}`;
  }

  return withoutLocale === "/" ? "/" : withoutLocale;
}

export function switchLocalePath(pathname: string, target: Locale): string {
  return localizePath(pathname, target);
}
