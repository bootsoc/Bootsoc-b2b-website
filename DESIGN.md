# BootSoc design system

**Design read:** B2B demand-gen and intent-data agency site for demand-gen and marketing-ops leaders at technology companies in the US, UK and Canada. It uses a bold, high-contrast "signal" language: Tailwind v4 tokens, Radix-grade accessibility, Motion for UI and GSAP for one scroll story.

**Dials:** DESIGN_VARIANCE 7 · MOTION_INTENSITY 7 · VISUAL_DENSITY 4

**Skills this follows:** design-taste-frontend, high-end-visual-design, Vercel Web Interface Guidelines, vercel-react-best-practices and Emil Kowalski's design-engineering skills (`emil-design-eng`, `animate`, `review-animations`), all in `.claude/skills/`.

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

**Theme:** follows the visitor's system setting until they pick one with the sun/moon toggle (stored as `bs-theme`). The browser UI colour (`theme-color`) follows the active theme. Every page is tested in both themes with axe.

**Contrast:** dim inactive states by colour (`text-muted`), never by opacity. Opacity dimming dropped some text below 4.5:1.

## Type
- **Display:** Clash Display 600 (Fontshare), tracking −0.02em, line-height 1.02, `text-wrap: balance`
- **Body/UI:** Satoshi 400/500/700 (Fontshare). Loaded from Fontshare's CDN; never commit the font files to the public repo (ITF FFL).
- **Data:** Geist Mono, only for numeric values in the estimator and pipeline, with `tabular-nums`
- Sentence case everywhere. No all-caps eyebrow labels. Max 1 eyebrow per 3 sections.

## Shape
- Interactive (buttons, chips, toggles): full pill
- Media and panels: 24px (`rounded-[1.5rem]`); nested inner cores are `calc(1.5rem - 6px)`
- Inputs: 12px

## Motion
Two kinds of motion with different rules:

**Interface motion** (anything a visitor triggers), per Emil Kowalski's skills:
- Curves: `--ease-out` `cubic-bezier(0.23, 1, 0.32, 1)` for entering and exiting (overrides Tailwind's `ease-out`), `--ease-in-out` `cubic-bezier(0.77, 0, 0.175, 1)` for things moving on screen. Never `ease-in`.
- Durations: press feedback 160ms, hovers 200–250ms, menus and dropdowns ~200ms, modals ~220ms. Stay under 300ms.
- Exits are faster than entrances (e.g. dropdown 200ms in, 120ms out; cookie banner 400ms in, 180ms out).
- Every pressable element scales to `0.97` on `:active`.
- Nothing appears from `scale(0)`; start at 0.94–0.97 with opacity 0. Dropdowns grow from their trigger; modals stay centred.
- State swaps (tab panels, theme icon, submit label) cross-fade with a 2px blur so they read as one change.
- FAQ answers animate open with `::details-content` and `interpolate-size` (progressive; other browsers snap open).

**Storytelling motion** (scroll and entrances, marketing content):
- `--ease-out-expo` `cubic-bezier(0.16, 1, 0.3, 1)`, 500–800ms entrances, 30–60ms stagger.
- Hero entrances never start at opacity 0 and use short delays, because the hero text is the LCP element.
- One signature scroll story per page at most (home: the verification pipeline, GSAP pin + scrub).
- One marquee on the site (client logos), with a pause button for keyboard and touch users (WCAG 2.2.2).
- Magnetic primary CTA, counter tick-ups, 3D tilt on the hero image.

**Reduced motion:** a global `MotionConfig reducedMotion="user"` (`src/components/motion/motion-provider.tsx`) skips transform animations and keeps fades. Components must render the same markup with and without reduced motion and let CSS (`motion-reduce:`) or Motion handle the difference. Branching markup on `useReducedMotion()` caused hydration errors.

## CTA intents (one label each)
- Talk to sales → **"Book a strategy call"** (`/contact`)
- Proof → **"Get a sample lead file"** (`/contact?intent=sample`)
- Tool → **"Size your audience"** (`/audience-estimator`)

## Page structure
- **Home (13 sections, 12 until a case study is published):** hero, client logos, metrics, manifesto, solutions bento, verification pipeline, comparison table, case studies (only when published), audience estimator teaser, IntentBuy network, trust strip (certifications and markets), FAQ, CTA band.
- **/solutions:** all solutions, role tabs, industries.
- **/trust:** sources, lawful basis, certifications (asymmetric layout), regions.
- **Layout variety:** no two neighbouring sections share a layout. Section headers stack (heading, then text) unless the right column holds real content.

## Mobile
- Every section declares its phone layout; nothing scrolls sideways (tested at 390px).
- Tap targets are at least 44px (footer links included).
- The cookie banner is compact on phones: three equal buttons in one row, so it doesn't cover the hero CTAs.
