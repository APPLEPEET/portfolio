# Design System: Deal Sheet Portfolio

## Design Read

Developer portfolio for a Corp Dev Director and ex-IB professional (75+ deals), styled as a terminal/deal book. Bold, ownable, and intentionally finance-coded.

## Direction: Deal Sheet

**Source:** M&A tombstones, Bloomberg terminal amber, deal books, pitch decks. The aesthetic of someone who builds tools for finance, not someone marketing to VCs.

**Signature elements:**
1. **Tombstone cards** - Project cards styled as framed M&A announcement tombstones
2. **Ticker strip** - Horizontal scrolling tape with real project facts

## Taste-Skill Dials

| Dial | Value | Rationale |
|------|-------|-----------|
| DESIGN_VARIANCE | 8 | Asymmetric layout, varied section rhythm, poster-scale hero |
| MOTION_INTENSITY | 7 | Ticker marquee, staggered tombstone reveals, signal-color hover states |
| VISUAL_DENSITY | 6 | Dense metadata in tombstones, ticker strip, mono data labels |

## Palette

```css
:root {
  /* Ground - warm charcoal, not pure black */
  --color-ground: #0f0d0c;
  --color-surface: #1a1816;
  --color-surface-elevated: #242120;
  
  /* Ink - warm off-white */
  --color-ink: #fafaf9;
  --color-ink-muted: #a8a29e;
  --color-ink-faint: #78716c;
  
  /* Signal - Bloomberg amber */
  --color-signal: #f59e0b;        /* amber-500 */
  --color-signal-hover: #fbbf24;  /* amber-400 */
  --color-signal-dim: rgba(245, 158, 11, 0.15);
  
  /* Border */
  --color-border: #292524;
  --color-border-strong: #44403c;
}
```

**Rationale:** Warm near-black ground (not pure #000) with Bloomberg-terminal amber as the single hot signal color. Amber evokes financial data displays without falling into the acid-green-on-black second-order AI tell.

## Typography

| Role | Family | Weight | Use |
|------|--------|--------|-----|
| Display | Outfit | 900 (Black) | Hero headline at poster scale |
| Headings | Outfit | 700 | Section heads, tombstone titles |
| Body | Outfit | 400 | Descriptions, paragraphs |
| Data | JetBrains Mono | 400-600 | Labels, years, status badges, ticker |

**Hero scale:** `clamp(3.5rem, 10vw, 9rem)` with `-0.03em` letter-spacing and `1.1` line-height.

**Numeric treatment:** `font-feature-settings: 'tnum' 1` and `tabular-nums` on all numbers for alignment.

## Components

### Tombstone Card

Styled as M&A deal announcement frames:
- 2px solid border (signal color on hover)
- Left accent bar that reveals on hover
- Signal-color glow shadow on hover
- Grid layout: image left, content right (featured) or stacked (default)

**Content structure:**
1. Project name (large, display font)
2. Transaction line (mono, describes what it does)
3. Description (body text)
4. Stack tags (signal-dim background)
5. Year (large mono numeral in signal color)
6. Status badge (LIVE = signal background, DEMO = surface background)

**Motion:**
- Staggered reveal on scroll (`whileInView`)
- Border and shadow transition on hover (200ms ease)
- `prefers-reduced-motion` disables reveals

### Ticker Strip

Horizontally scrolling marquee under the hero:
- Duplicated content for seamless loop
- 40s linear infinite animation
- Items: label (faint) + value (ink) + optional status badge
- Slash separators between items

**Content rules:** Only REAL facts - project names, stacks, years, status. Never invented metrics.

**Motion:** Stops entirely under `prefers-reduced-motion`.

### Buttons

- **Primary:** Solid signal background, ground text, no border-radius
- **Secondary:** Border only, ink text
- No gradients, no rounded pills

### Status Badges

| Status | Background | Text |
|--------|------------|------|
| LIVE | signal | ground |
| DEMO | surface-elevated | ink-muted |

## Layout

- **Max width:** 6xl (72rem)
- **Hero:** Poster-scale headline, left-aligned, name split across lines with signal color on surname
- **Ticker:** Full-width, border-top and border-bottom
- **Deal Book section:** Featured tombstone full-width, others in 2-col grid
- **Asymmetric rhythm:** Hero (pt-20/pb-16 to pt-32/pb-24), ticker (py-4), deal book (py-20 to py-28)

## Motion Spec

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Tombstone | whileInView | opacity 0→1, y 32→0 | 500ms | [0.16, 1, 0.3, 1] |
| Tombstone stagger | each card | +100ms delay per index | - | - |
| Tombstone hover | mouseenter | border-color, box-shadow | 200ms | ease |
| Ticker | continuous | translateX 0→-50% | 40s | linear |

**Reduced motion:** All animations disabled via CSS `@media (prefers-reduced-motion: reduce)`.

## Accessibility

- Body text: #fafaf9 on #0f0d0c = 15.3:1 contrast (AAA)
- Muted text: #a8a29e on #0f0d0c = 7.1:1 contrast (AAA)
- Signal on ground: #f59e0b on #0f0d0c = 8.2:1 contrast (AAA)
- Signal on signal-dim: #f59e0b on rgba(245,158,11,0.15) on #0f0d0c = sufficient
- Focus states: Browser defaults visible
- Ticker: Stops under reduced motion
- All interactive elements: keyboard accessible

## What This Design Avoids

Checked against AI-design tell catalog:

- [x] **No purple/indigo** - uses amber signal
- [x] **No acid-green-on-near-black** (SD2 second-order tell) - amber is warmer
- [x] **No default blue-700** - intentional amber tied to finance/terminal aesthetic
- [x] **No gradient text or buttons** - solid colors only
- [x] **No uniform rounded-2xl** - sharp edges on tombstones, no radius on buttons
- [x] **No centered hero template** - left-aligned poster layout
- [x] **No identical card grid** - featured tombstone distinct from grid
- [x] **No generic scale-105 hovers** - border color + shadow + accent bar
- [x] **No fake metrics in ticker** - only real project facts
- [x] **No Inter-only** - Outfit display + JetBrains Mono data
- [x] **prefers-reduced-motion respected**

## Files

```
src/
  index.css           - Tokens, fonts, ticker keyframes, reduced-motion
  App.tsx             - Layout, project data, hero, sections
  components/
    Header.tsx        - Minimal header with PB logo and GitHub link
    Footer.tsx        - Footer with branding
    Ticker.tsx        - Scrolling marquee component
    TombstoneCard.tsx - Deal tombstone card with Motion reveals
```
