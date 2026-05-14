# Horsorion Brand Spec — Evolved

Extracted from horsorion.com CSS, evolved for B2B data-platform positioning.

## Palette (OKLch)

```css
:root {
  --bg:       oklch(22% 0.065 264);  /* Deep navy canvas (#002366 → evolved) */
  --bg-alt:   oklch(18% 0.055 264);  /* Darker overlay, terminal chrome */
  --surface:  oklch(26% 0.05 264);   /* Card surfaces, data panels */
  --surface-hover: oklch(30% 0.045 264);
  --fg:       oklch(95% 0.005 100);  /* Primary text — off-white */
  --muted:    oklch(68% 0.025 265);  /* Secondary text — blue-grey */
  --border:   oklch(36% 0.04 264);   /* Subtle borders */
  --border-strong: oklch(48% 0.035 264);
  --accent:   oklch(82% 0.16 95);    /* Gold accent (#F2D44A → evolved, slightly richer) */
  --accent-glow: oklch(85% 0.18 95 / 0.2);
  --success:  oklch(62% 0.16 155);   /* Data-green */
  --warn:     oklch(78% 0.14 85);    /* Amber */
  --danger:   oklch(55% 0.21 25);    /* Red for alerts */

  --font-display: 'Nunito Sans', 'Noto Sans TC', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  --font-body:    'Nunito Sans', 'Noto Sans TC', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'IBM Plex Mono', 'SF Mono', ui-monospace, Menlo, monospace;
}
```

## Typography Scale

- Display / Hero: clamp(40px, 5vw, 72px), weight 800, letter-spacing -0.02em
- H2 section heads: clamp(24px, 3vw, 40px), weight 700
- H3 card heads: 18-20px, weight 700
- Body: 16px, weight 400, line-height 1.65
- Mono data: 14px, font-variant-numeric: tabular-nums
- Caption / label: 12px, weight 600, uppercase, letter-spacing 0.08em

## Posture Rules

1. **Dark canvas, high contrast.** Navy bg, off-white fg. No light-mode toggle — this is a terminal.
2. **Single gold accent.** Used for CTAs, active nav, data highlights, key metrics. Max 2 accent hits per viewport.
3. **Mono numerics everywhere.** All numbers, stats, prices, API params use tabular-nums mono.
4. **Hairline borders only.** 1px solid var(--border). No shadows except dropdowns/modals.
5. **No rounded cards above 4px.** Terminal precision, not friendly softness.
6. **Status pills inline.** Success/warn/danger indicators for data freshness, API status, tier level.
7. **Data-first layouts.** Tables, grids, metrics before decoration. No hero illustrations.
8. **Chinese-first typography.** Noto Sans TC for body, Nunito Sans for Latin/numerals. tate-chu-yoko for inline numbers in CJK runs.

## Brand Architecture

- **Horsorion.com** → B2B data platform (this prototype)
- **tips.horsorion.com** → HorsoTips (separate subdomain, not in nav)
- Social: LinkedIn only in footer (B2B audience). Twitter/GitHub optional.
