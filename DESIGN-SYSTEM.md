# DESIGN-SYSTEM.md

Portfolio re-design based on the **Pacman Design System** — retro arcade aesthetic applied to a professional developer portfolio. High-contrast, pixel-sharp, playful but credible.

---

## 1. Brand Concept

> "A maze with a clear path, pellets to guide you, and a hero who keeps moving forward."

The page IS the maze. Each section is a corridor. The pellet dots (`· · ·`) are the navigation trail. Pac-Man yellow is the hero — used only where the user needs to act. Ghost colors (blue, pink) are supporting cast. The aesthetic is arcade-genuine, not ironic.

**Single signature element:** Pellet dividers — rows of yellow dots separating every section, like coins in a Pac-Man level. This one device unifies the entire page without requiring every component to scream "retro".

---

## 2. Color Tokens

### Design Palette
| Token | Hex | OKLCH | Role |
|---|---|---|---|
| `--pac-black` | `#000000` | `oklch(0 0 0)` | Surface — maze floor |
| `--pac-yellow` | `#FFD700` | `oklch(87.6% 0.179 95.4)` | Pac-Man — primary CTA, key highlights |
| `--pac-blue` | `#2A3FE5` | `oklch(44.8% 0.249 264.1)` | Blinky ghost — secondary accent |
| `--pac-pink` | `#F4B9B0` | `oklch(82.7% 0.071 18.5)` | Pinky ghost — tertiary accent |
| `--pac-white` | `#F0F0F0` | `oklch(95% 0 0)` | Primary text on dark |
| `--pac-surface-1` | `#0D0D0D` | `oklch(6% 0 0)` | Elevated card surface |
| `--pac-surface-2` | `#1A1A1A` | `oklch(12% 0 0)` | Input/tag background |
| `--pac-muted` | `#666666` | `oklch(45% 0 0)` | Muted text |
| `--pac-success` | `#16A34A` | `oklch(51.8% 0.177 152.3)` | Success state |
| `--pac-danger` | `#DC2626` | `oklch(50.6% 0.214 27.3)` | Error/danger state |

### Dark Mode (default)
```css
:root {
  --background:         oklch(0 0 0);           /* #000000 */
  --foreground:         oklch(95% 0 0);          /* #F0F0F0 */
  --card:               oklch(6% 0 0);           /* #0D0D0D */
  --card-foreground:    oklch(95% 0 0);
  --primary:            oklch(87.6% 0.179 95.4); /* #FFD700 yellow */
  --primary-foreground: oklch(0 0 0);            /* black on yellow */
  --secondary:          oklch(44.8% 0.249 264.1);/* #2A3FE5 blue */
  --secondary-foreground: oklch(95% 0 0);
  --accent:             oklch(82.7% 0.071 18.5); /* #F4B9B0 pink */
  --accent-foreground:  oklch(0 0 0);
  --muted:              oklch(12% 0 0);          /* #1A1A1A */
  --muted-foreground:   oklch(45% 0 0);          /* #666666 */
  --border:             oklch(20% 0 0);
  --input:              oklch(12% 0 0);
  --ring:               oklch(87.6% 0.179 95.4); /* yellow focus ring */
  --destructive:        oklch(50.6% 0.214 27.3);
  --radius:             0px;                     /* pixel-sharp */
}
```

### Light Mode
```css
.light {
  --background:         oklch(98% 0 0);          /* near-white */
  --foreground:         oklch(10% 0 0);          /* near-black */
  --card:               oklch(100% 0 0);
  --card-foreground:    oklch(10% 0 0);
  --primary:            oklch(44.8% 0.249 264.1);/* blue in light */
  --primary-foreground: oklch(98% 0 0);
  --secondary:          oklch(87.6% 0.179 95.4); /* yellow accent in light */
  --secondary-foreground: oklch(10% 0 0);
  --accent:             oklch(82.7% 0.071 18.5); /* pink */
  --accent-foreground:  oklch(10% 0 0);
  --muted:              oklch(94% 0 0);
  --muted-foreground:   oklch(45% 0 0);
  --border:             oklch(82% 0 0);
  --input:              oklch(94% 0 0);
  --ring:               oklch(44.8% 0.249 264.1);/* blue focus ring */
  --radius:             0px;
}
```

