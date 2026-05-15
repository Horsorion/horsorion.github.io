# Horsorion Design System

> Single source of truth for brand, colour, typography, layout, and component
> patterns. Reference this document before building any Horsorion product —
> website, dashboard, PDF report, email template, or marketing asset.

---

## 1. Brand identity

### Positioning

Horsorion is a **B2B data infrastructure provider** serving professional horse
racing syndicates, quant teams, and market-making desks. The brand must read as:

- **Technical & rigorous** — not casual or consumer-facing
- **Understated & trustworthy** — NDA-level confidentiality, zero hype
- **Precision-driven** — monospace data previews, exact numbers, no rounding
- **Hong Kong rooted** — local domain expertise, bilingual zh-Hant / en parity

Do not: use playful illustration, bright gradient splashes, large emoji, or
stock-photo collage layouts. Avoid anything that reads as a "SaaS startup for
everyone" aesthetic.

### Voice

| Attribute | Do | Don't |
|-----------|----|-------|
| Tone | Technical, precise, confident | Casual, hypey, superlative |
| Language | Formal Traditional Chinese (書面語) | Colloquial Cantonese (口語) |
| Numbers | Exact: 31,000+ races, 8.2 M+ records | Vague: "lots of data", "many races" |
| Claims | Verifiable: "T+0 race-day updates" | Unverifiable: "best in class" |
| CTA | Specific: "索取完整 Schema" | Generic: "Learn more" |

---

## 2. Colour palette

These are the only colours used across all Horsorion products. Never introduce
new palette colours without updating `tailwind.config.mjs`.

### Primary colours

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-navy` | `#0e2f62` | Primary background, headers, card icons, footer |
| `brand-navy-dark` | `#0a2348` | Hover states on navy elements |
| `brand-navy-light` | `#1a4a8a` | Subtle navy tints, gradients |
| `brand-gold` | `#c9a227` | CTA buttons, eyebrow labels, accent lines, live indicators |
| `brand-gold-light` | `#e8c547` | Hover state for gold buttons |

### Surface colours

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-slate` | `#f4f7fb` | Page body background (light sections) |
| `brand-mist` | `#fbf8f1` | Warm off-white — alternate light section, open data pages |
| `white` | `#ffffff` | Card surfaces, modal backgrounds |

### Semantic colours (use Tailwind defaults)

| Colour | Tailwind token | Usage |
|--------|----------------|-------|
| Success / live | `emerald-400` / `emerald-500` | Live status dot, rank 1 in terminal |
| Warning / odds | `amber-300` / `amber-500` | Numeric highlights in terminal, comparison partial |
| Error | `red-400` | Comparison cross, form validation errors |
| Sky / schema | `sky-400` | Column header highlights in terminal |
| Code purple | `violet-400` | Language keywords in code blocks |
| Slate text | `slate-600` / `slate-700` | Body copy on white |
| Muted text | `white/60` – `white/80` | Secondary text on navy backgrounds |

### Dark (terminal) background

```
#0a1428  — terminal code block background (navy deeper than brand-navy)
```

### Opacity scale

Use Tailwind's `/n` opacity modifiers rather than rgba. Common values:
- `white/5` — barely-there overlay
- `white/10` — subtle border on navy
- `white/75` — readable secondary text on navy
- `brand-navy/10` — light tint on white for icon containers
- `brand-navy/15` — border for outline buttons
- `black/60` — modal backdrop

---

## 3. Typography

### Font stack (defined in `tailwind.config.mjs`)

| Role | Stack | Tailwind class |
|------|-------|----------------|
| Body / UI | Nunito Sans → Noto Sans TC → system-ui | `font-sans` |
| Display / headings | Noto Sans TC → Nunito Sans → system-ui | `font-display` |
| Code / data | JetBrains Mono → IBM Plex Mono → SF Mono | `font-mono` |

**Why two sans stacks?** Noto Sans TC renders Chinese glyphs better as headings
(heavier stroke); Nunito Sans provides rounder Latin letterforms for body copy.

### Type scale (Tailwind classes → px)

| Class | px | Usage |
|-------|----|-------|
| `text-xs` | 12 | Eyebrow labels, captions, footer meta, mono status |
| `text-sm` | 14 | Body copy, form labels, nav links, card descriptions |
| `text-base` | 16 | Hero CTA buttons, section intros |
| `text-lg` | 18 | Sub-headings, hero subtitles |
| `text-xl` | 20 | Card headings |
| `text-2xl` | 24 | Section headings (light) |
| `text-3xl` | 30 | Section headings (bold), hero mobile |
| `text-4xl` | 36 | Hero tablet |
| `text-5xl` | 48 | Hero desktop |
| `text-6xl` | 60 | Hero large desktop |

