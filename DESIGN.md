# Design System: Peter Burrus Portfolio

## Design Read

Developer portfolio for a finance and operations builder, with a restrained professional language, leaning toward monospace typography for a data-centric, terminal-adjacent feel.

## Design Direction

**Source:** The aesthetic draws from the finance/ops domain - Bloomberg terminals, SEC filings, spreadsheet precision. Not artisan craft, not startup tech-bro gradient, not editorial luxury.

**Signature:** JetBrains Mono headlines on a clean slate ground. One flat blue for actions. Cards that vary by importance instead of sitting in identical rows.

## Dials

| Dial | Value | Rationale |
|------|-------|-----------|
| Variance | 6 | Enough asymmetry to feel designed (left-aligned hero, varied card sizes), not chaotic |
| Motion | 5 | Functional hover states, no scroll animations or entrance effects |
| Density | 4 | Readable and professional, not cramped |

## Palette

```css
:root {
  /* Ground */
  --color-ground: #f8fafc;     /* slate-50 */
  --color-surface: #ffffff;
  
  /* Ink */
  --color-ink: #0f172a;        /* slate-900 - primary text */
  --color-ink-muted: #475569;  /* slate-600 - secondary text */
  --color-ink-faint: #64748b;  /* slate-500 - tertiary text */
  
  /* Signal */
  --color-signal: #1d4ed8;     /* blue-700 - links, primary actions */
  --color-signal-hover: #1e40af; /* blue-800 */
  
  /* Border */
  --color-border: #e2e8f0;     /* slate-200 */
  --color-border-strong: #cbd5e1; /* slate-300 */
}
```

Dark mode inverts to slate-900 ground with slate-100 ink. Signal shifts to blue-500 for legibility.

## Typography

| Role | Family | Weight | Use |
|------|--------|--------|-----|
| Display | JetBrains Mono | 600 | Headings, name, project titles |
| Body | System sans | 400 | Paragraphs, descriptions |
| Data | JetBrains Mono | 400 | Tags, metadata |

**Scale:** 
- H1: text-3xl to text-5xl
- H2: text-lg to text-xl
- Body: text-base to text-lg
- Small: text-sm, text-xs

## Layout

- **Max width:** 5xl (64rem) for content
- **Hero:** Left-aligned, max-w-2xl text block, no centered template
- **Cards:** Featured project spans full width with image/text split; secondary projects in 2-col grid
- **Spacing:** Variable section padding (pt-16/pb-20 for hero, pb-24 for projects)

## Components

### Cards

| Variant | Radius | Use |
|---------|--------|-----|
| Featured | 8px | Large project with screenshot and full description |
| Default | 6px | Secondary projects in grid |
| Tag | 3px | Small metadata chips |

No uniform `rounded-2xl`. No `shadow-lg` halos. Border-based elevation.

### Buttons

- **Primary:** Solid `--color-signal` background, white text, 4px radius
- **Secondary:** Border only, ink text
- No gradients. No pill shapes.

### Links

- Inline links: `--color-signal` with no underline
- External icons: small arrow, not appended text arrows

## What This Design Avoids

Checked against the AI-design tell catalog:

- [x] **No purple/indigo gradient** (was blue-to-cyan in hero)
- [x] **No gradient text** (was `bg-clip-text` on headline)
- [x] **No Inter-only typography** (now JetBrains Mono display)
- [x] **No centered hero template** (now left-aligned)
- [x] **No uniform `rounded-2xl` cards** (varied radii by component)
- [x] **No identical 3-col feature grid** (featured card is distinct)
- [x] **No gradient CTA buttons** (solid flat blue)
- [x] **No cream/terracotta palette** (slate + blue, finance-derived)
- [x] **No decorative eyebrow pills** (removed)
- [x] **prefers-reduced-motion respected** (transitions disabled)

## Accessibility

- Body text passes WCAG AA (4.5:1) on both light and dark grounds
- Focus states visible via browser defaults
- `prefers-reduced-motion: reduce` disables all transitions
- All images have alt text via component props