### Usage Rules
- **Yellow (`--pac-yellow`)** must only be used in dark mode as primary. In light mode, yellow on white fails contrast — use blue as primary instead.
- **Dotted borders** must always maintain ≥ 3:1 contrast against their background.
- Never use `--pac-pink` as the only indicator — always pair with text or icon.

---

## 3. Typography

### Font Stack
| Role | Family | Weights | Usage |
|---|---|---|---|
| Display | `Press Start 2P` | 400 | Section headings (English only), labels, UI tags — use sparingly at large sizes |
| Mono | `Space Mono` | 400, 700 | Body text, descriptions, captions, code |
| Latin / Vietnamese | `Be Vietnam Pro` | 400–700 | Name "Nguyễn Trung Nguyên", Vietnamese content only |

> **Critical:** Press Start 2P has NO Vietnamese glyph support. Never use it for Vietnamese text or the user's name.

### Type Scale (8pt baseline grid)
```
display-2xl: Press Start 2P, 48px / 4rem,   line-height: 1.2
display-xl:  Press Start 2P, 32px / 2rem,   line-height: 1.3
display-lg:  Press Start 2P, 24px / 1.5rem, line-height: 1.4
display-md:  Press Start 2P, 16px / 1rem,   line-height: 1.5
body-lg:     Space Mono,     18px,           line-height: 1.7
body-md:     Space Mono,     14px / 0.875rem,line-height: 1.7
body-sm:     Space Mono,     12px / 0.75rem, line-height: 1.6
label:       Press Start 2P, 10px / 0.625rem,line-height: 1.5
```

### Applying Display Font
- Mobile: max `display-lg` (24px) — Press Start 2P at large sizes breaks layout on small screens
- Tablet (md): up to `display-xl` (32px)
- Desktop (lg+): up to `display-2xl` (48px)
- Section headings should never exceed the container width — test all breakpoints

### Font Loading (layout.tsx)
```tsx
import { Press_Start_2P, Space_Mono, Be_Vietnam_Pro } from 'next/font/google';

const pressStart2P = Press_Start_2P({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-press-start',
  display: 'swap',
  preload: false, // Only load when needed — it's large
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['400', '500', '600', '700'],
  subsets: ['vietnamese', 'latin'],
  variable: '--font-be-vietnam',
  display: 'swap',
  preload: true,
});
```

---

## 4. Spacing

8pt baseline grid. All padding/margin/gap values must be multiples of 8px (Tailwind: `2 = 8px`, `4 = 16px`, `6 = 24px`, `8 = 32px`).

| Token | px | Tailwind |
|---|---|---|
| xs | 8px | `p-2` |
| sm | 16px | `p-4` |
| md | 24px | `p-6` |
| lg | 32px | `p-8` |
| xl | 48px | `py-12` |
| 2xl | 64px | `py-16` |
| 3xl | 96px | `py-24` |

Section vertical padding: `py-16` (mobile) → `py-24` (desktop).

---

## 5. Border System

### The Core Rule: Dotted Everywhere
All card/container borders use `border-dotted`. Solid borders are reserved for hover/active/focus states only.

```css
/* Default card border */
border: 1px dotted var(--border);

/* Hover state — border becomes solid */
&:hover {
  border-style: solid;
  border-color: var(--primary);  /* yellow in dark, blue in light */
}

/* Focus ring */
outline: 2px dotted var(--ring);
outline-offset: 2px;
```

### Border Radius
`--radius: 0px` everywhere except:
- Avatar image: `border-radius: 50%`
- Toast/notification: `border-radius: 2px` (1-pixel rounding as concession for readability)

---

## 6. Signature Element — Pellet Divider

Between every major section, a row of yellow dots acts as a visual separator.

```tsx
// src/components/ui/pellet-divider.tsx
// Renders: · · · · · · · · · · · · · · · · ·
// Yellow in dark mode, blue in light mode
// Animates: dots appear L→R on scroll into view
```

**Rules:**
- Always full-width of its container
- Dot size: 6px × 6px, gap: 12px between dots
- Color: `var(--primary)` (yellow dark / blue light)
- Animation: stagger left-to-right on `whileInView`, `once: true`
- Never replace with `<hr>` or any solid line

---

## 7. Animation System