### Responsive hero heading rule

Always step up font size across breakpoints — never use a single fixed size:

```html
text-3xl sm:text-4xl md:text-5xl lg:text-6xl
```

This prevents Chinese characters from overflowing on narrow viewports (iPhone
430 px portrait) — 30 px × 12 characters = 360 px, safe within 398 px available.

### Eyebrow pattern

Every major section opens with an eyebrow label above the heading:

```html
<p class="eyebrow">Integration-ready</p>
<h2 class="mt-3 text-3xl font-bold">...</h2>
```

`.eyebrow` = `text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold`

On navy backgrounds eyebrow is gold. On white backgrounds add `text-brand-navy`
override: `class="eyebrow text-brand-navy"`.

### Font weights in use

| Weight | Class | Used for |
|--------|-------|---------|
| 300 | `font-light` | Rarely — very large display only |
| 400 | `font-normal` | Body copy (implicit) |
| 600 | `font-semibold` | Nav links, card headings, labels |
| 700 | `font-bold` | Page h1/h2, section headings, CTAs |
| 800 | `font-extrabold` | Hero h1 at largest sizes (optional) |

### Line height

- Body copy: `leading-7` (28 px) — generous for Chinese readability
- Headings: `leading-tight` — compact, impactful
- Code blocks: `leading-7` — consistent rhythm in terminal preview

---

## 4. Spacing & layout

### Page wrapper — `section-shell`

Every section's content is constrained by `.section-shell`:

```css
.section-shell {
  @apply mx-auto max-w-6xl px-4 sm:px-6 lg:px-8;
}
```

Max content width: **1152 px**. Horizontal padding scales 16 → 24 → 32 px.

### Section vertical rhythm

| Context | Class | px |
|---------|-------|----|
| Major section (navy) | `py-16` | 64 top + 64 bottom |
| Major section (white) | `py-16` | 64 |
| Compact section | `py-14` | 56 |
| Hero | `py-24` | 96 |
| Page header (inner) | `py-14` or `py-16` | 56–64 |
| Footer main | `py-12` | 48 |

Never use arbitrary vertical padding values. Pick from the table above.

### Grid patterns

| Pattern | Class | Used for |
|---------|-------|---------|
| 2-col hero (left-heavy) | `lg:grid-cols-[1.15fr_0.85fr]` | Homepage hero |
| 2-col equal | `lg:grid-cols-2` | Code blocks, feature pairs |
| 3-col | `lg:grid-cols-3` | Pillars, feature grids |
| 4-col | `md:grid-cols-4` | Footer |
| 2/3-col contact | `lg:grid-cols-[1fr_1.1fr]` | Contact, form + info |
| Responsive 2→3 | `sm:grid-cols-2 xl:grid-cols-3` | Dataset categories |

**Always add `min-w-0` to grid children** that contain `<pre>`, long text, or
flex/grid items — prevents overflow in narrow viewports.

### Border radius scale

| Value | Class | Used for |
|-------|-------|---------|
| 6 px | `rounded-md` | Status pill, badge |
| 8 px | `rounded-lg` | Terminal code block |
| 12 px | `rounded-xl` | Icon containers, form inputs |
| 16 px | `rounded-2xl` | Category cards, form fields |
| 24 px | `rounded-3xl` | Modal panel, surface cards |
| 9999 px | `rounded-full` | Buttons (primary, secondary, outline), logo |

---

## 5. Component library

### 5.1 Buttons

Three variants — always `rounded-full`, always `font-semibold`, minimum height
via `py-3 px-5`.

#### Primary (`btn-primary`)
```css
inline-flex items-center justify-center rounded-full
bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-navy
transition hover:bg-brand-gold-light
focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold
```
Use: main CTA on dark backgrounds (hero, integration section, footer area).

#### Secondary (`btn-secondary`)
```css
inline-flex items-center justify-center rounded-full
border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white
transition hover:bg-white/20
```
Use: alternative CTA on dark/navy backgrounds. Never use on white.

