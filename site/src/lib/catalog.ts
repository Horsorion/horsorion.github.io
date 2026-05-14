/**
 * Horsorion data product catalog — derived from internal product spec.
 *
 * Design constraints:
 *  - 5-year-safe: NO specific years (e.g. "since 1987"). Use soft buckets ("20+ years").
 *  - NO pricing displayed publicly.
 *  - Status indicates freshness/category cadence, not exact SLA numbers.
 */

export type StatusVariant =
  | "live"
  | "race-day"
  | "post-race"
  | "daily"
  | "historical"
  | "pre-race"
  | "video";

export type DataProduct = {
  name: string;
  nameEn: string;
  historyBucket: "35+" | "30+" | "20+" | "15+" | "10+" | "5+";
  status: StatusVariant;
};

export type DataCategory = {
  id: "pre-race" | "post-race" | "general" | "odds";
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  products: DataProduct[];
};

export const catalog: DataCategory[] = [
  {
    id: "pre-race",
    title: "賽前數據",
    titleEn: "Pre-Race",
    description: "用於賽前定價、模型輸入與場地預判。",
    descriptionEn: "Inputs for pre-race pricing models and field assessment.",
    products: [
      { name: "賽事資料",      nameEn: "Race Information",   historyBucket: "15+", status: "pre-race" },
      { name: "天氣狀況",      nameEn: "Weather Condition",  historyBucket: "35+", status: "race-day" },
      { name: "排位表",        nameEn: "Race Cards",         historyBucket: "15+", status: "pre-race" },
      { name: "場地報告",      nameEn: "Race Readings",      historyBucket: "20+", status: "pre-race" },
      { name: "預測配速",      nameEn: "Predicted Pacing",   historyBucket: "5+",  status: "pre-race" },
      { name: "預測起步",      nameEn: "Predicted Starting", historyBucket: "5+",  status: "pre-race" },
      { name: "分析師評論",    nameEn: "Analyst Comments",   historyBucket: "5+",  status: "pre-race" },
    ],
  },
  {
    id: "post-race",
    title: "賽後數據",
    titleEn: "Post-Race",
    description: "結果、分段、彩池與事故紀錄，支援回測與結算。",
    descriptionEn: "Results, sectionals, pools, and incidents for backtesting and reconciliation.",
    products: [
      { name: "賽事結果",          nameEn: "Race Results",                  historyBucket: "35+", status: "post-race" },
      { name: "分段位置",          nameEn: "Race Sectional Position",       historyBucket: "35+", status: "post-race" },
      { name: "分段時間",          nameEn: "Race Sectional Time",           historyBucket: "15+", status: "post-race" },
      { name: "分段配速",          nameEn: "Race Sectional Pacing",         historyBucket: "5+",  status: "post-race" },
      { name: "派彩記錄",          nameEn: "Race Dividends",                historyBucket: "20+", status: "post-race" },
      { name: "彩池總額",          nameEn: "Race Pool Sizes",               historyBucket: "5+",  status: "post-race" },
      { name: "賽事事故",          nameEn: "Race Incident Reports",         historyBucket: "20+", status: "post-race" },
      { name: "馬匹練評",          nameEn: "Horse Comments on Running",     historyBucket: "30+", status: "post-race" },
      { name: "多角度賽事重播",    nameEn: "Multi-Angle Race Replay",       historyBucket: "20+", status: "video" },
      { name: "穿越分析影片",      nameEn: "Pass-Through Analysis Video",   historyBucket: "10+", status: "video" },
      { name: "空中虛擬重播",      nameEn: "Aerial Virtual Replay",         historyBucket: "10+", status: "video" },
    ],
  },
  {
    id: "general",
    title: "一般資料",
    titleEn: "General",
    description: "馬匹基礎、健康、晨操與試閘資料，支援深度模型。",
    descriptionEn: "Horse fundamentals, health, trackwork, and trial data for deep modelling.",
    products: [
      { name: "馬匹資料",          nameEn: "Horse Information",        historyBucket: "35+", status: "daily" },
      { name: "獸醫紀錄",          nameEn: "Horse Veterinary Records", historyBucket: "15+", status: "daily" },
      { name: "晨操資料",          nameEn: "Horse Trackwork",          historyBucket: "20+", status: "daily" },
      { name: "馬匹新聞",          nameEn: "Horse News",               historyBucket: "15+", status: "daily" },
      { name: "試閘場次",          nameEn: "Barrier Trial Information", historyBucket: "15+", status: "daily" },
      { name: "試閘結果",          nameEn: "Barrier Trial Results",     historyBucket: "15+", status: "daily" },
      { name: "試閘評語",          nameEn: "Barrier Trial Comments",    historyBucket: "15+", status: "daily" },
      { name: "試閘影片",          nameEn: "Barrier Trial Video",       historyBucket: "15+", status: "video" },
    ],
  },
  {
    id: "odds",
    title: "賠率數據",
    titleEn: "Odds",
    description: "終場賠率與時間序列賠率，支援盤口建模與市場研究。",
    descriptionEn: "Final and time-series odds for pricing models and market research.",
    products: [
      { name: "獨贏終場賠率",      nameEn: "Win Final Odds",                 historyBucket: "35+", status: "post-race" },
      { name: "位置終場賠率",      nameEn: "Place Final Odds",               historyBucket: "35+", status: "post-race" },
      { name: "連贏終場賠率",      nameEn: "Quinella Final Odds",            historyBucket: "20+", status: "post-race" },
      { name: "連位終場賠率",      nameEn: "Quinella Place Final Odds",      historyBucket: "20+", status: "post-race" },
      { name: "單T 終場賠率",      nameEn: "Trio Final Odds",                historyBucket: "15+", status: "post-race" },
      { name: "孖寶終場賠率",      nameEn: "Double Final Odds",              historyBucket: "15+", status: "post-race" },
      { name: "獨贏時序賠率",      nameEn: "Win Time-Series Odds",           historyBucket: "15+", status: "live" },
      { name: "位置時序賠率",      nameEn: "Place Time-Series Odds",         historyBucket: "15+", status: "live" },
      { name: "連贏時序賠率",      nameEn: "Quinella Time-Series Odds",      historyBucket: "15+", status: "live" },
      { name: "連位時序賠率",      nameEn: "Quinella Place Time-Series Odds", historyBucket: "15+", status: "live" },
      { name: "單T 時序賠率",      nameEn: "Trio Time-Series Odds",          historyBucket: "15+", status: "live" },
      { name: "孖寶時序賠率",      nameEn: "Double Time-Series Odds",        historyBucket: "15+", status: "live" },
    ],
  },
];

export const bucketLabel: Record<DataProduct["historyBucket"], string> = {
  "35+": "35+ 年",
  "30+": "30+ 年",
  "20+": "20+ 年",
  "15+": "15+ 年",
  "10+": "10+ 年",
  "5+":  "5+ 年",
};

export const bucketLabelEn: Record<DataProduct["historyBucket"], string> = {
  "35+": "35+ years",
  "30+": "30+ years",
  "20+": "20+ years",
  "15+": "15+ years",
  "10+": "10+ years",
  "5+":  "5+ years",
};