### Principles
- **One orchestrated entrance** per section — stagger children, not scatter
- **Pixel-shift hover** instead of scale: `translateY(-2px)` or `translateX(2px)` — feels more "arcade"
- **Reduced motion**: all animations respect `prefers-reduced-motion: reduce` via Tailwind's `motion-reduce:` prefix and framer-motion's `useReducedMotion()`
- **No ambient/infinite loops** on body content — pellet divider entrance is the only "just for fun" animation

### Standard Motion Variants (framer-motion)
```ts
// Fade up — section entrance
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Stagger container
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// Pixel slide — card/item entrance
const pixelSlide = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// Pellet pop — divider dots
const pelletPop = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 400, damping: 15 } },
};
```

### Component-specific Animations
| Component | Animation |
|---|---|
| Hero "INSERT COIN" label | CSS blink `animation: blink 1s step-end infinite` |
| Hero headline | `fadeUp`, delay 0.2s after blink |
| Hero CTAs | `fadeUp`, delay 0.4s |
| Navbar | Slide down from top on mount |
| Pellet Divider | Left-to-right stagger, `once: true` |
| Timeline nodes | Pulse glow on `whileInView` |
| Timeline content | Alternating `pixelSlide` L/R (desktop); all from left (mobile) |
| Card hover | `translateY(-2px)`, border switches dotted→solid |
| Button hover | `translateY(-2px)`, no scale |
| Tech badge hover | `translateY(-2px)` + glow shadow |
| Page scroll indicator | Bouncing arrow, infinite, reduced-motion aware |

### Blink Keyframe
```css
@keyframes pixel-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
/* Usage: animate-[pixel-blink_1s_step-end_infinite] */
```

---

## 8. Responsive Breakpoints

Tailwind defaults, mobile-first:
```
sm:  640px  — mobile landscape / large phone
md:  768px  — tablet portrait
lg:  1024px — tablet landscape / small desktop
xl:  1280px — desktop
2xl: 1536px — large desktop
```

### Section Layout Rules
| Section | Mobile | Tablet (md) | Desktop (lg) |
|---|---|---|---|
| Hero | 1-col, center | 1-col, center | 1-col, center |
| About | 1-col stack | 2-col grid | 2-col grid |
| Story Timeline | 1-col (left-aligned nodes) | 1-col (centered nodes) | 2-col alternating |
| Projects | 1-col | 2-col | 2-col |
| Contact | 1-col stack | 2-col | 2-col |
| Navbar | Hamburger menu | Full horizontal | Full horizontal |

### Press Start 2P Responsive Scale
```
Mobile:  display-lg  24px — max safe size on 375px screen
Tablet:  display-xl  32px
Desktop: display-2xl 48px — section headings only
```

---

## 9. Component Specifications

### 9.1 Pellet Divider
```
Anatomy: [· gap · gap · gap · ... full width]
Dot:     6×6px circle, color: var(--primary)
Gap:     12px between dots
Animation: stagger 20ms per dot, L→R, once on scroll
Height:  24px total (including padding)
Margin:  section-top/bottom spacing handled by parent
```

### 9.2 Navbar
```
Height: 64px (h-16)
Background: transparent → var(--background)/80 backdrop-blur on scroll
Border-bottom: 1px dotted var(--border) always visible
Logo: dev-icon.png, 44×44px
Nav items: Space Mono 14px, uppercase, letter-spacing 0.05em
Mobile: hamburger → full-screen overlay with dotted border items
Active section: primary color text
```

### 9.3 Hero Section
```
Layout: full viewport height, centered vertically
Layer 1: subtle maze dot pattern (background-image: radial-gradient dots)
Layer 2: "INSERT COIN ▶" — Press Start 2P 10px, blinking, primary color, mb-8
Layer 3: Name — Be Vietnam Pro 48-72px (responsive), bold
Layer 4: Role — Press Start 2P 16-24px (responsive), muted-foreground
Layer 5: Description — Space Mono 16px, muted, max-w-2xl
Layer 6: CTAs — 2 buttons, stacked mobile / side-by-side desktop
Scroll indicator: bouncing ↓ arrow at bottom center

Background: maze dot pattern
  background-image: radial-gradient(circle, var(--muted) 1px, transparent 1px)
  background-size: 32px 32px
  opacity: 0.3
```