#### Outline (`btn-outline`)
```css
inline-flex items-center justify-center rounded-full
border border-brand-navy/15 bg-white px-5 py-3 text-sm font-semibold text-brand-navy
transition hover:border-brand-navy/30 hover:bg-brand-slate
```
Use: secondary actions on white/light backgrounds (NDA form, skip buttons).

#### Size modifiers
For hero CTAs, bump to `text-base px-7 py-3.5` — do not create new variants.

#### Lead modal trigger
Any element with `data-lead-intent="<intent>"` auto-opens the
`LeadCaptureModal`. Intents: `request-info`, `request-sample`,
`request-dictionary`, `talk-to-us`, `api-waitlist`.

### 5.2 Cards (`surface-card`)

```css
rounded-2xl border border-white/10 bg-white/95 p-6 shadow-card backdrop-blur
```
`shadow-card` = `0 18px 45px rgba(14, 47, 98, 0.12)` (uses brand-navy tint).

Anatomy of a pillar/feature card:
```
[ Icon container 48×48, rounded-2xl, bg-brand-navy, text-brand-gold ]
[ Heading: text-xl font-semibold text-brand-navy ]
[ Body: text-sm leading-7 text-slate-600 ]
```

Category row card (compact):
```
[ Icon container 36×36, rounded-xl, bg-brand-navy/10, text-brand-navy ]
[ Heading: font-semibold text-brand-navy ]
[ Body: text-sm leading-6 text-slate-600 ]
```

### 5.3 Section backgrounds

Sections alternate to create visual rhythm. Use in this order:

| Section | Background | Text |
|---------|-----------|------|
| Hero | `bg-brand-navy` + background image @ 30% opacity | white |
| Trust counters | `bg-brand-slate` (body default) | navy |
| Pillars | `bg-brand-slate` (body default) | navy |
| Dataset categories | `bg-white` | navy |
| Editorial / photo strip | Full-bleed image + navy gradient overlay | white |
| Integration / code | `bg-brand-navy` | white |
| Social proof / CTA | `bg-brand-navy` or `bg-brand-slate` alternating | — |
| Footer | `bg-brand-navy` | white |

Never put two consecutive navy sections without a break.

### 5.4 Hero section pattern

```
bg-brand-navy + background image (30% opacity)
+ gradient left-to-right: from-brand-navy via-brand-navy/90 to-brand-navy/50
+ radial gold accent: radial-gradient(circle_at_top_right, rgba(201,162,39,0.15), transparent 40%)
```

Grid: `lg:grid-cols-[1.15fr_0.85fr] lg:items-center gap-10 py-24`

Left column always contains:
1. Status pill (live indicator)
2. h1 with responsive type scale
3. Subtitle paragraph
4. CTA button group (primary + secondary + optional download)
5. Stat strip in mono font

Right column contains a terminal code block, schema preview, or illustration.

### 5.5 Terminal code block (`TerminalCodeBlock`)

```
rounded-lg border border-white/10 bg-[#0a1428]
Header: flex min-w-0 items-center justify-between gap-3, bg-white/5
  — 3 traffic-light dots (red-400/80, amber-400/80, emerald-400/80), shrink-0
  — caption: min-w-0 truncate font-mono text-[11px] sm:text-xs text-white/60
Body: overflow-x-auto p-4 sm:p-5 font-mono text-[12px] sm:text-[13px] leading-7 text-white/90
```

Syntax colour conventions inside `<pre>`:
| Token type | Colour |
|-----------|--------|
| Keywords / operators | `text-violet-400` |
| Strings / values | `text-amber-300` |
| Comments | `text-emerald-400` (descriptive) or `text-slate-500` (note) |
| Column headers / keys | `text-sky-400` |
| Success / rank 1 | `text-emerald-300` |
| HTTP status | `text-sky-400` |

Always use `&#123;` / `&#125;` for literal `{` `}` inside Astro `.astro`
templates — they conflict with JSX expression syntax.

### 5.6 Status pill

Colour variants in `StatusPill.astro`:

| Variant | Bg / Text | Meaning |
|---------|-----------|---------|
| `race-day` | emerald | Real-time race-day data |
| `post-race` | blue | Post-race results |
| `daily` | violet | Daily refresh |
| `historical` | amber | Historical dataset |
| `video` | rose | Video / media |

### 5.7 Navigation (header)

```
sticky top-0 z-40 border-b border-white/10 bg-brand-navy/95 backdrop-blur
```

