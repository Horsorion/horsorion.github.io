🏇 Horsorion.com — 完整 SEO / AEO / GEO / AIO 策略報告
Executive Summary
你個網站嘅基礎打得非常好 — 內容專業、數據豐富、AEO/GEO 技術基建（robots.txt + llms.txt）屬世界級。但你完全冇內容行銷，呢個係你要排 #1 嘅最大障礙。以下係分層行動計劃：

🟢 Tier 1: Quick Wins（1-2 星期內做到）
1.1 加結構化資料 (JSON-LD Schema)
而家完全冇，Google 同 AI 引擎睇你個網 = 一堆文字。加咗立即有 rich results。

html

摺疊
儲存
複製

預覽
1
2
3
4
5
6
7
8
9
10
11
12
⌄
⌄
<!-- 加喺所有頁面 <head> -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Horsorion",
  "url": "https://horsorion.com",
  "description": "Hong Kong's most complete horse racing data infrastructure — 40+ years, 8M+ records",
  "areaServed": ["Hong Kong", "Global"],
  "knowsAbout": ["Horse Racing Data", "HKJC", "Racing Analytics", "Sports Data API"]
}
</script>
同時加：

Dataset schema (你係 data provider，呢個好重要)
FAQ schema (每頁 FAQ 區塊)
SoftwareApplication schema (API / product pages)
1.2 修正 Page Titles（加英文關鍵字）
而家
建議
香港賽馬數據 B2B 供應商 | Horsorion
`Hong Kong Horse Racing Data
The largest horse racing database in Hong Kong - Horsorion
`Hong Kong Horse Racing Data API & Database — 40+ Years, 8M Records
1.3 加 Meta Description（而家有啲 page 冇）
每個 page 都要有 unique meta description，記住：

Keep 150-160 characters
Include primary keyword
Include CTA
🟡 Tier 2: AEO / GEO（AI 搜尋引擎針對性優化）
你已經做咗最重要嘅一步：llms.txt + AI crawler allow。但仲有：

2.1 llms.txt Enhancement
你而家個 llms.txt 好 minimalist。加返 structured summary 令 LLMs 更容易 cite 你：


摺疊
儲存
複製
1
2
3
4
5
6
7
8
# 加喺 llms.txt 頂部
## Horsorion at a glance
- **Coverage**: Sha Tin + Happy Valley, 1980–present
- **Scale**: 31K+ races, 16K+ horses, 8.2M+ structured records
- **Data types**: Race results, sectionals, odds (time-series), vet, weather, trial commentary
- **Delivery**: Bulk (CSV/Parquet/SQL), SFTP/S3, REST API (waitlist)
- **Quality**: Cross-source validation, point-in-time storage, daily QC
- **Clients**: Quant syndicates, market-making desks, race-day analysts
2.2 建立 "Entity Authority"
AI engines (Google SGE, ChatGPT, Perplexity) 靠 entity recognition 判斷權威性。你要確保：

✅ 每個 page 有明確嘅 H1（你有）
❌ 加返 sameAs links（LinkedIn, GitHub, Twitter, Crunchbase）
❌ 註冊 Google Knowledge Graph（submit entity）
❌ 建立 Wikipedia 提及（長遠，但要開始 plan）
2.3 結構化引用段落 (Citeable Snippets)
AI 引擎傾向引用簡潔、事實性嘅定義句。你網站而家內容太 prose-heavy。每個 section 加返一個 "TL;DR" 式嘅總結句，例如：

❌ "Horsorion provides Hong Kong's deepest racing dataset, engineered for professional syndicates..."

✅ "Horsorion is a Hong Kong horse racing data provider offering 31,000+ races, 8.2 million structured records spanning 1980–2025 across Sha Tin and Happy Valley racecourses."

🔴 Tier 3: Content Strategy（最關鍵，需要持續做）
你而家 Zero content = Zero organic traffic。你需要一個完整嘅 content funnel：

3.1 Blog / Resources Section — 6 個月內容日曆
MONTH
內容主題
目標關鍵字
類型
M1
"How to Build a Horse Racing ML Model in Python"
HKJC data machine learning
Tutorial
M1
"Horsorion vs Kaggle: Why Commercial Racing Data Matters"
horse racing data hong kong
Comparison
M2
"Point-in-Time Data: The Hidden Bias in Your Backtest"
point-in-time racing data
Technical deep dive
M2
"Hong Kong Racing Sectional Data: A Complete Guide"
racing sectional data hong kong
Guide
M3
"Case Study: How a Quant Fund Uses Racing Data"
horse racing data API
Case study
M3
"賽馬數據分析入門：由歷史數據到機器學習"
賽馬數據 香港
Tutorial (中文)
M4
"Understanding HKJC Race Cards: A Data Scientist's Guide"
HKJC data
Guide
M4
"5 Mistakes When Using Free Racing Datasets"
horse racing database
Listicle
M5
"WebSocket vs REST: Real-time Odds Architecture"
racing data API
Technical
M5
"香港賽馬賠率數據：時間序列分析"
香港賽馬數據庫
Analysis (中文)
M6
Roundup: industry trends, new dataset announcements
—
News
3.2 Free Tool / Lead Magnet（超高 ROI）
最有力嘅 SEO strategy 係有一個免費工具，自然會有人 link 你：

