import type { Locale } from "./i18n";

export type GlossaryEntry = {
  term: string;
  termZh: string;
  /** Plain-language definition, ≤ 60 words. Used inside Schema.org DefinedTerm. */
  definition: string;
  definitionZh: string;
  /** Section grouping for navigation */
  group: "race" | "horse" | "betting" | "track" | "performance";
};

/**
 * Hong Kong horse racing glossary — single source of truth.
 *
 * Editorial constraints:
 *  - Evergreen wording (no "current season" / years).
 *  - Each definition starts with a noun phrase so an LLM can pull it as a
 *    self-contained answer.
 *  - Term spellings follow HKJC public English usage.
 */
export const glossary: GlossaryEntry[] = [
  /* ────────── Race structure ────────── */
  {
    term: "Class",
    termZh: "班次",
    group: "race",
    definition:
      "A handicap band that groups horses of similar ability. Hong Kong racing uses Class 1 (highest, ratings 80–100) down to Class 5 (lowest, 0–40), plus Group races (Group 1, 2, 3) for elite horses.",
    definitionZh:
      "按馬匹評分劃分的組別。香港賽馬由 Class 1（最高，評分 80–100）至 Class 5（最低，0–40），另有 Group 1 / 2 / 3 等高級別賽事供頂尖馬匹爭奪。",
  },
  {
    term: "Going",
    termZh: "場地狀況",
    group: "race",
    definition:
      "Official description of turf or all-weather track condition before each meeting. HKJC categories include Firm, Good to Firm, Good, Good to Yielding, Yielding, Yielding to Soft, Soft and Heavy.",
    definitionZh:
      "官方公佈的草地或全天候跑道狀況。賽馬會分類包括快地、快至好地、好地、好至黏地、黏地、黏至大爛地、大爛地、爛地。",
  },
  {
    term: "Distance",
    termZh: "賽程",
    group: "race",
    definition:
      "Race length in metres. Hong Kong races run from 1000 m sprints to 2400 m staying trips on turf, plus 1200–2000 m on the Sha Tin all-weather track.",
    definitionZh:
      "賽事路程，以米為單位。香港賽事由 1000 米短途至 2400 米長途，另有沙田全天候跑道的 1200–2000 米賽事。",
  },
  {
    term: "Race Card",
    termZh: "排位表",
    group: "race",
    definition:
      "The pre-race document listing each runner's draw, weight, jockey, trainer, recent form, and rating. Released by the HKJC the day before each race meeting.",
    definitionZh:
      "賽前文件，列出每匹參賽馬的檔位、負磅、騎師、練馬師、近績及評分。香港賽馬會通常於賽事前一日發放。",
  },
  {
    term: "Draw",
    termZh: "檔位",
    group: "race",
    definition:
      "The starting gate position assigned to each horse, numbered from 1 (innermost) outward. Lower draws are statistically advantageous in shorter races.",
    definitionZh:
      "每匹馬的起步閘位，由 1（最內側）向外排列。短途賽事中，低檔位通常較有利。",
  },
  {
    term: "Going Allowance",
    termZh: "場地容差",
    group: "race",
    definition:
      "An adjustment factor applied to raw finishing times to compare performances across different track conditions and meetings.",
    definitionZh:
      "用於修正不同場地狀況下完賽時間的調整因子，以便跨賽日比較表現。",
  },

  /* ────────── Horse ────────── */
  {
    term: "Rating",
    termZh: "評分",
    group: "horse",
    definition:
      "Official ability number assigned by HKJC handicappers, ranging roughly 0–135. Used to determine race class eligibility and weight carried.",
    definitionZh:
      "由賽馬會評磅員給予的官方能力評分，範圍約 0–135，用於決定可參加班次及負磅。",
  },
  {
    term: "Import Type",
    termZh: "進口類別",
    group: "horse",
    definition:
      "Classification at first registration: Privately Purchased (PP), Privately Purchased Griffin (PPG), Hong Kong International Sale (HKIS), or Hong Kong International Trial (HKIT).",
    definitionZh:
      "馬匹首次登記時的類別，包括自購馬（PP）、自購未出賽馬（PPG）、香港國際馬匹拍賣會（HKIS）及香港國際試閘賽（HKIT）。",
  },
  {
    term: "Stable",
    termZh: "馬房",
    group: "horse",
    definition:
      "The trainer's licensed yard at Sha Tin where the horse is housed and prepared. Horse-stable assignments change only when a horse is transferred between trainers.",
    definitionZh:
      "練馬師於沙田擁有的持牌馬房，馬匹於該處寄養及備戰。只有馬匹轉廄時，馬房分配才會更新。",
  },
  {
    term: "Sex",
    termZh: "性別",
    group: "horse",
    definition:
      "Horse gender. HKJC denotes Colt (entire male, ≤ 4yo), Horse (entire male, > 4yo), Gelding (castrated male), Filly (female ≤ 4yo), and Mare (female > 4yo).",
    definitionZh:
      "馬匹性別。賽馬會分為公馬駒（≤4 歲完整公馬）、公馬（>4 歲完整公馬）、閹馬、雌馬駒（≤4 歲雌性）及母馬（>4 歲雌性）。",
  },

  /* ────────── Performance metrics ────────── */
  {
    term: "Sectional Time",
    termZh: "分段時間",
    group: "performance",
    definition:
      "Time taken to run each 200 m segment (or 400 m / 600 m aggregates) of a race, measured from finish line backward. Used to assess pace, stamina, and acceleration profiles.",
    definitionZh:
      "賽事中每 200 米（或 400 米 / 600 米合計）的完成時間，由終點線回溯計算，用於分析配速、耐力與加速曲線。",
  },
  {
    term: "Sectional Position",
    termZh: "分段位置",
    group: "performance",
    definition:
      "A horse's running position at fixed points of the race (typically 800m, 600m, 400m before the finish), expressed as ordinal rank within the field.",
    definitionZh:
      "馬匹於賽事固定位置（通常為終點前 800、600、400 米）的跑位，以場內名次表示。",
  },
  {
    term: "LBW",
    termZh: "落後距離",
    group: "performance",
    definition:
      "\"Lengths Behind Winner\" — official margin between a horse's nose and the winner's nose at the line, expressed in horse lengths (1 length ≈ 2.5 m / ≈ 0.18 s).",
    definitionZh:
      "「Lengths Behind Winner」即落後頭馬的距離，以馬頭計算（一個馬位約 2.5 米 / 0.18 秒）。",
  },
  {
    term: "Finishing Time",
    termZh: "完成時間",
    group: "performance",
    definition:
      "Race time of the winning horse from gate release to crossing the finish line, measured to 0.01 second.",
    definitionZh:
      "頭馬由閘門打開至越過終點線的總時間，精確至 0.01 秒。",
  },
  {
    term: "Form",
    termZh: "近績",
    group: "performance",
    definition:
      "Compact string of recent finishing positions (e.g. \"3-1-7\") shown on race cards. Shorthand for a horse's last several outings.",
    definitionZh:
      "排位表上馬匹最近幾場的跑位（例如「3-1-7」），代表近期表現。",
  },

  /* ────────── Track / venue ────────── */
  {
    term: "Sha Tin",
    termZh: "沙田",
    group: "track",
    definition:
      "Larger of HKJC's two racecourses. Hosts both turf (1800 m circumference) and all-weather (1551 m, Polytrack) racing. Most weekend meetings are held here.",
    definitionZh:
      "賽馬會兩個馬場中較大者，設有草地跑道（周長 1800 米）及全天候跑道（1551 米，Polytrack）。大部分週末賽日於此舉行。",
  },
  {
    term: "Happy Valley",
    termZh: "跑馬地",
    group: "track",
    definition:
      "Iconic city-centre turf racecourse (1450 m circumference) used for midweek night meetings. Tight turns favour front-runners and inside draws.",
    definitionZh:
      "市中心的標誌性草地馬場（周長 1450 米），多用於週中夜賽。彎位窄，較利前領馬及低檔位馬。",
  },
  {
    term: "Trial",
    termZh: "試閘",
    group: "track",
    definition:
      "Official non-betting practice race used to assess fitness, education a young horse, or rehabilitate one returning from layoff. Sectional times and form notes are recorded.",
    definitionZh:
      "官方無投注的練習賽，用於測試狀態、訓練幼馬或復出馬。分段時間及表現評語會被記錄。",
  },
  {
    term: "Trackwork",
    termZh: "晨操",
    group: "track",
    definition:
      "Daily morning gallops at Sha Tin or Conghua. Trackwork sectional times and pace notes are catalogued by HKJC and form a leading indicator of race fitness.",
    definitionZh:
      "馬匹每日於沙田或從化的晨操訓練。賽馬會記錄分段時間及操練評語，是馬匹備戰狀態的先行指標。",
  },

  /* ────────── Betting / pools ────────── */
  {
    term: "Win Pool",
    termZh: "獨贏",
    group: "betting",
    definition:
      "Pari-mutuel pool paying out only on the first-placed horse. Final dividend is calculated after deducting takeout from the total pool.",
    definitionZh:
      "派彩制彩池，只派彩予第一名馬匹。終場派彩 = (總投注額 − 抽佣) ÷ 中頭馬投注額。",
  },
  {
    term: "Place Pool",
    termZh: "位置",
    group: "betting",
    definition:
      "Pari-mutuel pool paying on horses finishing 1st, 2nd, or 3rd (or 1st-2nd if fewer than 7 runners).",
    definitionZh:
      "派彩制彩池，派彩予第一、第二、第三名馬匹（馬匹少於 7 匹則只派 1、2 名）。",
  },
  {
    term: "Quinella",
    termZh: "連贏",
    group: "betting",
    definition:
      "Bet selecting the two horses to finish first and second in any order. One of the most popular Hong Kong exotic bets.",
    definitionZh:
      "投注組合：選中第一、第二名馬匹（不分次序），是香港最受歡迎的綜合彩池之一。",
  },
  {
    term: "Trio",
    termZh: "單T",
    group: "betting",
    definition:
      "Bet selecting the first three horses in any order. Pays a single dividend regardless of internal placing.",
    definitionZh:
      "投注組合：選中頭三名馬匹（不分次序），無論內部排序皆派同一彩金。",
  },
  {
    term: "Double",
    termZh: "孖寶",
    group: "betting",
    definition:
      "Bet selecting the winners of two designated consecutive races. Pools roll forward when not won.",
    definitionZh:
      "投注組合：選中指定兩場連續賽事的頭馬。冇人中時彩池會滾存。",
  },
  {
    term: "Time-Series Odds",
    termZh: "時序賠率",
    group: "betting",
    definition:
      "Odds quoted at successive points before race start (e.g. every 10 seconds), forming a time-indexed series. Used in market-microstructure and pricing models.",
    definitionZh:
      "賽事開始前不同時點（例如每 10 秒）的賠率，形成時間序列，用於盤口微觀結構及定價模型研究。",
  },
  {
    term: "Final Odds",
    termZh: "終場賠率",
    group: "betting",
    definition:
      "Last odds quoted at the moment the gates open, used for official dividend calculation and as the canonical settlement reference.",
    definitionZh:
      "閘門打開瞬間的最後賠率，用於官方派彩計算及作為標準結算參考。",
  },
  {
    term: "Tote",
    termZh: "彩池",
    group: "betting",
    definition:
      "Pari-mutuel betting system where all bets of one type form a single pool, and dividends derive from that pool minus a fixed takeout.",
    definitionZh:
      "派彩制投注系統，同類投注合併成單一彩池，派彩 = 彩池總額 − 固定抽佣後按比例分配。",
  },
];

export function getGlossaryGroups(locale: Locale) {
  const isEn = locale === "en";
  return [
    { id: "race",        label: isEn ? "Race structure"  : "賽事結構" },
    { id: "horse",       label: isEn ? "Horse"           : "馬匹" },
    { id: "performance", label: isEn ? "Performance"     : "表現" },
    { id: "track",       label: isEn ? "Track & venue"   : "場地" },
    { id: "betting",     label: isEn ? "Betting & pools" : "投注及彩池" },
  ];
}