Logo block (left): `min-w-0 flex items-center gap-3`
- Logo image: `h-10 w-10 shrink-0 rounded-full object-cover sm:h-11 sm:w-11`
- Site name: `truncate text-base font-bold sm:text-lg`
- Subtitle: `hidden sm:block truncate text-xs text-white/70` (hidden on mobile)

Desktop nav: `hidden lg:flex items-center gap-6` — `text-sm font-medium`

Right actions: `shrink-0 flex items-center gap-2 sm:gap-3`
- Locale switcher: `hidden sm:inline`, gold text
- Primary CTA button: `hidden sm:inline-flex btn-primary`
- Mobile menu toggle: icon-only hamburger (`lucide:menu`), `lg:hidden`

Mobile nav drawer: `lg:hidden`, full-width stacked links + primary CTA.

### 5.8 Footer

4-column grid on md+, stacked on mobile. Columns: Brand / Contact / Quick Links
/ Reference. Bottom bar: copyright, region, legal links — all `font-mono text-xs
text-white/50`.

Live indicator in brand column:
```html
<span class="relative flex h-2.5 w-2.5">
  <span class="absolute ... animate-ping rounded-full bg-emerald-400 opacity-75"></span>
  <span class="relative ... bg-emerald-500"></span>
</span>
```

### 5.9 Lead capture modal (`LeadCaptureModal`)

Two-step form in a scrollable overlay.

Overlay wrapper: `fixed inset-0 z-50 overflow-y-auto`
Centering wrapper: `relative z-10 flex min-h-full items-start justify-center p-4 sm:items-center sm:p-6`
Panel: `relative my-4 w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl`

Close button is **sticky** inside the panel — always accessible regardless of
scroll position.

Step 1 (required): name, email, WhatsApp (optional), enquiry type radio.
Step 2 (optional): company, role, team size, message — user may skip.

On submit, redirects to `/thank-you` (zh) or `/en/thank-you`.

### 5.10 WhatsApp FAB

```
fixed bottom-6 right-4 sm:right-6 z-40
rounded-full bg-[#25D366] px-4 py-3
text-sm font-semibold text-white shadow-lg
transition hover:scale-[1.02]
```

Label hidden on mobile (`hidden sm:inline`). Always use `getWhatsappHref()`
from `site/src/lib/whatsapp.ts` — generates `api.whatsapp.com` format, not
`wa.me`.

### 5.11 Photo / editorial strip

Full-bleed image moment between content sections:

```
relative h-[380px] overflow-hidden
bg image: object-cover, absolute inset-0
Overlay: bg-gradient-to-r from-brand-navy via-brand-navy/75 to-brand-navy/20
         bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent
Text: bottom-left via items-end section-shell pb-10
Blockquote: font-display text-3xl sm:text-4xl font-bold text-white
Cite: font-mono text-xs text-brand-gold/80
```

Never centre the text in an editorial strip — left-align is intentional.

### 5.12 Comparison table

| Symbol | Class | Meaning |
|--------|-------|---------|
| ✓ | `.compare-tick` → `text-emerald-500 font-bold` | Fully supported |
| ✗ | `.compare-cross` → `text-red-400 font-bold` | Not available |
| ~ | `.compare-partial` → `text-amber-500 font-bold` | Partial / contact |

---

## 6. Iconography

Library: **Lucide** via `astro-icon` (`@iconify-json/lucide`).

Usage:
```astro
import { Icon } from "astro-icon/components";
<Icon name="lucide:database" class="h-5 w-5" aria-hidden="true" />
```

Always add `aria-hidden="true"` — icons are decorative; labels come from
adjacent text.

Common icons by context:

| Context | Icon |
|---------|------|
| Data / schema | `lucide:database` |
| Quality / verified | `lucide:shield-check` |
| Speed / latency | `lucide:zap` |
| Download | `lucide:download` |
| Mail / email | `lucide:mail` |
| WhatsApp / message | `lucide:message-circle` |
| Check / success | `lucide:check`, `lucide:check-circle-2` |
| File / NDA | `lucide:file-lock`, `lucide:scroll-text` |
| Menu (mobile nav) | `lucide:menu` |
| Timer / sectional | `lucide:timer` |
| Ranking | `lucide:list-ordered`, `lucide:trophy` |
| Medical / vet | `lucide:stethoscope` |
| Horse / heart | `lucide:heart-pulse` |
| Flag / race | `lucide:flag` |

