# Chatbot Phase 2 — AG-UI Frontend Interaction Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Allow the chatbot to mutate the live portfolio UI: navigate sections, change accent color/theme, spotlight projects, override hero text, pulse-highlight constellation skills, and reset all overrides.

**Architecture:** The AI SDK v7 backend switches from `toTextStreamResponse()` to `toUIMessageStreamResponse()` (SSE with typed events). The chat widget parses SSE events to separate text deltas from tool-call events. A new `PortfolioActionsContext` holds persistent UI overrides (accent color, highlighted project, hero text, focused skill); three sections subscribe to it. Fire-and-forget actions (scroll, theme) are executed directly from the widget's SSE parser without going through context.

**Tech Stack:** Existing stack — Vercel AI SDK v7, next-themes (already installed), Zod, Framer Motion. Zero new dependencies.

## Global Constraints

- No new npm dependencies — use only what's already installed.
- AG-UI tools live in `src/lib/chat/tools.ts` alongside the existing `read_readme` tool.
- `PortfolioActionsContext` is the single source of truth for persistent overrides; components subscribe to it via `usePortfolioActions()`.
- Fire-and-forget actions (scroll, theme) are dispatched directly from the widget — they do NOT touch context state.
- All 7 AG-UI tools must validate input with Zod `inputSchema`; they return `{ok: true, ...payload}` on success.
- The backend route changes to `toUIMessageStreamResponse()` — the frontend SSE parser replaces the raw text reader.
- SSE event format (ai v7): `data: {"type":"text","text":"..."}` for text, `data: {"type":"tool-call","toolName":"...","args":{...}}` for calls.
- The `--primary` CSS variable is set on `document.documentElement.style` for accent overrides; `reset_ui` removes it.
- Existing Phase 1 Q&A functionality (read_readme, system prompt) must remain working.
- `GROQ_API_KEY` from `process.env` only, never client-side.
- All modified components remain `'use client'`.

## AG-UI Tool Catalogue

| Tool                   | Args                                                                  | Frontend effect                                               |
| ---------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------- |
| `scroll_to_section`    | `section: 'hero'\|'about'\|'story'\|'projects'\|'contact'`            | `scrollIntoView` on the matching `id`                         |
| `change_theme`         | `theme: 'dark'\|'light'`                                              | `setTheme(theme)` via next-themes                             |
| `change_accent_color`  | `color: 'yellow'\|'blue'\|'purple'\|'green'\|'red'\|'cyan'\|'orange'` | Set `--primary` + `--ring` CSS vars on `:root`                |
| `highlight_project`    | `projectId: string`                                                   | Scroll to `#projects-section`, add glow ring to matching card |
| `set_hero_description` | `text: string`                                                        | Replace hero description paragraph with new text              |
| `focus_skill`          | `skillId: string`                                                     | Pulse-animate matching constellation node in About            |
| `reset_ui`             | _(none)_                                                              | Remove all CSS overrides, clear context state                 |

## Accent Color Palette (used verbatim in tools.ts)

```ts
const ACCENT_COLORS = {
  yellow: {
    primary: "oklch(87.6% 0.179 95.4)",
    ring: "oklch(87.6% 0.179 95.4)",
  },
  blue: { primary: "oklch(60% 0.22 260)", ring: "oklch(60% 0.22 260)" },
  purple: { primary: "oklch(65% 0.25 300)", ring: "oklch(65% 0.25 300)" },
  green: { primary: "oklch(65% 0.20 145)", ring: "oklch(65% 0.20 145)" },
  red: { primary: "oklch(60% 0.22 20)", ring: "oklch(60% 0.22 20)" },
  cyan: { primary: "oklch(75% 0.18 195)", ring: "oklch(75% 0.18 195)" },
  orange: { primary: "oklch(75% 0.20 55)", ring: "oklch(75% 0.20 55)" },
} as const;
```

## Section ID Mapping (used in scroll_to_section)

