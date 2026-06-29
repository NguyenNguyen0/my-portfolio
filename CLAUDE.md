# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server on localhost:3000
npm run build      # Production build (runs ESLint, TypeScript checks)
npm run lint       # ESLint (next/core-web-vitals + next/typescript rules)
npm run format     # Prettier write
npm run format:check  # Prettier check (CI)
```

There are no tests in this project.

## Architecture

Single-page Next.js 15 portfolio site (App Router, React 19, TypeScript, Tailwind CSS v4). Deployed to Vercel as `output: 'standalone'`.

**Page structure** (`src/app/page.tsx`): one route renders all sections stacked vertically — `HeroSection → TechMarquee → AboutSection → ProjectsSection → GitHubSection → ContactSection → Footer` — wrapped in `GridBackground` with a fixed `ResizableNavbar`.

**Component split:**
- `src/components/sections/` — page sections (almost all `'use client'` with framer-motion animations)
- `src/components/ui/` — reusable primitives (shadcn/ui style: `button`, `card`, `input`, `textarea`, plus custom `bento-grid`, `marquee`, `spotlight-card`, `hero-highlight`, etc.)

**Data layer** (`src/data/`): all portfolio content lives here as exported constants — no CMS, no database.
- `personalInfo.tsx` — bio facts and skill categories
- `projects.tsx` — `Project[]` array with the `Project` interface
- `socialLink.tsx` — social links array
- `techIcons.tsx` — tech stack icons for the marquee

**API route** (`src/app/api/mail/route.ts`): contact form POST handler using nodemailer over Gmail. Requires two environment variables:
- `MAIL_USER` — Gmail address used to send
- `MAIL_PASS` — Gmail app password
- `MAIL_RECEIVER` — destination email address

**GitHub section** (`github-section.tsx`): fetches live data client-side via `@octokit/rest` (unauthenticated). Displays profile stats, top 4 repos by stars, and a `react-github-calendar` contribution heatmap. `GITHUB_USERNAME` is hardcoded as `'NguyenNguyen0'`.

**Theming**: `next-themes` with `attribute="class"` and `defaultTheme="dark"`. The `ThemeToggle` component lives in `src/components/ui/theme-toggle.tsx`. The GitHub calendar adjusts its `colorScheme` based on the active theme.

**Fonts**: `Be Vietnam Pro` (primary, loaded via `next/font/google`) with Geist Sans and Geist Mono as fallbacks — all injected as CSS variables and applied on `<body>`.

**To add a project**: append an entry to the `projects` array in `src/data/projects.tsx` following the `Project` interface. Project images go in `public/projects/`.

**Navigation**: anchor links (`#hero`, `#about`, `#projects`, `#github`, `#contact`) — the navbar scrolls the user to the matching `id` on the single page.