Icon container sizing:
- Large (pillar cards): `h-12 w-12 rounded-2xl`
- Medium (category rows): `h-9 w-9 rounded-xl`
- Small (inline): `h-5 w-5`

---

## 7. Imagery guidelines

### Background images
- Always at ≤ 30–55% opacity on navy overlays
- Use `object-cover` — never `object-contain` for hero / editorial
- Prefer racecourse action shots or data-centre/infrastructure metaphors

### Logo & brand marks
| Asset | File | Usage |
|-------|------|-------|
| Navbar logo | `/images/brand/logo.jpg` | 44×44 px rounded-full in header |
| Favicon | `/images/brand/Horsorion_favicon.png` | Browser tab |
| Apple touch | `/images/brand/apple-touch-icon.png` | iOS home screen |
| OG image | `/images/og.png` | 1200×630 px social share |

### OG image spec
- Dimensions: 1200 × 630 px
- Background: `brand-navy`
- Text: white, `font-display`, brand messaging
- Accent: gold horizontal line or radial glow

---

## 8. Motion & animation

### Principles
- **Minimal** — animations serve information, not decoration
- **Respect `prefers-reduced-motion`** — all animations are disabled globally
  when the OS requests reduced motion (see `global.css` media query)
- **Never autoplay video** for decorative purposes — use a static image with
  `poster` instead

### In use
| Element | Animation | Purpose |
|---------|-----------|---------|
| Live status dot | `animate-ping` (emerald, opacity 75%) | Signals real-time data |
| WhatsApp FAB | `hover:scale-[1.02]` | Subtle interaction feedback |
| Cards | `transition hover:shadow-card` | Depth feedback on hover |
| Nav links | `transition hover:text-brand-gold` | Colour state feedback |
| Modal backdrop | `backdrop-blur-sm` | Focus isolation |
| Header | `backdrop-blur` | Glassmorphism on sticky nav |

---

## 9. Bilingual (zh-Hant / en) conventions

- **Both locales must be updated simultaneously.** Never ship a zh-only or
  en-only change.
- Chinese lives at root (`/`), English under `/en/`.
- All copy lives in `site/src/lib/i18n.ts` and `site/src/lib/content.ts` —
  never hard-code display strings directly in pages.
- Use formal Traditional Chinese (書面語). Avoid Cantonese particles:
  `的` not `嘅`, `是/為/於` not `係/喺`, `我們` not `我哋`.
- `hreflang` and `lang` attributes are auto-injected by `BaseLayout.astro`.

---

## 10. Accessibility standards

- All interactive elements have visible focus rings (`focus-visible:outline-2`).
- Skip-to-content link is the first focusable element (`<a class="skip-link">`).
- Icons are `aria-hidden="true"` — text provides the accessible label.
- Modal uses `role="dialog" aria-modal="true"` + focus trap + `Escape` close.
- Images have `alt` text or `aria-hidden="true"` if decorative.
- Colour contrast: gold `#c9a227` on navy `#0e2f62` meets WCAG AA for large
  text / UI components; verify body-text contrast if adding new colour combos.
- `prefers-reduced-motion` disables all transitions and animations.

---

## 11. SEO & structured data conventions

Every page receives via `BaseLayout.astro`:
- `<meta name="description">` — max 155 characters
- Canonical URL
- `hreflang` zh-Hant / en / x-default
- Open Graph + Twitter card meta
- Geo tags (`geo.region=HK`)
- JSON-LD: `Organization` + `WebSite` + `BreadcrumbList` (auto-derived)

Page-specific JSON-LD (Dataset, Product, FAQPage, etc.) is passed via the
`schema` prop on `BaseLayout`.

`llms.txt` at `/llms.txt` provides a structured summary for AI crawlers —
update `## Horsorion at a glance` whenever coverage numbers change.

---

## 12. File & project conventions

### Directory structure

```
site/src/
  components/    Reusable Astro / React components
  layouts/       BaseLayout.astro — wrap every page with this
  lib/
    i18n.ts      All bilingual UI copy (SiteCopy type)
    content.ts   Page-level bilingual content (getHomeContent etc.)
    schema.ts    JSON-LD schema builders
    whatsapp.ts  Central WhatsApp link generator
    glossary.ts  Racing term definitions
  pages/         zh-Hant pages at root; /en/* mirrors
  styles/
    global.css   Base reset + component classes + motion override
site/workers/
  lead.ts        Cloudflare Worker (lead form handler)
  wrangler.toml  Worker config + non-secret env vars
site/public/
  images/        brand/, background/, og.png
  samples/       horsorion-sample-*.csv
  llms.txt       AI crawler hint file
```