```ts
const SECTION_IDS = {
  hero: "hero",
  about: "about",
  story: "story",
  projects: "projects-section",
  contact: "contact-section",
} as const;
```

## File Map

| Action | Path                                           | Responsibility                                           |
| ------ | ---------------------------------------------- | -------------------------------------------------------- |
| Create | `src/context/portfolio-actions.tsx`            | Context: persistent UI override state + dispatch         |
| Modify | `src/lib/chat/tools.ts`                        | Add 7 AG-UI tools to `chatTools`                         |
| Modify | `src/lib/chat/system-prompt.ts`                | Add AG-UI capability section to system prompt            |
| Modify | `src/app/api/chat/route.ts`                    | `toTextStreamResponse()` → `toUIMessageStreamResponse()` |
| Modify | `src/components/ui/chat-widget.tsx`            | Replace raw reader with SSE parser; dispatch actions     |
| Modify | `src/components/sections/hero-section.tsx`     | Subscribe to `heroDescription` override                  |
| Modify | `src/components/sections/projects-section.tsx` | Subscribe to `highlightedProject` override               |
| Modify | `src/components/sections/about-section.tsx`    | Subscribe to `focusedSkill` override                     |
| Modify | `src/app/layout.tsx`                           | Wrap with `PortfolioActionsProvider`                     |

---

### Task 1: PortfolioActionsContext

**Files:**

- Create: `src/context/portfolio-actions.tsx`

**Interfaces:**

- Produces:
  ```ts
  type PortfolioState = {
    accentColor: string | null; // color key e.g. 'blue', null = default
    highlightedProject: string | null; // project id
    heroDescription: string | null; // override text, null = use default
    focusedSkill: string | null; // constellation node id
  };
  type PortfolioActionsContextValue = {
    state: PortfolioState;
    dispatch: (action: PortfolioStateAction) => void;
  };
  ```
- Produces: `PortfolioActionsProvider` component, `usePortfolioActions()` hook

- [ ] **Step 1: Create `src/context/portfolio-actions.tsx`**

```tsx
"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";

export type PortfolioState = {
  accentColor: string | null;
  highlightedProject: string | null;
  heroDescription: string | null;
  focusedSkill: string | null;
};

export type PortfolioStateAction =
  | { type: "SET_ACCENT_COLOR"; color: string | null }
  | { type: "SET_HIGHLIGHTED_PROJECT"; projectId: string | null }
  | { type: "SET_HERO_DESCRIPTION"; text: string | null }
  | { type: "SET_FOCUSED_SKILL"; skillId: string | null }
  | { type: "RESET" };

const initialState: PortfolioState = {
  accentColor: null,
  highlightedProject: null,
  heroDescription: null,
  focusedSkill: null,
};

function reducer(
  state: PortfolioState,
  action: PortfolioStateAction,
): PortfolioState {
  switch (action.type) {
    case "SET_ACCENT_COLOR":
      return { ...state, accentColor: action.color };
    case "SET_HIGHLIGHTED_PROJECT":
      return { ...state, highlightedProject: action.projectId };
    case "SET_HERO_DESCRIPTION":
      return { ...state, heroDescription: action.text };
    case "SET_FOCUSED_SKILL":
      return { ...state, focusedSkill: action.skillId };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const PortfolioActionsContext = createContext<{
  state: PortfolioState;
  dispatch: React.Dispatch<PortfolioStateAction>;
} | null>(null);

export function PortfolioActionsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <PortfolioActionsContext.Provider value={{ state, dispatch }}>
      {children}
    </PortfolioActionsContext.Provider>
  );
}

export function usePortfolioActions() {
  const ctx = useContext(PortfolioActionsContext);
  if (!ctx)
    throw new Error(
      "usePortfolioActions must be used inside PortfolioActionsProvider",
    );
  return ctx;
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit 2>&1 | grep 'portfolio-actions' | head -10
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/context/portfolio-actions.tsx
git commit -m "feat(agui): add PortfolioActionsContext for UI override state"
```

---