### 9.4 CTA Buttons
```
Primary (VIEW WORK):
  bg: var(--primary) [yellow dark / blue light]
  text: var(--primary-foreground) [black / white]
  border: 2px solid var(--primary)
  border-radius: 0
  padding: 12px 24px
  font: Press Start 2P 12px
  hover: translateY(-2px), box-shadow: 4px 4px 0 var(--primary)/50

Secondary (CONTACT):
  bg: transparent
  text: var(--foreground)
  border: 2px dotted var(--foreground)
  hover: border-style solid, border-color var(--primary), text var(--primary)
```

### 9.5 Tech Badge (Marquee)
```
Shape: rectangle (radius 0), not pill
Border: 1px dotted var(--border)
Background: var(--card)
Padding: 8px 16px
Font: Space Mono 12px
Icon: 18×18px
Hover: translateY(-2px), border solid var(--primary)
Gap between badges: 12px
```

### 9.6 Skill Tag (About Section)
```
Same as Tech Badge but smaller: padding 4px 12px, font 11px
Variant colors per category:
  Languages: border var(--secondary) [blue], bg secondary/10
  Frontend:  border var(--accent) [pink], bg accent/10
  Backend:   border var(--primary) [yellow], bg primary/10
  Tools:     border var(--muted-foreground), bg muted
```

### 9.7 Timeline Component
```
Desktop layout (≥ lg):
  Vertical line: 2px dotted, color var(--border), centered
  Nodes (◉): 16×16px circle, border 2px solid var(--primary)
              center-dot 6×6px filled var(--primary)
              pulse animation on whileInView
  Content cards: alternate left/right of center line
  Card width: calc(50% - 48px)
  Connector: 32px horizontal dotted line from node to card

Tablet/Mobile (< lg):
  Vertical line: left-aligned at x=24px
  Nodes: at x=24px, same style
  Content cards: full width, margin-left 56px
  No alternating — all content on right

Card anatomy:
  Year label: Press Start 2P 10px, color var(--primary), mb-8px
  Level label: Press Start 2P 14px, color var(--foreground), mb-8px  
  Body text: Space Mono 14px, color var(--muted-foreground)
  Border: 1px dotted var(--border)
  Background: var(--card)
  Padding: 24px
  Hover: border solid var(--primary)

Animation:
  Odd cards: enter from left (x: -24 → 0)
  Even cards: enter from right (x: 24 → 0)
  Mobile: all from left
  Node: scale 0 → 1 with spring, then pulse (scale 1 → 1.2 → 1, 0.5s, once)
  Stagger: 0.15s between nodes
```

### 9.8 Project Card
```
Replaces BentoGrid with uniform 2-col grid
Card border: 1px dotted var(--border)
Background: var(--card)
Image area: 200px height, object-cover
Tech tags: Skill Tag style
Buttons (Code/Demo): Secondary CTA style, full border
Hover: entire card translateY(-2px), border solid var(--primary)
No scale transform — pixel-shift only
```

### 9.9 Contact Form
```
Inputs/Textarea:
  border: 1px dotted var(--border)
  border-radius: 0
  background: var(--input)
  font: Space Mono 14px
  placeholder: Space Mono, muted
  focus: outline 2px dotted var(--ring), border solid
  error: border-color var(--destructive) 1px solid

Submit button: Primary CTA style, full width, Press Start 2P 12px
```

### 9.10 Footer
```
Style: Arcade HIGH SCORE table
Content:
  "HIGH SCORE" — Press Start 2P 10px, muted, center
  "1ST  NGUYENNGUYEN0  ∞ PTS" — Press Start 2P 14px, primary
  "© 2025 · ALL RIGHTS RESERVED" — Space Mono 12px, muted
Border-top: 1px dotted var(--border)
Background: var(--background)
Padding: 32px
```

---

## 10. Dark / Light Mode Strategy

`next-themes` with `attribute="class"`, `defaultTheme="dark"`.

| Element | Dark | Light |
|---|---|---|
| Primary color | Yellow `#FFD700` | Blue `#2A3FE5` |
| Background maze dots | White 3% opacity | Black 3% opacity |
| Code/mono text | `#F4B9B0` (pink) | `#2A3FE5` (blue) |
| Card bg | `#0D0D0D` | `#FFFFFF` |
| Pellet dots | Yellow | Blue |
| CTA primary | Yellow fill, black text | Blue fill, white text |

Theme toggle: maintain existing `ThemeToggle` component, reskin to pixel icon style.

---

## 11. Background — Maze Dot Pattern