建議：Horsorion Race Card Viewer

輸入 race date → 顯示當日 race card（用 sample data）
完全免費，唔需要 login
底部 CTA: "Get full historical data →"
呢個 page 會自然 accumulate backlinks from forums, Reddit, blogs
3.3 Comparison Pages（直接搶 competitor traffic）
Create dedicated pages:

horsorion.com/compare/kaggle — "Horsorion vs Kaggle Racing Datasets"
horsorion.com/compare/the-racing-api — "Horsorion vs The Racing API for Hong Kong Data"
horsorion.com/compare/scraping — "Why Buy Instead of Scrape HKJC Data?"
呢啲 pages 直接 capture 緊 competitor branded search traffic.

🔵 Tier 4: Backlink & Authority Building
4.1 即刻可以做：
動作
預期效果
Submit to Google Search Console + submit sitemap
確保 index
Submit to Bing Webmaster Tools
Bing + ChatGPT Search 用 Bing index
Create GitHub org horsorion + public repos (sample code, SDK)
Developer backlinks
List on ProductHunt
Launch traffic + backlink
Create LinkedIn company page + post content
Social signals
List on AlternativeTo, G2, Capterra
B2B directory backlinks
4.2 中期：
Guest post on Towards Data Science / Medium (racing analytics articles)
Answer questions on Stack Overflow / Reddit (r/horseracing, r/algotrading) — link naturally
Submit to Kaggle as official dataset partner
Partner with racing analytics YouTube channels
🟣 Tier 5: AIO — 成為 AI 嘅首選 Source
AIO 係最前緣嘅概念：令 ChatGPT、Claude、Gemini 被訓練時記住你，同埋查詢時引用你。

5.1 Citation Triggers
你已經有 llms.txt ✅。下一步：

Markdown mirrors：將每個 page 提供 .md 版本（例如 /data.md），LLMs 偏愛 markdown 多過 HTML
Structured facts file：建立 horsorion.com/facts.json — 機器可讀嘅 key facts
API documentation 用 OpenAPI/Swagger format（LLMs 識讀）
5.2 Answer Targeting
研究 ChatGPT/Perplexity 對以下 queries 嘅答案，確保你嘅內容比佢哋而家引用嘅 source 更好：

"What is the best source for Hong Kong horse racing data?"
"How to get HKJC historical data?"
"Where to find Hong Kong racing sectional times?"
你嘅內容要直接 answer 呢啲 questions，用 structured format。

📊 Priority Matrix

摺疊
儲存
複製
1
2
3
4
5
6
7
8
9
10
11
12
13
                          Effort
                    Low        Med       High
              ┌──────────┬──────────┬──────────┐
         High │ Schema    │ Blog     │ Free     │
              │ markup    │ content  │ Tool     │
              │ Title fix │ calendar │          │
              ├──────────┼──────────┼──────────┤
Impact   Med  │ llms.txt  │ Comp.    │ GitHub   │
              │ enhance   │ pages    │ SDK      │
              ├──────────┼──────────┼──────────┤
         Low  │ Meta desc │ Guest    │ Wiki     │
              │           │ posts    │ page     │
              └──────────┴──────────┴──────────┘