### Task 2: AG-UI backend tools + system prompt update

**Files:**

- Modify: `src/lib/chat/tools.ts`
- Modify: `src/lib/chat/system-prompt.ts`

**Interfaces:**

- Consumes: existing `chatTools` object, `read_readme` tool
- Produces: `chatTools` extended with 7 AG-UI tools

- [ ] **Step 1: Update `src/lib/chat/tools.ts` — add AG-UI tools**

Replace the entire file content with:

```ts
import { tool } from "ai";
import { z } from "zod";
import { getCachedReadme } from "./readme-cache";
import { projects } from "@/data/projects";

// ── read_readme (Phase 1 — unchanged) ─────────────────────────────────────────

function findProjectRepo(name: string) {
  const norm = name.trim().toLowerCase();
  const p = projects.find(
    (proj) =>
      proj.title.toLowerCase().includes(norm) || proj.id.toLowerCase() === norm,
  );
  if (!p) return null;
  if (p.githubUrl) {
    const match = p.githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (match)
      return { source: "github" as const, owner: match[1], name: match[2] };
  }
  if (p.gitlabUrl) {
    const match = p.gitlabUrl.match(/gitlab\.com\/([^/]+)(?:\/([^/]+))?/);
    if (match)
      return {
        source: "gitlab" as const,
        owner: match[1],
        name: match[2] ?? match[1],
      };
  }
  return null;
}

const readReadmeTool = tool({
  description:
    "Read the detailed README of a specific project. " +
    "Only use when the user needs deep details (setup, architecture, specific features) " +
    "not covered by the project summary. Pass the project name as listed.",
  inputSchema: z.object({
    projectName: z.string().describe('Project name, e.g. "Chatly" or "Aurora"'),
  }),
  execute: async ({ projectName }: { projectName: string }) => {
    const repo = findProjectRepo(projectName);
    if (!repo)
      return {
        ok: false,
        message: `Project "${projectName}" not found or has no repo.`,
      };
    const entry = await getCachedReadme(repo.owner, repo.name);
    if (!entry)
      return {
        ok: false,
        message: `No README cache for "${projectName}". Summary info is already in context.`,
      };
    return {
      ok: true,
      project: projectName,
      truncated: entry.truncated,
      content: entry.content,
    };
  },
});

// ── AG-UI tools (Phase 2) ──────────────────────────────────────────────────────

const SECTION_IDS = {
  hero: "hero",
  about: "about",
  story: "story",
  projects: "projects-section",
  contact: "contact-section",
} as const;

const ACCENT_COLORS = {
  yellow: {
    primary: "oklch(87.6% 0.179 95.4)",
    ring: "oklch(87.6% 0.179 95.4)",
  },
  blue: { primary: "oklch(60% 0.22 260)", ring: "oklch(60% 0.22 260)" },
  purple: { primary: "oklch(65% 0.25 300)", ring: "oklch(65% 0.25 300)" },
  green: { primary: "oklch(65% 0.20 145)", ring: "oklch(65% 0.20 145)" },
  red: { primary: "oklch(60% 0.22 20)", ring: "oklch(60% 0.22 20)" },
  cyan: { primary: "oklch(75% 0.18 195)", ring: "oklch(75% 0.18 195)" },
  orange: { primary: "oklch(75% 0.20 55)", ring: "oklch(75% 0.20 55)" },
} as const;

const scrollToSectionTool = tool({
  description:
    "Scroll the portfolio page to a specific section. Use when the user asks to see a section.",
  inputSchema: z.object({
    section: z.enum(["hero", "about", "story", "projects", "contact"]),
  }),
  execute: async ({ section }: { section: keyof typeof SECTION_IDS }) => ({
    ok: true,
    action: "scroll_to_section",
    sectionId: SECTION_IDS[section],
  }),
});

const changeThemeTool = tool({
  description: "Switch the portfolio between dark and light mode.",
  inputSchema: z.object({ theme: z.enum(["dark", "light"]) }),
  execute: async ({ theme }: { theme: "dark" | "light" }) => ({
    ok: true,
    action: "change_theme",
    theme,
  }),
});

const changeAccentColorTool = tool({
  description:
    "Change the portfolio accent color (yellow is the default Pac-Man yellow).",
  inputSchema: z.object({
    color: z.enum([
      "yellow",
      "blue",
      "purple",
      "green",
      "red",
      "cyan",
      "orange",
    ]),
  }),
  execute: async ({ color }: { color: keyof typeof ACCENT_COLORS }) => ({
    ok: true,
    action: "change_accent_color",
    color,
    ...ACCENT_COLORS[color],
  }),
});

const highlightProjectTool = tool({
  description:
    "Scroll to the projects section and spotlight a specific project card with a glow effect.",
  inputSchema: z.object({
    projectId: z
      .string()
      .describe(
        'Project id, e.g. "chatly", "aurora", "nexatech", "portfolio-website"',
      ),
  }),
  execute: async ({ projectId }: { projectId: string }) => ({
    ok: true,
    action: "highlight_project",
    projectId,
  }),
});

const setHeroDescriptionTool = tool({
  description:
    "Temporarily override the hero section description paragraph with custom text.",
  inputSchema: z.object({
    text: z
      .string()
      .max(200)
      .describe("New description text for the hero section (max 200 chars)"),
  }),
  execute: async ({ text }: { text: string }) => ({
    ok: true,
    action: "set_hero_description",
    text,
  }),
});

const focusSkillTool = tool({
  description:
    "Pulse-highlight a skill node in the About section constellation.",
  inputSchema: z.object({
    skillId: z
      .string()
      .describe(
        "Skill node id. Valid values: linux, mcp, langgraph, gemini, aws, docker, terraform, kafka, spring, fastapi, react, rag",
      ),
  }),
  execute: async ({ skillId }: { skillId: string }) => ({
    ok: true,
    action: "focus_skill",
    skillId,
  }),
});

const resetUiTool = tool({
  description:
    "Reset all chatbot UI modifications back to defaults (colors, text overrides, highlights).",
  inputSchema: z.object({}),
  execute: async () => ({ ok: true, action: "reset_ui" }),
});

// ── Export ─────────────────────────────────────────────────────────────────────

export const UI_ACTION_TOOLS = new Set([
  "scroll_to_section",
  "change_theme",
  "change_accent_color",
  "highlight_project",
  "set_hero_description",
  "focus_skill",
  "reset_ui",
]);

export const chatTools = {
  read_readme: readReadmeTool,
  scroll_to_section: scrollToSectionTool,
  change_theme: changeThemeTool,
  change_accent_color: changeAccentColorTool,
  highlight_project: highlightProjectTool,
  set_hero_description: setHeroDescriptionTool,
  focus_skill: focusSkillTool,
  reset_ui: resetUiTool,
};
```