Used in Hero and optionally as very subtle full-page texture:
```css
.maze-bg {
  background-image: radial-gradient(
    circle,
    oklch(50% 0 0 / 0.15) 1px,
    transparent 1px
  );
  background-size: 32px 32px;
}

.dark .maze-bg {
  background-image: radial-gradient(
    circle,
    oklch(100% 0 0 / 0.04) 1px,
    transparent 1px
  );
}
```

---

## 12. Accessibility

- **Contrast:** All text ≥ 4.5:1 (AA). Yellow `#FFD700` on black `#000000` = 12.7:1 ✓. Blue `#2A3FE5` on white `#FAFAFA` = 5.5:1 ✓.
- **Focus visible:** 2px dotted `var(--ring)`, offset 2px — never hidden
- **Touch targets:** minimum 44×44px for all interactive elements
- **Motion:** all framer-motion animations behind `useReducedMotion()` check — skip to final state if reduced
- **Screen readers:** `aria-label`, `role`, `aria-current="page"` on nav, semantic HTML throughout
- **Press Start 2P legibility:** never below 10px rendered size; body text stays on Space Mono/Be Vietnam Pro

---

## 13. Page Structure (final)

```
layout.tsx
└── ThemeProvider
    └── page.tsx
        ├── GridBackground (maze-bg variant)
        ├── ResizableNavbar
        └── main
            ├── #hero      → HeroSection
            ├── PelletDivider
            ├── TechMarquee
            ├── PelletDivider
            ├── #about     → AboutSection
            ├── PelletDivider
            ├── #story     → StorySection  ← NEW
            ├── PelletDivider
            ├── #projects  → ProjectsSection
            ├── PelletDivider
            ├── #contact   → ContactSection
            └── Footer
```

---

## 14. Story Section — Content

| Year | Pixel Label | Title | Body |
|---|---|---|---|
| 2019 | GAME START | First Contact | Gặp Python lần đầu. `print("Hello World")` chạy ra màn hình — không hiểu tại sao nhưng thích. |
| 2021 | LEVEL 1 | University Unlocked | Vào IUH ngành Kỹ thuật phần mềm. Java, OOP, thuật toán — lần đầu hiểu code là tư duy, không chỉ là gõ phím. |
| 2022 | LEVEL 2 | Backend Clicked | RESTful APIs với Node.js. Lần đầu build server từ 0, thấy request đi vào và response trả về — nghiện. |
| 2023 | LEVEL 3 | Full Stack Expansion | React, Next.js, FastAPI, Docker. Hệ sinh thái mở rộng. Nhận ra backend mạnh hơn khi hiểu cả frontend. |
| 2024 | LEVEL 4 | AI & Design Thinking | Tích hợp AI vào projects, học API Design nghiêm túc, bắt đầu quan tâm đến UI/UX như một kỹ năng kỹ thuật. |
| Now | NOW LOADING… | What's Next | Tìm kiếm cơ hội để xây dựng thứ gì đó có ý nghĩa thực sự. Open to collaborate. |

---

## 15. Anti-Patterns

- **Never** use gradient text (`bg-clip-text`) — violates pixel aesthetic
- **Never** use `rounded-lg` or higher on cards/inputs/buttons
- **Never** use smooth scale hover (`scale: 1.05`) — use `translateY(-2px)` instead
- **Never** use Press Start 2P for Vietnamese text or body copy
- **Never** use yellow on white background — always swap to blue in light mode
- **Never** add decorative motion without `useReducedMotion()` guard
- **Never** use `backdrop-blur` on cards (only navbar) — kills performance on mobile
- **Never** mix both yellow AND blue as primary on the same section — pick one per mode

---

## 16. QA Checklist

Before shipping each section:
- [ ] Rendered at 375px (iPhone SE) — no horizontal overflow
- [ ] Rendered at 768px (iPad) — layout switches correctly
- [ ] Rendered at 1280px — full desktop layout
- [ ] Toggle light mode — contrast passes, yellow swaps to blue
- [ ] Tab through all interactive elements — focus rings visible
- [ ] `prefers-reduced-motion: reduce` — no animations running
- [ ] Press Start 2P only on English text — Vietnamese uses Be Vietnam Pro
- [ ] All card borders are `border-dotted` by default
- [ ] All hover states use `translateY(-2px)`, no scale on cards
- [ ] Pellet divider appears between every section