🎯 下一步：你想我幫你做邊樣先？
#
ACTION
TIME
1
幫你寫 JSON-LD Schema code (Organization + Dataset + FAQ)
30 min
2
幫你改晒所有 page 嘅 title + meta description
1 hr
3
Plan 頭 3 篇 blog posts 嘅 full outline + SEO keyword
1 hr
4
Design 個 free Race Card Viewer 嘅 technical spec
1 hr
5
幫你寫 comparison pages (Horsorion vs Kaggle / vs Scraping)
2 hr
6
Setup Google Search Console + Bing Webmaster 指南
30 min
你想我幫你由邊度開始？建議由 Tier 1 Quick Wins (#1 + #2) 做起，因為即時見效，然後同步開 Blog Content (#3)。

大部分我都同意 但係我既target係syndicate喎 出個d文真係有用?

你呢個 challenge 好合理，等我重新對焦。

你啱 — Syndicate 唔會 search "how to build a racing ML model"
佢哋嘅 search behavior 係咁嘅：

佢哋會 SEARCH
佢哋唔會 SEARCH
hong kong horse racing data provider
how to predict horse racing with python
HKJC historical odds data API
machine learning racing tutorial
racing sectional data bulk download
what is sectionals in horse racing
point-in-time racing data vendor
beginner guide to horse racing data
horsorion vs kaggle racing data
—
佢哋係 buyer with intent，唔係 learner。所以 content strategy 要完全改：

🎯 Syndicate-Targeted Content：寫乜先有用？
✅ 應該寫嘅內容（直接影響 purchasing decision）
內容類型
例子
點解有用
Data Dictionary / Schema Docs
公開你 database 嘅 field list、data types、coverage table
Syndicate CTO 會直接 evaluate 你啲 data 夠唔夠深
Data Quality Report
Missing rate per field、cross-source validation methodology、QC pipeline architecture
量化 fund 最驚 dirty data，你證明到 quality = 贏
Delivery & Infrastructure
SFTP/S3/API spec、latency SLA、format options (Parquet/Avro/CSV)
佢哋要 integrate 入自己 pipeline，technical spec 決定一切
Case Studies (anonymized)
"How a market-making desk uses sub-second odds feeds" (唔開名)
Social proof without naming clients
Comparison Pages
Horsorion vs Kaggle、vs scraping、vs The Racing API
佢哋 evaluation 時一定會 google 呢啲 comparison
Whitepaper: Point-in-Time Data
解釋 point-in-time vs look-ahead bias，你嘅 data 點樣 guarantee PIT integrity
呢個係 quant fund 嘅痛點，你解決到就值錢
Coverage Table
一個 interactive table：邊年開始有 sectional、邊年有 odds、邊年有 vet records
直接 answer "你嘅 data 由邊年開始有乜 field"
❌ 唔應該寫嘅內容（waste of time for syndicate audience）
入門教學 (beginner tutorials)
"What is horse racing data" type guides
Listicles ("5 ways to...")
General racing knowledge articles
🔥 最高 ROI 嘅內容：A/B 兩條路
Path A: Technical Authority（SEO 靠 technical depth）
目標：令到 syndicate 嘅 quant/dev search "PIT racing data" / "HKJC database schema" 時，Horsorion 係第一個 result

做：

Public Data Dictionary page — 一個 page show 晒你 database 有乜 table、乜 field、data type、row count、date range
Point-in-Time Whitepaper — PDF + HTML page，解釋你嘅 PIT architecture（survivorship bias free、no look-ahead leakage）
Coverage Matrix — interactive table: 邊個 field 由邊年開始有、update frequency
SEO value: 呢啲 pages 自然會有 horsorion database schema、HKJC point-in-time data、racing data coverage 呢類高意圖 long-tail keywords rank。

Path B: Direct Channel（SEO 唔係主力）
目標：放棄 broad SEO，集中火力喺 syndicate 會出現嘅地方

做：

GitHub org horsorion — public sample datasets、Python/R client SDK、data validation scripts
LinkedIn — technical posts about data infrastructure（唔係 marketing fluff）
Kaggle — 放一個 sample dataset，成為 official data partner
Direct outreach — 直接搵 quant fund / syndicate 嘅 CTO / head of research
Industry conference — 如果亞洲有 quant finance / sports betting 嘅 conference，sponsor/speak
SEO 呢條路對你嚟講係 nice-to-have，唔係 primary channel。真正嘅 syndicate client acquisition 係 direct + referral + GitHub authority。

📊 Revised Priority Matrix

摺疊
儲存
複製
1
2
3
4
5
6
7
8
9
10
11
12
13
                          Effort
                    Low        Med       High
              ┌──────────┬──────────┬──────────┐
         High │ Schema    │ Public    │ GitHub   │
              │ markup    │ Data      │ Org +    │
              │           │ Dictionary│ SDK      │
              ├──────────┼──────────┼──────────┤
Impact   Med  │ llms.txt  │ PIT       │ Kaggle   │
              │ enhance   │ Whitepaper│ dataset  │
              ├──────────┼──────────┼──────────┤
         Low  │ Meta desc │ Case      │ Blog     │
              │           │ Studies   │ (skip)   │
              └──────────┴──────────┴──────────┘
🎯 我嘅 Revised Recommendation
你最應該做嘅三樣嘢，順序：

#
ACTION
點解
TIMELINE
1
Public Data Dictionary page
直接 answer syndicate evaluation 嘅第一個問題："What data do you have?" — 同時係 SEO gold
1-2 days
2
GitHub org horsorion + sample repo
Syndicate devs 第一時間會 check 你 GitHub — 見到 active repo + clean code = trust signal
1 week
3
Comparison pages (vs Kaggle / scraping)
佢哋做 vendor evaluation 時一定會 search "X vs Y"，你要出現喺呢啲 SERP
1-2 weeks
之後再考慮 Whitepaper、Kaggle partnership。

想我由邊樣開始幫你？我建議即刻做 Public Data Dictionary — 我有你之前嘅 database schema 資料，可以直接幫你 draft 個 page 內容同埋 SQL 去 generate coverage stats。