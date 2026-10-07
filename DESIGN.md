# Design System: Deal Sheet Portfolio

## Design Read

Developer portfolio for a Corp Dev Director and ex-IB professional (75+ deals), styled as a terminal/deal book. Bold, ownable, and intentionally finance-coded.

## Direction: Deal Sheet

**Source:** M&A tombstones, Bloomberg terminal amber, deal books, pitch decks. The aesthetic of someone who builds tools for finance.

**Signature elements:**
1. **Tombstone cards** - Project cards styled as framed M&A announcement tombstones
2. **Ticker strip** - Horizontal scrolling tape with real project facts
3. **Hero featured tombstone** - Compact tombstone in hero right column

## Taste-Skill Dials

| Dial | Value | Rationale |
|------|-------|-----------|
| DESIGN_VARIANCE | 8 | Asymmetric layout, poster-scale hero with featured tombstone |
| MOTION_INTENSITY | 7 | Ticker marquee, progressive-enhancement reveals, hover states |
| VISUAL_DENSITY | 6 | Dense tombstone metadata, ticker strip, mono data labels |

## Palette

```css
:root {
  --color-ground: #0f0d0c;
  --color-surface: #1a1816;
  --color-surface-elevated: #242120;
  --color-ink: #fafaf9;
  --color-ink-muted: #a8a29e;
  --color-ink-faint: #78716c;
  --color-signal: #f59e0b;
  --color-signal-hover: #fbbf24;
  --color-signal-dim: rgba(245, 158, 11, 0.15);
  --color-border: #292524;
  --color-border-strong: #44403c;
}
```

## Typography

| Role | Family | Weight | Use |
|------|--------|--------|-----|
| Display | Outfit | 900 (Black) | Hero headline at poster scale |
| Headings | Outfit | 700 | Section heads, tombstone titles |
| Body | Outfit | 400 | Descriptions, paragraphs |
| Data | JetBrains Mono | 400-600 | Labels, status badges, ticker |

**Hero scale:** `clamp(3rem, 8vw, 7rem)` with `-0.03em` letter-spacing.

**Numeric treatment:** `font-feature-settings: 'tnum' 1` and `tabular-nums` on all numbers.

## Projects (Accurate Data)

| Project | Transaction | Stack | Status |
|---------|-------------|-------|--------|
| Buffett's Edge | SEC XBRL operating segment visualization | React, D3.js, SEC XBRL | LIVE |
| Performance Lab | Indoor golf simulator club | Next.js, Tailwind | LIVE |
| Portico | Guest list and address tracker | Next.js, Prisma, Clerk | LIVE |
| Optimeyed Dashboard | Vision benefits verification platform | Python, FastAPI, React | DEMO |
| Major Madness | Fantasy golf pools | TypeScript, React | DEMO |

## Components

### Tombstone Card

Styled as M&A deal announcement frames:
- 2px solid border (signal color on hover)
- Left accent bar that reveals on hover
- Signal-color glow shadow on hover

**Content structure:**
1. Project name (large, display font)
2. Transaction line (mono, describes what it does)
3. Description (body text)
4. Stack tags (signal-dim background)
5. Status badge (LIVE = signal background, DEMO = surface background)

**Animation:**
- Content visible by default (no opacity: 0 initial state)
- Progressive enhancement via IntersectionObserver
- Falls back to immediate visibility after 1s timeout
- Respects `prefers-reduced-motion` - no animation

**Compact variant:**
- Used in hero right column
- Smaller padding, no description, just name + transaction + thumbnail

### Ticker Strip

Horizontally scrolling marquee under the hero:
- Duplicated content for seamless loop
- 40s linear infinite animation
- Items: label (faint) + value (ink) + optional status badge

**Content (accurate facts only):**
- Project names with LIVE/DEMO status
- Stack technologies
- No fake metrics, user counts, or testimonials

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
- **Hero:** Two-column grid - headline left, compact featured tombstone right
- **Ticker:** Full-width, border-top and border-bottom
- **Deal Book:** Featured tombstone full-width, others in 2-col grid

## Animation Approach

**Progressive enhancement only:**
1. All content renders visible immediately (no initial opacity: 0)
2. IntersectionObserver adds reveal animation if JS available
3. Fallback timeout ensures content shows within 1s regardless
4. `prefers-reduced-motion` disables all animation entirely

This ensures content is never blank due to scroll-reveal issues.

## Accessibility

- Body text: #fafaf9 on #0f0d0c = 15.3:1 contrast (AAA)
- Muted text: #a8a29e on #0f0d0c = 7.1:1 contrast (AAA)
- Signal on ground: #f59e0b on #0f0d0c = 8.2:1 contrast (AAA)
- Focus states: Browser defaults visible
- Ticker: Stops under reduced motion
- All content visible without JS/scroll

## Files

```
src/
  index.css           - Tokens, fonts, ticker keyframes, reduced-motion
  App.tsx             - Layout, project data, hero with featured tombstone
  components/
    Header.tsx        - Minimal header with PB logo and GitHub link
    Footer.tsx        - Footer with branding
    Ticker.tsx        - Scrolling marquee component
    TombstoneCard.tsx - Deal tombstone card with progressive reveal
```
