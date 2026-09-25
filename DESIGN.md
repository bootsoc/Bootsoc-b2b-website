# BootSoc design system

**Design read:** B2B demand-gen and intent-data agency site for demand-gen and marketing-ops leaders at technology companies in the US, UK and Canada. It uses a bold, high-contrast "signal" language: Tailwind v4 tokens, Radix-grade accessibility, Motion for UI and GSAP for one scroll story.

**Dials:** DESIGN_VARIANCE 7 · MOTION_INTENSITY 7 · VISUAL_DENSITY 4

## Tokens

| Token | Dark (default) | Light | Role |
|---|---|---|---|
| `--bg` | `#0B0B0A` | `#F5F5F4` | Page |
| `--raise` | `#151513` | `#FFFFFF` | Raised surfaces |
| `--line` | `#2A2A26` | `#DEDED9` | Hairlines |
| `--muted` | `#A1A197` | `#57574F` | Secondary text (≥ 4.5:1 on bg) |
| `--fg` | `#F4F4EF` | `#0B0B0A` | Primary text |
| `--signal` | `#FFF100` | `#FFF100` | Brand yellow. On light, only a **fill** behind ink text, never text itself |
| `--on-signal` | `#0B0B0A` | `#0B0B0A` | Text on yellow |

Brand yellow is the only accent (Color Consistency Lock). No purple, no gradients-as-decoration.

## Type
- **Display:** Bricolage Grotesque, 600, `wdth` 100, tracking −0.01em, line-height 1, `text-wrap: balance`
- **Body/UI:** Geist 400/500
- **Data:** Geist Mono, only for numeric values in the estimator and pipeline, with `tabular-nums`
- Sentence case everywhere. No all-caps eyebrow labels. Max 1 eyebrow per 3 sections.

## Shape
- Interactive (buttons, chips, toggles): full pill
- Media and panels: 24px (`rounded-[1.5rem]`); nested inner cores are `calc(1.5rem - 6px)`
- Inputs: 12px

## Motion
- Ease `cubic-bezier(0.16, 1, 0.3, 1)`, 500–800ms entrances, 40–70ms stagger
- One signature scroll story per page at most (home: the verification pipeline, GSAP pin + scrub)
- One marquee on the site (client logos)
- Magnetic primary CTA, counter tick-ups, and accordion and menu state transitions
- Everything collapses to static under `prefers-reduced-motion`

## CTA intents (one label each)
- Talk to sales → **"Book a strategy call"** (`/contact`)
- Proof → **"Get a sample lead file"** (`/contact?intent=sample`)
- Tool → **"Size your audience"** (`/audience-estimator`)