- [ ] **Step 2: Update `src/lib/chat/system-prompt.ts` — add AG-UI section**

Append this section to the string returned by `buildSystemPrompt()`, just before the `# Format` section:

```ts
// Add this block to the template literal inside buildSystemPrompt():

`
# UI Interaction (AG-UI)
You can directly modify the portfolio page to help the user. Use these tools proactively:
- **scroll_to_section** — when user says "show me", "go to", "take me to" a section
- **change_theme** — when user says "dark mode", "light mode", "switch theme"
- **change_accent_color** — when user asks to change the color (yellow is the Pac-Man default)
- **highlight_project** — when user asks about a project, spotlight it on the page
- **set_hero_description** — when user wants to customize the hero tagline
- **focus_skill** — when user asks about a specific skill, highlight it in the constellation
- **reset_ui** — when user says "reset", "restore defaults", "go back to normal"

Always describe what you did after executing a UI action, e.g. "I've scrolled to the Projects section for you."
`;
```

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit 2>&1 | grep -E 'tools|system-prompt' | head -10
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/chat/tools.ts src/lib/chat/system-prompt.ts
git commit -m "feat(agui): add 7 AG-UI tools to chatbot backend"
```

---

### Task 3: Switch route to UIMessage stream + update chat widget SSE parser

**Files:**

- Modify: `src/app/api/chat/route.ts`
- Modify: `src/components/ui/chat-widget.tsx`

**Interfaces:**

- Consumes: `PortfolioActionsProvider` dispatch (via custom prop or direct import of context)
- Consumes: `UI_ACTION_TOOLS` set from tools.ts (for filtering tool-call events)
- The widget dispatches via `usePortfolioActions()` and direct DOM calls for fire-and-forget actions

Note: `chat-widget.tsx` is already inside `PortfolioActionsProvider` (added in Task 4), so `usePortfolioActions()` will be available.

- [ ] **Step 1: Update `src/app/api/chat/route.ts` — switch to UIMessage stream**

Change only the last line of the try block from:

```ts
return result.toTextStreamResponse();
```

to:

```ts
return result.toUIMessageStreamResponse();
```

The catch/error handling remains unchanged.

- [ ] **Step 2: Replace the streaming logic in `src/components/ui/chat-widget.tsx`**

Add import at the top:

```tsx
import { usePortfolioActions } from "@/context/portfolio-actions";
import { useTheme } from "next-themes";
```

Add these two hooks inside `ChatWidget()` after the existing state declarations:

```tsx
const { dispatch } = usePortfolioActions();
const { setTheme } = useTheme();
```

Replace the `handleSubmit` function's streaming section (the `try` block's fetch + reader loop) with:

```tsx
try {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: newMessages }),
  });

  if (!res.ok || !res.body) {
    setMessages(prev => {
      const updated = [...prev];
      updated[updated.length - 1] = { role: 'assistant', content: 'Sorry, something went wrong.' };
      return updated;
    });
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const raw = line.slice(6).trim();
      if (!raw) continue;

      let event: Record<string, unknown>;
      try { event = JSON.parse(raw); } catch { continue; }

      if (event.type === 'text' && typeof event.text === 'string') {
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: updated[updated.length - 1].content + (event.text as string),
          };
          return updated;
        });
      } else if (event.type === 'tool-call') {
        handleUiAction(event.toolName as string, event.args as Record<string, unknown>);
      }
    }
  }
}
```

Add the `handleUiAction` function inside `ChatWidget` (before the return statement):

```tsx
function handleUiAction(toolName: string, args: Record<string, unknown>) {
  switch (toolName) {
    case "scroll_to_section": {
      const el = document.getElementById(args.sectionId as string);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      break;
    }
    case "change_theme":
      setTheme(args.theme as string);
      break;
    case "change_accent_color":
      document.documentElement.style.setProperty(
        "--primary",
        args.primary as string,
      );
      document.documentElement.style.setProperty("--ring", args.ring as string);
      dispatch({ type: "SET_ACCENT_COLOR", color: args.color as string });
      break;
    case "highlight_project": {
      const el = document.getElementById("projects-section");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      dispatch({
        type: "SET_HIGHLIGHTED_PROJECT",
        projectId: args.projectId as string,
      });
      break;
    }
    case "set_hero_description":
      dispatch({ type: "SET_HERO_DESCRIPTION", text: args.text as string });
      break;
    case "focus_skill":
      dispatch({ type: "SET_FOCUSED_SKILL", skillId: args.skillId as string });
      break;
    case "reset_ui":
      document.documentElement.style.removeProperty("--primary");
      document.documentElement.style.removeProperty("--ring");
      dispatch({ type: "RESET" });
      break;
  }
}
```

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit 2>&1 | grep -E 'chat-widget|route' | head -10
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/chat/route.ts src/components/ui/chat-widget.tsx
git commit -m "feat(agui): switch to UIMessage stream + SSE action parser in chat widget"
```