### Naming conventions

| Item | Convention | Example |
|------|-----------|---------|
| Components | PascalCase, `.astro` or `.tsx` | `LeadCaptureModal.tsx` |
| Pages | kebab-case | `open-data.astro` |
| Lib files | camelCase | `whatsapp.ts` |
| CSS classes | kebab-case (Tailwind) | `btn-primary`, `surface-card` |
| Images | kebab-case | `home_powerby.jpeg` |
| CSV samples | `horsorion-sample-YYYY-MM-DD.csv` | `horsorion-sample-2025-07-16.csv` |

### Adding a new page checklist

- [ ] Create both `site/src/pages/<slug>.astro` and `site/src/pages/en/<slug>.astro`
- [ ] Wrap with `<BaseLayout title locale currentPath schema>`
- [ ] Add page to nav in `site/src/lib/i18n.ts` if it should appear in nav
- [ ] Add `hreflang` derivation entry in `BaseLayout.astro` `labelMap` if needed
- [ ] Add to `site/public/llms.txt` core pages section

### Adding a new component checklist

- [ ] If it contains user-visible text, accept `copy: SiteCopy` prop or take
  localised strings as props — never hard-code English only
- [ ] Add `aria-hidden` to decorative icons; use text for accessible labels
- [ ] Add `min-w-0` to any flex/grid children that hold `<pre>` or long text

---

## 13. Tailwind config quick reference

```js
// tailwind.config.mjs — full token list
colors: {
  brand: {
    navy:        "#0e2f62",
    "navy-dark": "#0a2348",
    "navy-light":"#1a4a8a",
    gold:        "#c9a227",
    "gold-light":"#e8c547",
    slate:       "#f4f7fb",
    mist:        "#fbf8f1",
  }
}
fontFamily: {
  sans:    ["Nunito Sans", "Noto Sans TC", "system-ui", "sans-serif"],
  display: ["Noto Sans TC", "Nunito Sans", "system-ui", "sans-serif"],
  mono:    ["JetBrains Mono", "IBM Plex Mono", "SF Mono", "ui-monospace", "Menlo", "monospace"],
}
boxShadow: {
  card: "0 18px 45px rgba(14, 47, 98, 0.12)",
}
```

Global component classes in `site/src/styles/global.css`:

```
.section-shell   — max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
.surface-card    — rounded-2xl border bg-white/95 p-6 shadow-card
.btn-primary     — gold bg, navy text, rounded-full
.btn-secondary   — white/10 bg, white text, rounded-full (dark bg only)
.btn-outline     — white bg, navy border + text, rounded-full
.eyebrow         — xs uppercase gold tracking-wide
.compare-tick    — emerald-500 bold
.compare-cross   — red-400 bold
.compare-partial — amber-500 bold
.photo-duotone   — navy overlay via ::after pseudo-element
.schema-blur     — blur(3px) with hover reveal
.code-tab-active — brand-gold border-b
```

---

## 14. Do / Don't quick reference

| Do | Don't |
|----|-------|
| Use `brand-navy` + `brand-gold` as the primary duo | Introduce new primary colours |
| Use `rounded-full` for all buttons | Mix `rounded-lg` buttons with `rounded-full` ones |
| Add `min-w-0` to grid children with long content | Let `<pre>` or Chinese text overflow on mobile |
| Use `font-mono` for all data / numbers / captions | Mix sans-serif into code previews |
| Write formal 書面語 in zh-Hant copy | Use Cantonese particles (嘅, 係, 喺, 哋) |
| Use `data-lead-intent` to trigger the modal | Write custom modal open logic |
| Use `getWhatsappHref()` for all WhatsApp links | Hard-code `wa.me/...` URLs directly |
| Use `aria-hidden="true"` on decorative icons | Leave icon-only buttons without `aria-label` |
| Escape `&#123;` `&#125;` in Astro `<pre>` blocks | Use literal `{` `}` in `.astro` templates |
| Update both zh + en pages in every content PR | Ship a locale without updating the mirror |

---

_Last updated: 2026-05-15. Update this file whenever you change the palette,
add a new component class, or change a structural layout pattern._
