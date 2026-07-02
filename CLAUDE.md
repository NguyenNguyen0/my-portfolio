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

**Language policy**: English is the default written language for all UI copy, chatbot prompts, and error strings. Vietnamese is used ONLY for the proper name "Nguyễn Trung Nguyên" / "Trung Nguyên", or where a user explicitly asks for Vietnamese output.

**Page structure** (`src/app/page.tsx`): one route renders sections stacked vertically — `HeroSection → TechMarquee → AboutSection → StorySection → ProjectsSection → ContactSection → Footer` (separated by `PelletDivider`) — wrapped in `GridBackground` with a fixed `ResizableNavbar`. `ChatWidget` and `PortfolioActionsProvider` are mounted globally in `src/app/layout.tsx`, not in `page.tsx`. Note: `github-section.tsx` exists but is currently **not imported anywhere** — orphaned, not part of the live page.

**Component split:**

- `src/components/sections/` — page sections (almost all `'use client'` with framer-motion animations): `hero-section`, `tech-marquee`, `about-section`, `story-section`, `projects-section`, `contact-section`, `footer`, plus the orphaned `github-section`
- `src/components/ui/` — reusable primitives actually wired into the app: `card` (only consumer is `github-section`, so it's currently only reachable through orphaned code too), `marquee`, `grid-background`, `resizable-navbar`, `theme-toggle`, `pellet-divider`, `pac-man-runner`, `timeline` (used by `story-section`), `chat-widget`. There is no generic `button`/`input`/`textarea` primitive — forms use native elements styled directly (see `contact-section.tsx`). Don't add shadcn-style primitives speculatively; only add a `ui/` file when something actually imports it.

**Data layer** (`src/data/`): all portfolio content lives here as exported constants — no CMS, no database.

- `personalInfo.tsx` — bio facts and skill categories
- `projects.tsx` — `Project[]` array with the `Project` interface
- `socialLink.tsx` — social links array
- `techIcons.tsx` — tech stack icons for the marquee
- `story.ts` — timeline entries rendered by `story-section.tsx` / `ui/timeline.tsx`
- `readme-cache.json` — cached project README content used by the chatbot's `read_readme` tool, refreshed via `scripts/fetch-readmes.mjs`

**API routes** (`src/app/api/`):

- `mail/route.ts` — contact form POST handler using nodemailer over Gmail. Requires `MAIL_USER`, `MAIL_PASS` (Gmail app password), `MAIL_RECEIVER`.
- `chat/route.ts` — AI chatbot endpoint (`runtime = 'nodejs'`), see below. Requires `GROQ_API_KEY`.

See `.env.example` for the full list of required environment variables.

**AI chatbot** (`src/lib/chat/`, `src/components/ui/chat-widget.tsx`, `src/context/portfolio-actions.tsx`): a Groq-backed (`openai/gpt-oss-120b`, free tier — ~100k tokens/day) chat widget built on Vercel AI SDK v7, showcasing AG-UI-style tool calling and context engineering. Explicitly not a production support bot — the widget's hover tooltip states the limitation.

- `lib/chat/model.ts` — `createGroq` model instance
- `lib/chat/system-prompt.ts` — builds the system prompt injected into `streamText`
- `lib/chat/readme-cache.ts` — reads cached project READMEs from `data/readme-cache.json`
- `lib/chat/tools.ts` — `chatTools` passed to `streamText`: `read_readme` (fetches a project's cached README) plus AG-UI tools that return `{ ok, action, ...payload }` instead of mutating server state — `scroll_to_section`, `change_theme`, `change_accent_color`, `highlight_project`, `set_hero_description`, `focus_skill`, `reset_ui`
- `app/api/chat/route.ts` — `streamText` with `chatTools`, `stopWhen: stepCountIs(3)`, `temperature: 0.4`, and `toUIMessageStreamResponse({ onError })`. `onError` classifies Groq rate-limit errors vs. other runtime errors into an English message sent down the stream as an `error` SSE event — the UI must never go silent.
- `components/ui/chat-widget.tsx` — manually parses the `text/event-stream` body (`text-delta`, `tool-output-available`, `error` events), renders assistant replies as Markdown, and on `tool-output-available` either calls a browser API directly (`scroll_to_section` → `scrollIntoView`, `change_theme` → `next-themes`'s `setTheme`) or dispatches to `usePortfolioActions()` (`change_accent_color`, `highlight_project`, `set_hero_description`, `focus_skill`, `reset_ui`). Empty state shows `PROMPT_CHIPS` — quick prompts demoing each tool. Falls back to an English error string if the stream ends with no text and no error event.
- `context/portfolio-actions.tsx` — `PortfolioActionsContext`, a `useReducer` store (`accentColor`, `highlightedProject`, `heroDescription`, `focusedSkill`) that sections read to render chatbot-driven UI overrides (e.g. `projects-section.tsx` rings the highlighted card, `hero-section.tsx` swaps its description text).

**Theming**: `next-themes` with `attribute="class"`, `defaultTheme="dark"`, `enableSystem`. Theme tokens are CSS custom properties in `src/app/globals.css` (`:root` = dark/default palette, `.light` = light overrides, mapped to Tailwind utilities via `@theme inline`) — `bg-card`, `bg-muted`, `text-muted-foreground`, etc. When styling sections, never hardcode `#hex` or `rgba(255,255,255,…)` backgrounds; use the token classes, or `color-mix(in oklch, var(--foreground) X%, transparent)` for tint overlays that need to flip with the theme. `ThemeToggle` lives in `src/components/ui/theme-toggle.tsx`.

**Fonts**: `Be Vietnam Pro` (primary body, via `next/font/google`) with Geist Sans/Mono as fallbacks, plus pixel-art display fonts `Press Start 2P`, `Space Mono`, `VT323` (CSS vars `--font-press-start`, `--font-space-mono`, `--font-vt323`) used for the retro/pixel UI accents (section labels, chat widget header, etc.) — all injected as CSS variables on `<body>` in `layout.tsx`.

**To add a project**: append an entry to the `projects` array in `src/data/projects.tsx` following the `Project` interface. Project images go in `public/projects/`. If the project has a GitHub/GitLab repo URL set, the chatbot's `read_readme` tool picks it up automatically via `findProjectRepo` in `tools.ts` — no extra wiring needed.

**Navigation**: anchor links (`#hero`, `#about`, `#story`, `#projects-section`, `#contact-section`) — the navbar scrolls to the matching `id`. The chatbot's `scroll_to_section` tool targets the same ids (`SECTION_IDS` in `tools.ts`).