---

### Task 4: Hero section — subscribe to heroDescription override

**Files:**

- Modify: `src/components/sections/hero-section.tsx`

**Interfaces:**

- Consumes: `usePortfolioActions()` → `state.heroDescription`
- The description paragraph (lines ~94-101 in current file) conditionally renders the override text

- [ ] **Step 1: Add context import to hero-section.tsx**

Add to imports:

```tsx
import { usePortfolioActions } from "@/context/portfolio-actions";
```

- [ ] **Step 2: Read the override in the component**

Inside `HeroSection`, add after the `shouldReduce` line:

```tsx
const { state } = usePortfolioActions();
```

- [ ] **Step 3: Use the override in the description paragraph**

Find the description `<motion.p>` (the one containing "Builds distributed systems end-to-end…"). Replace its text content with:

```tsx
{
  state.heroDescription ??
    "Builds distributed systems end-to-end — Spring Boot microservices, Kafka pipelines, LangGraph AI agents, React interfaces. Deployed to production on AWS. Ships things that work.";
}
```

- [ ] **Step 4: TypeScript check**

```bash
npx tsc --noEmit 2>&1 | grep 'hero-section' | head -10
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/hero-section.tsx
git commit -m "feat(agui): hero section subscribes to heroDescription override"
```

---

### Task 5: Projects section — subscribe to highlightedProject override

