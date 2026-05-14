import type { Locale } from "./i18n";

export type TrustCounter = {
  value: string;
  label: string;
};

export type DatasetCategory = {
  name: string;
  description: string;
};

export type TierPlan = {
  id: "standard" | "professional" | "custom";
  name: string;
  audience: string;
  datasetCount: string;
  datasets: string[];
  history: string;
  highlights: string[];
};

export type Persona = {
  title: string;
  datasets: string[];
  delivery: string;
  signals: string;
  outcome: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Milestone = {
  year: string;
  title: string;
  description: string;
};

export type HomeContent = {
  metaDescription: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  counters: TrustCounter[];
  pillars: { title: string; description: string }[];
  categoriesHeading: string;
  categoriesSubheading: string;
  categories: DatasetCategory[];
  useCasesHeading: string;
  useCases: { title: string; quote: string }[];
  methodologyHeading: string;
  methodology: { title: string; description: string }[];
  finalCta: { title: string; description: string; button: string };
};

export type DataPageContent = {
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  tiers: TierPlan[];
  pricingNote: string;
};

export type SolutionsPageContent = {
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  personas: Persona[];
};

export type WhyPageContent = {
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  coverageTitle: string;
  coverageDescription: string;
  methodologyTitle: string;
  methodology: { title: string; description: string }[];
  hkAdvantageTitle: string;
  hkAdvantage: string[];
  complianceTitle: string;
  compliance: string[];
  faqTitle: string;
  faq: FaqItem[];
};

export type AboutPageContent = {
  metaDescription: string;
  heroTitle: string;
  intro: string;
  quote: string;
  credentialsTitle: string;
  credentials: string[];
  milestonesTitle: string;
  milestones: Milestone[];
  location: string;
};

export type ContactPageContent = {
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  channelsTitle: string;
};

const homeZh: HomeContent = {
  metaDescription:
    "Horsorion 為香港賽馬 syndicate、量化團隊及專業分析機構提供自 1980 年起的賽馬數據基礎設施。",
  hero: {
    eyebrow: "B2B 賽馬數據供應商",
    title: "香港最完整的賽馬數據基礎設施，專為專業團隊而建",
    subtitle:
      "覆蓋沙田與跑馬地、四十多年歷史賽事與場外數據，支援模型研發、盤口分析與營運決策。",
    primaryCta: "索取資料",
    secondaryCta: "WhatsApp 洽談",
  },
  counters: [
    { value: "40+", label: "年歷史覆蓋" },
    { value: "30K+", label: "場賽事紀錄" },
    { value: "16K+", label: "馬匹追蹤" },
    { value: "8M+", label: "結構化數據紀錄" },
  ],
  pillars: [
    {
      title: "覆蓋完整",
      description: "賽事、馬匹、分段、排位、獸醫、天氣與彩池等核心類別，支援多策略研究。",
    },
    {
      title: "品質嚴謹",
      description: "多來源交叉驗證、point-in-time 原則與賽後 QC，降低回測與實盤偏差。",
    },
    {
      title: "交付彈性",
      description: "歷史批量、API 與自訂 feed 可按團隊架構配置，方便接入既有流程。",
    },
  ],
  categoriesHeading: "數據類別",
  categoriesSubheading: "公開展示類別與用途；完整 schema、樣本與定價需經聯絡後提供。",
  categories: [
    { name: "賽事資料", description: "場次、路程、班次、場地與賽事層級資訊。" },
    { name: "馬匹資料", description: "血統、進口類別、馬主與基本識別欄位。" },
    { name: "過往成績", description: "名次、時間、負磅、騎練與賠率等結果欄位。" },
    { name: "排位表", description: "賽前排位、近況、評分變動與優先次序。" },
    { name: "分段排名", description: "分段位置、距離與時間，支援配速研究。" },
    { name: "獸醫報告", description: "傷患、檢查與放行紀錄，輔助風險評估。" },
    { name: "天氣狀況", description: "賽日氣象與場地相關環境指標。" },
    { name: "彩池賠率", description: "歷史賠率與盤口相關數據，按需求定製。" },
    { name: "試閘評語", description: "試閘文字紀錄，支援 NLP 與狀態判斷。" },
    { name: "賽事影片", description: "歷史賽事影片資產，按合約範圍提供。" },
    { name: "自訂信號", description: "按客戶需求定製衍生欄位與專屬 feed。" },
  ],
  useCasesHeading: "專業團隊使用情境",
  useCases: [
    {
      title: "量化 ML Syndicate",
      quote: "以歷史分段與排位資料建立特徵庫，縮短由研究到實盤部署的週期。",
    },
    {
      title: "盤口做市團隊",
      quote: "需要穩定更新的賽前與賽後數據，以支援盤口定價與風險監控。",
    },
    {
      title: "賽日分析團隊",
      quote: "在單一數據供應商下整合獸醫、天氣與賽果，減少多源對齊成本。",
    },
  ],
  methodologyHeading: "數據處理流程",
  methodology: [
    { title: "來源整合", description: "整合官方與補充來源，建立統一賽事主鍵。" },
    { title: "交叉驗證", description: "多來源比對與異常檢查，降低缺漏與錯位。" },
    { title: "Point-in-time 儲存", description: "保留賽前可見狀態，避免回測前視偏差。" },
    { title: "每日 QC", description: "賽後核對與修正流程，維持交付一致性。" },
    { title: "交付接入", description: "按客戶需求輸出批量、API 或自訂 feed。" },
  ],
  finalCta: {
    title: "準備評估 Horsorion？",
    description: "留下聯絡方式，我們會按你的團隊需求安排數據字典、樣本與接入說明。",
    button: "索取資料",
  },
};

const homeEn: HomeContent = {
  metaDescription:
    "Horsorion provides Hong Kong horse racing data infrastructure for syndicates, quant teams, and professional analytics groups since 1980.",
  hero: {
    eyebrow: "B2B racing data provider",
    title: "Hong Kong's deepest racing dataset, engineered for professional teams",
    subtitle:
      "Sha Tin and Happy Valley coverage with decades of race and off-track data for modelling, market analysis, and operations.",
    primaryCta: "Request Info",
    secondaryCta: "Talk on WhatsApp",
  },
  counters: [
    { value: "40+", label: "Years of history" },
    { value: "30K+", label: "Races recorded" },
    { value: "16K+", label: "Horses tracked" },
    { value: "8M+", label: "Structured records" },
  ],
  pillars: [
    {
      title: "Broad coverage",
      description: "Core categories across races, horses, sectionals, racecards, vet, weather, and pools.",
    },
    {
      title: "Rigorous quality",
      description: "Cross-source validation, point-in-time discipline, and post-race QC reduce research drift.",
    },
    {
      title: "Flexible delivery",
      description: "Historical bulk files, API access, and custom feeds aligned to your stack.",
    },
  ],
  categoriesHeading: "Dataset categories",
  categoriesSubheading: "Public category overview only. Full schemas, samples, and pricing are shared after contact.",
  categories: [
    { name: "Race data", description: "Race date, venue, distance, class, and race-level metadata." },
    { name: "Horse profiles", description: "Pedigree, import type, ownership, and stable identifiers." },
    { name: "Past performance", description: "Finishing position, time, weight, connections, and closing odds." },
    { name: "Racecards", description: "Pre-race fields, recent form, rating moves, and priority signals." },
    { name: "Sectionals", description: "Sectional positions, margins, and timings for pace research." },
    { name: "Veterinary reports", description: "Injury, inspection, and clearance records for risk review." },
    { name: "Weather", description: "Race-day weather and related environmental indicators." },
    { name: "Tote pools", description: "Historical pool and odds-related data available on request." },
    { name: "Trial commentary", description: "Barrier trial text records for NLP and fitness workflows." },
    { name: "Race video", description: "Historical race video assets delivered under contract scope." },
    { name: "Custom signals", description: "Client-specific derived fields and dedicated feeds." },
    { name: "Custom data", description: "Bespoke datasets shaped around your modelling pipeline." },
  ],
  useCasesHeading: "How professional teams use Horsorion",
  useCases: [
    {
      title: "Quant ML syndicate",
      quote: "Build feature stores from historical sectionals and racecards to shorten research-to-production cycles.",
    },
    {
      title: "Market-making desk",
      quote: "Needs dependable pre-race and post-race feeds for pricing models and risk monitoring.",
    },
    {
      title: "Race-day analysts",
      quote: "Consolidates vet, weather, and results data under one vendor to cut reconciliation overhead.",
    },
  ],
  methodologyHeading: "Data processing workflow",
  methodology: [
    { title: "Source integration", description: "Combine official and supplemental sources under one race key." },
    { title: "Cross-validation", description: "Multi-source checks and anomaly review reduce gaps and misalignment." },
    { title: "Point-in-time storage", description: "Preserve pre-race visibility to avoid look-ahead bias in backtests." },
    { title: "Daily QC", description: "Post-race reconciliation keeps delivered datasets consistent." },
    { title: "Delivery", description: "Ship bulk files, API access, or custom feeds to match client workflows." },
  ],
  finalCta: {
    title: "Ready to evaluate Horsorion?",
    description: "Share your requirements and we will arrange the right dictionary, samples, and onboarding path.",
    button: "Request Info",
  },
};

const dataZh: DataPageContent = {
  metaDescription: "Horsorion 數據目錄：賽前、賽後、馬匹基礎與賠率四大類別，涵蓋香港賽馬深度數據。",
  heroTitle: "數據目錄",
  heroSubtitle: "賽前、賽後、馬匹基礎及賠率四大類別，30+ 個數據產品。完整字典與樣本需經聯絡後提供。",
  pricingNote: "定價按團隊需求、數據範圍與交付方式客製，請聯絡我們取得報價。",
  tiers: [
    {
      id: "standard",
      name: "標準版",
      audience: "建立基礎研究與內部報表的小型團隊",
      datasetCount: "3 個核心數據集",
      datasets: ["賽事資料", "馬匹過往成績", "馬匹資料"],
      history: "1980 年至今",
      highlights: ["賽事數據", "數據修正", "歷史批量交付"],
    },
    {
      id: "professional",
      name: "專業版",
      audience: "需要場外與賽前訊號的量化與分析團隊",
      datasetCount: "7 個數據集",
      datasets: [
        "賽事資料",
        "馬匹過往成績",
        "馬匹資料",
        "排位表",
        "賽事分段排名",
        "獸醫報告",
        "天氣狀況",
      ],
      history: "1980 年至今",
      highlights: ["場外數據", "賽前訊號", "研究級覆蓋"],
    },
    {
      id: "custom",
      name: "定製版",
      audience: "需要專屬 feed、賠率、文字/影片或衍生信號的機構客戶",
      datasetCount: "按需求配置",
      datasets: ["專業版全部類別", "彩池賠率", "試閘評語", "賽事影片", "自訂數據項目"],
      history: "可按項目延伸",
      highlights: ["專業諮詢", "自訂交付", "合約與 NDA 支援"],
    },
  ],
};

const dataEn: DataPageContent = {
  metaDescription: "Horsorion data catalogue: Pre-Race, Post-Race, General, and Odds products covering decades of Hong Kong horse-racing data.",
  heroTitle: "Data Catalogue",
  heroSubtitle: "Pre-Race, Post-Race, General, and Odds — 30+ products spanning the full HK racing data stack. Full dictionaries and samples shared after contact.",
  pricingNote: "Pricing is tailored to scope, delivery, and team requirements. Contact us for a quote.",
  tiers: [
    {
      id: "standard",
      name: "Standard",
      audience: "Smaller teams building foundational research and internal reporting",
      datasetCount: "3 core datasets",
      datasets: ["Race data", "Past performance", "Horse profiles"],
      history: "Since 1980",
      highlights: ["Core race data", "Corrections included", "Historical bulk delivery"],
    },
    {
      id: "professional",
      name: "Professional",
      audience: "Quant and analytics teams needing off-track and pre-race signals",
      datasetCount: "7 datasets",
      datasets: [
        "Race data",
        "Past performance",
        "Horse profiles",
        "Racecards",
        "Sectionals",
        "Veterinary reports",
        "Weather",
      ],
      history: "Since 1980",
      highlights: ["Off-track data", "Pre-race signals", "Research-grade coverage"],
    },
    {
      id: "custom",
      name: "Custom",
      audience: "Institutional clients needing dedicated feeds, pools, media, or derived signals",
      datasetCount: "Configured per project",
      datasets: [
        "All Professional categories",
        "Tote pools",
        "Trial commentary",
        "Race video",
        "Custom data projects",
      ],
      history: "Extendable by project",
      highlights: ["Advisory support", "Custom delivery", "Contract and NDA support"],
    },
  ],
};

const solutionsZh: SolutionsPageContent = {
  metaDescription: "面向 syndicate、量化基金、賽日分析與 AI 產品團隊的 Horsorion 解決方案。",
  heroTitle: "解決方案",
  heroSubtitle: "按專業團隊型態說明常用數據組合、交付方式與關鍵訊號。",
  personas: [
    {
      title: "量化 ML Syndicate",
      datasets: ["分段排名", "排位表", "過往成績", "天氣狀況"],
      delivery: "歷史 Parquet/CSV + 按需 API",
      signals: "配速、評分變動、場地與路程適性",
      outcome: "縮短特徵工程與回測驗證週期，集中於模型迭代。",
    },
    {
      title: "盤口做市團隊",
      datasets: ["排位表", "彩池賠率", "賽事資料", "過往成績"],
      delivery: "賽前更新 feed + 歷史盤口庫",
      signals: "賽前欄位完整性、賠率結構、馬匹狀態變化",
      outcome: "降低多源對齊成本，提升盤口模型穩定性。",
    },
    {
      title: "賽日分析團隊",
      datasets: ["獸醫報告", "天氣狀況", "排位表", "賽事分段排名"],
      delivery: "批量歷史 + 賽後更新",
      signals: "傷患風險、場地狀態、分段走勢",
      outcome: "在單一供應商下完成賽前到賽後分析閉環。",
    },
    {
      title: "AI / SaaS 建設者",
      datasets: ["馬匹資料", "試閘評語", "賽事影片", "自訂數據項目"],
      delivery: "自訂 schema + 專屬 feed",
      signals: "多模態輸入、產品化欄位、客戶專屬衍生信號",
      outcome: "以可擴展數據層支撐產品功能，而非一次性專案交付。",
    },
  ],
};

const solutionsEn: SolutionsPageContent = {
  metaDescription: "Horsorion solutions for syndicates, quant funds, race-day analysts, and AI product teams.",
  heroTitle: "Solutions for Syndicates",
  heroSubtitle: "Persona-led guidance on dataset combinations, delivery patterns, and the signals that matter.",
  personas: [
    {
      title: "Quant ML syndicate",
      datasets: ["Sectionals", "Racecards", "Past performance", "Weather"],
      delivery: "Historical Parquet/CSV plus API on request",
      signals: "Pace profiles, rating moves, course and distance suitability",
      outcome: "Shorten feature engineering and backtest validation cycles.",
    },
    {
      title: "Market-making desk",
      datasets: ["Racecards", "Tote pools", "Race data", "Past performance"],
      delivery: "Pre-race feed plus historical pool archive",
      signals: "Field completeness, pool structure, fitness changes",
      outcome: "Reduce reconciliation overhead and stabilise pricing workflows.",
    },
    {
      title: "Race-day analysts",
      datasets: ["Veterinary reports", "Weather", "Racecards", "Sectionals"],
      delivery: "Historical bulk plus post-race refresh",
      signals: "Injury risk, track conditions, sectional trends",
      outcome: "Close the loop from pre-race review to post-race analysis under one vendor.",
    },
    {
      title: "AI / SaaS builder",
      datasets: ["Horse profiles", "Trial commentary", "Race video", "Custom data projects"],
      delivery: "Custom schema and dedicated feed",
      signals: "Multimodal inputs, productised fields, client-specific derived signals",
      outcome: "Build on a scalable data layer instead of one-off project drops.",
    },
  ],
};

const whyZh: WhyPageContent = {
  metaDescription: "了解 Horsorion 的覆蓋深度、品質方法、本地優勢與合規安排。",
  heroTitle: "為何選擇 Horsorion",
  heroSubtitle: "以可審計的數據流程與香港本地賽馬經驗，支援專業團隊決策。",
  coverageTitle: "覆蓋深度",
  coverageDescription: "自 1980 年起持續累積香港賽馬數據，覆蓋沙田與跑馬地賽事與相關場外資料。",
  methodologyTitle: "品質方法",
  methodology: [
    { title: "多來源核對", description: "以賽事主鍵對齊不同來源，降低缺漏與錯位。" },
    { title: "Point-in-time 原則", description: "保留賽前可見狀態，避免回測前視。" },
    { title: "賽後修正流程", description: "官方更正與內部 QC 同步更新交付版本。" },
    { title: "交付可追溯", description: "按客戶需求提供版本說明與變更紀錄。" },
  ],
  hkAdvantageTitle: "香港本地優勢",
  hkAdvantage: [
    "熟悉 HKJC 賽事結構、班次與場地特性",
    "以香港時間與賽馬日節奏安排支援與交付",
    "理解本地團隊對數據時效與欄位完整性的要求",
  ],
  complianceTitle: "合規與商業安排",
  compliance: [
    "可按需要安排 NDA 與合約",
    "數據使用範圍與再分發條款於合約內列明",
    "客製項目與敏感資料僅於 NDA 後披露",
  ],
  faqTitle: "常見問題",
  faq: [
    {
      question: "可以取得完整數據字典嗎？",
      answer: "可以。完整字典於聯絡並了解需求後提供，公開頁面僅展示類別層級資訊。",
    },
    {
      question: "是否提供樣本數據？",
      answer: "提供 — 完整一日 race-day CSV（含 watermark）可於 Resources 頁直接免費下載。更廣範圍樣本（多日、多賽季、客製欄位）於簽署互保 NDA 後提供。",
    },
    {
      question: "支援哪些交付格式？",
      answer: "歷史數據常見為 CSV / Parquet 批量；亦支援 SQL dump、Excel 及客製 feed。REST API 正在開發中 — 可於 Data 頁登記 waitlist。",
    },
    {
      question: "數據多久更新一次？",
      answer: "賽馬日數據按 HKJC 賽程更新（賽事結果及派彩為 T+0）；個別產品的 cadence 與 latency 於洽談時確認。",
    },
    {
      question: "能否定製欄位或衍生信號？",
      answer: "可以 — 支援專屬欄位、衍生信號及專屬交付流程。範圍與時程於方案階段商定。",
    },
    {
      question: "是否簽署 NDA？",
      answer: "可以。涉及客製資料、商業條款與敏感項目時建議先簽署 NDA。",
    },
    {
      question: "合約與數據使用權如何約定？",
      answer: "使用範圍、再分發限制與交付責任於合約內列明，按客戶類型調整。",
    },
    {
      question: "是否提供回測或績效數字？",
      answer: "公開網站不披露績效數字；相關材料僅於 NDA 後按個案討論。",
    },
  ],
};

const whyEn: WhyPageContent = {
  metaDescription: "Coverage depth, quality methodology, local advantage, and compliance posture for Horsorion.",
  heroTitle: "Why Horsorion",
  heroSubtitle: "Auditable data workflows and Hong Kong racing experience for professional teams.",
  coverageTitle: "Coverage depth",
  coverageDescription: "Hong Kong racing data accumulated since 1980 across Sha Tin and Happy Valley, plus related off-track categories.",
  methodologyTitle: "Quality methodology",
  methodology: [
    { title: "Multi-source reconciliation", description: "Align supplemental sources to a stable race key." },
    { title: "Point-in-time discipline", description: "Preserve pre-race visibility to avoid look-ahead bias." },
    { title: "Post-race corrections", description: "Official changes and internal QC feed delivered versions." },
    { title: "Traceable delivery", description: "Version notes and change logs available on request." },
  ],
  hkAdvantageTitle: "Hong Kong advantage",
  hkAdvantage: [
    "Deep familiarity with HKJC race structure, classes, and track characteristics",
    "Support and delivery cadence aligned to Hong Kong race nights",
    "Practical understanding of local teams' freshness and completeness requirements",
  ],
  complianceTitle: "Compliance and commercial terms",
  compliance: [
    "NDA and contracts available on request",
    "Usage scope and redistribution terms defined in the agreement",
    "Custom and sensitive materials disclosed only after NDA",
  ],
  faqTitle: "FAQ",
  faq: [
    {
      question: "Can we access the full data dictionary?",
      answer: "Yes. The full dictionary is shared after contact and scoping. Public pages show category-level information only.",
    },
    {
      question: "Do you provide sample data?",
      answer: "Yes — a full race-day CSV (watermarked) is available for free direct download. Broader sample scope (multi-day, multi-season, custom fields) is shared after mutual NDA.",
    },
    {
      question: "Which delivery formats are supported?",
      answer: "Historical CSV / Parquet bulk files are common. SQL dump, Excel, and custom feeds can be configured per project. A REST API is on our roadmap — join the waitlist on the data page.",
    },
    {
      question: "How often is the data refreshed?",
      answer: "Race-day datasets follow the HKJC meeting schedule (T+0 for results and dividends). Cadence and latency for each product are confirmed during scoping.",
    },
    {
      question: "Can you build custom fields or derived signals?",
      answer: "Yes — bespoke fields, derived signals, and dedicated delivery workflows are supported. Scope and timeline are agreed during the proposal stage.",
    },
    {
      question: "Do you sign NDAs?",
      answer: "Yes. NDAs are recommended for custom datasets, commercial terms, and sensitive projects.",
    },
    {
      question: "How are usage rights handled?",
      answer: "Usage scope, redistribution limits, and delivery responsibilities are defined in the contract.",
    },
    {
      question: "Do you publish backtest or performance numbers?",
      answer: "Performance numbers are not published on the public site and are discussed case by case under NDA.",
    },
  ],
};

const aboutZh: AboutPageContent = {
  metaDescription: "Horsorion 團隊以數據基礎設施支援香港賽馬專業團隊。",
  heroTitle: "關於 Horsorion",
  intro:
    "Horsorion 專注為 syndicate、量化團隊與賽馬分析機構提供香港賽馬數據基礎設施，協助團隊以系統化方法研究賽事。",
  quote:
    "We consider horse racing as a type of investment, not gambling. Similar to other investment products, we can calculate the potential of each horse winning the game.",
  credentialsTitle: "團隊能力",
  credentials: [
    "數據工程與賽馬資料治理",
    "量化建模與回測方法",
    "香港賽馬賽制與場地研究經驗",
    "客戶導入與自訂數據交付",
  ],
  milestonesTitle: "里程碑",
  milestones: [
    { year: "2020", title: "開始服務專業團隊", description: "建立香港賽馬歷史數據整理與交付流程。" },
    { year: "2022", title: "擴展專業版數據集", description: "加入排位、分段、獸醫與天氣等研究級類別。" },
    { year: "2024", title: "定製項目成熟", description: "支援彩池、文字、影片與專屬 feed 的機構客戶。" },
  ],
  location: "總部設於香港，以香港賽馬日節奏提供支援。",
};

const aboutEn: AboutPageContent = {
  metaDescription: "About Horsorion and the team behind Hong Kong racing data infrastructure.",
  heroTitle: "About Horsorion",
  intro:
    "Horsorion builds data infrastructure for syndicates, quant teams, and racing analytics groups working on Hong Kong racing.",
  quote:
    "We consider horse racing as a type of investment, not gambling. Similar to other investment products, we can calculate the potential of each horse winning the game.",
  credentialsTitle: "Team capabilities",
  credentials: [
    "Racing data engineering and governance",
    "Quant modelling and backtesting practice",
    "Hong Kong racing rules and track research",
    "Client onboarding and custom data delivery",
  ],
  milestonesTitle: "Milestones",
  milestones: [
    { year: "2020", title: "Serving professional teams", description: "Established historical HK racing data operations." },
    { year: "2022", title: "Expanded Professional datasets", description: "Added racecards, sectionals, vet, and weather categories." },
    { year: "2024", title: "Custom programmes matured", description: "Supported pools, text, video, and dedicated feeds for institutional clients." },
  ],
  location: "Headquartered in Hong Kong and aligned to local race-night operations.",
};

const contactZh: ContactPageContent = {
  metaDescription: "聯絡 Horsorion 索取數據字典、樣本與方案說明。",
  heroTitle: "聯絡我們",
  heroSubtitle: "留下查詢後，我們會以電郵或 WhatsApp 跟進。",
  channelsTitle: "其他聯絡方式",
};

const contactEn: ContactPageContent = {
  metaDescription: "Contact Horsorion for data dictionaries, samples, and onboarding.",
  heroTitle: "Contact",
  heroSubtitle: "Submit an enquiry and we will follow up by email or WhatsApp.",
  channelsTitle: "Other channels",
};

export function getHomeContent(locale: Locale): HomeContent {
  return locale === "en" ? homeEn : homeZh;
}

export function getDataContent(locale: Locale): DataPageContent {
  return locale === "en" ? dataEn : dataZh;
}

export function getSolutionsContent(locale: Locale): SolutionsPageContent {
  return locale === "en" ? solutionsEn : solutionsZh;
}

export function getWhyContent(locale: Locale): WhyPageContent {
  return locale === "en" ? whyEn : whyZh;
}

export function getAboutContent(locale: Locale): AboutPageContent {
  return locale === "en" ? aboutEn : aboutZh;
}

export function getContactContent(locale: Locale): ContactPageContent {
  return locale === "en" ? contactEn : contactZh;
}