**Files:**

- Modify: `src/components/sections/projects-section.tsx`

**Interfaces:**

- Consumes: `usePortfolioActions()` → `state.highlightedProject`
- Project cards already have `id` from `projects.tsx` (nexatech, chatly, aurora, portfolio-website)
- Add a yellow ring/glow to the highlighted card; auto-clear after 4 seconds

- [ ] **Step 1: Add imports to projects-section.tsx**

```tsx
import { usePortfolioActions } from "@/context/portfolio-actions";
import { useEffect } from "react"; // if not already imported
```

- [ ] **Step 2: Read and auto-clear in the component**

Find the main component function (likely `ProjectsSection`). Add:

```tsx
const { state, dispatch } = usePortfolioActions();

// Auto-clear highlight after 4s
useEffect(() => {
  if (!state.highlightedProject) return;
  const t = setTimeout(
    () => dispatch({ type: "SET_HIGHLIGHTED_PROJECT", projectId: null }),
    4000,
  );
  return () => clearTimeout(t);
}, [state.highlightedProject, dispatch]);
```

- [ ] **Step 3: Apply glow to the highlighted project card**

Find where project cards are rendered (look for where `project.id` or `project.title` is used). Add a conditional class to the card's outermost `<div>` or `<motion.div>`:

```tsx
className={cn(
  /* existing classes */,
  state.highlightedProject === project.id && 'ring-2 ring-primary shadow-[0_0_24px_oklch(87.6%_0.179_95.4/0.5)]',
)}
```

If the card already has `id` on the DOM element, use `project.id`; otherwise look for `project.title` matching and use that.

- [ ] **Step 4: TypeScript check**

```bash
npx tsc --noEmit 2>&1 | grep 'projects-section' | head -10
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/projects-section.tsx
git commit -m "feat(agui): projects section subscribes to highlightedProject override"
```

---

### Task 6: About section — subscribe to focusedSkill override

**Files:**

- Modify: `src/components/sections/about-section.tsx`

**Interfaces:**

- Consumes: `usePortfolioActions()` → `state.focusedSkill`
- Constellation nodes are rendered with `id` = `node.id` (linux, mcp, langgraph, etc.) — read the file to confirm
- When `state.focusedSkill` matches a node id, animate that node with a scale+ring pulse; auto-clear after 3s

- [ ] **Step 1: Add imports to about-section.tsx**

```tsx
import { usePortfolioActions } from "@/context/portfolio-actions";
```

- [ ] **Step 2: Read the override and auto-clear**

Find the component that renders the constellation (likely within `AboutSection` or a nested component). Add:

```tsx
const { state, dispatch } = usePortfolioActions();

useEffect(() => {
  if (!state.focusedSkill) return;
  const t = setTimeout(
    () => dispatch({ type: "SET_FOCUSED_SKILL", skillId: null }),
    3000,
  );
  return () => clearTimeout(t);
}, [state.focusedSkill, dispatch]);
```

- [ ] **Step 3: Apply pulse to the focused skill node**

Find where `NODES` items are rendered (look for `node.id` or `node.label` usage in JSX). On the node element add a conditional inline style or className:

```tsx
style={state.focusedSkill === node.id ? {
  filter: 'drop-shadow(0 0 8px var(--primary))',
  transform: 'scale(1.25)',
  transition: 'transform 0.2s, filter 0.2s',
} : undefined}
```

Or use framer-motion's `animate` prop if the nodes are already `<motion.xxx>` elements:

```tsx
animate={state.focusedSkill === node.id ? { scale: 1.3 } : { scale: 1 }}
```

Read the file to determine the actual rendering pattern before editing.

- [ ] **Step 4: TypeScript check**

```bash
npx tsc --noEmit 2>&1 | grep 'about-section' | head -10
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/about-section.tsx
git commit -m "feat(agui): about section constellation subscribes to focusedSkill"
```

---

### Task 7: Wire PortfolioActionsProvider into layout + integration test

**Files:**

- Modify: `src/app/layout.tsx`

**Interfaces:**

- Consumes: `PortfolioActionsProvider` from `src/context/portfolio-actions.tsx`
- Must wrap the entire app including `ChatWidget` and all sections

- [ ] **Step 1: Add import to layout.tsx**

```tsx
import { PortfolioActionsProvider } from "@/context/portfolio-actions";
```

- [ ] **Step 2: Wrap children with PortfolioActionsProvider**

Inside `RootLayout`, wrap `ThemeProvider` with `PortfolioActionsProvider`:

```tsx
<PortfolioActionsProvider>
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    {children}
    <SpeedInsights />
    <ChatWidget />
  </ThemeProvider>
</PortfolioActionsProvider>
```

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors across the entire project.

- [ ] **Step 4: Lint check**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(agui): wire PortfolioActionsProvider into layout"
```

- [ ] **Step 6: Integration smoke test — start dev server and verify manually**

```bash
npm run dev
```

Open `http://localhost:3000`. With GROQ_API_KEY set in `.env.local`, open the chat widget and try:

1. "Show me the projects" → page scrolls to Projects section
2. "Change the accent color to blue" → primary color changes to blue
3. "Switch to light mode" → theme toggles
4. "Reset the UI" → color restores to yellow
5. "Tell me about Aurora in detail" → read_readme tool fires (Phase 1 still works)

Stop dev server when done.

---

## Self-Review

### Spec coverage

| Feature                   | Task                                                 |
| ------------------------- | ---------------------------------------------------- |
| Scroll to section         | Task 2 (tool) + Task 3 (dispatch)                    |
| Change theme              | Task 2 (tool) + Task 3 (dispatch)                    |
| Change accent color       | Task 2 (tool) + Task 3 (CSS var)                     |
| Highlight project card    | Task 2 (tool) + Task 3 (dispatch) + Task 5 (glow)    |
| Override hero description | Task 2 (tool) + Task 3 (dispatch) + Task 4 (render)  |
| Focus constellation skill | Task 2 (tool) + Task 3 (dispatch) + Task 6 (animate) |
| Reset all overrides       | Task 2 (tool) + Task 3 (CSS + RESET)                 |
| Phase 1 Q&A still works   | Tool preserved in Task 2                             |

### Known deferred (not in Phase 2 scope)

- Rate limiting on `/api/chat` — add if quota burn becomes an issue
- Message history persistence — localStorage in Phase 3
- Tool call visibility in chat (show "scrolling to projects..." indicator)
- CopilotKit migration — not needed; plain AI SDK handles the use case cleanly

skipped: CopilotKit, stable message keys (minor), confetti (no canvas-confetti installed). Add when needed.
