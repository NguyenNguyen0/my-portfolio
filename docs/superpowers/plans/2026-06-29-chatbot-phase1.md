# Chatbot Phase 1 — Q&A Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a floating AI chatbot to the portfolio that answers Q&A about the owner and their projects, streaming responses via Groq Llama 3.3 70B, styled in the portfolio's Pac-Man design system.

**Architecture:** Next.js App Router API route uses Vercel AI SDK `streamText` with Groq as provider. The frontend uses the AI SDK's `useChat` hook in a custom floating widget component. Project README details are cached at build time in `src/data/readme-cache.json` and fetched on-demand via a server tool.

**Tech Stack:** Vercel AI SDK (`ai` + `@ai-sdk/groq`), Groq Llama-3.3-70b-versatile, Zod (tool schemas), react-markdown + remark-gfm (message rendering), framer-motion (panel animation, already installed).

## Global Constraints

- No CopilotKit in Phase 1 — plain Vercel AI SDK only. CopilotKit added in Phase 2 for AG-UI actions.
- All chat UI must follow the Pac-Man design system: `--radius: 0px` (flat edges), `--primary` (Pac-Man yellow), `--card` (dark bg), `font-press-start` for UI labels.
- Data source for system prompt: import from existing `src/data/personalInfo.tsx`, `src/data/projects.tsx`, `src/data/socialLink.tsx` — never duplicate profile data.
- Backend module lives at `src/lib/chat/`, API route at `src/app/api/chat/route.ts`, chat widget at `src/components/ui/chat-widget.tsx`.
- `export const runtime = 'nodejs'` in API route (needed for `fs` in readme-cache).
- Env var: `GROQ_API_KEY` in `.env.local`.

---

## File Map

| Action | Path                                | Responsibility                            |
| ------ | ----------------------------------- | ----------------------------------------- |
| Create | `src/lib/chat/model.ts`             | Groq model instance                       |
| Create | `src/lib/chat/readme-cache.ts`      | README cache types + loader               |
| Create | `src/lib/chat/system-prompt.ts`     | buildSystemPrompt() from existing data    |
| Create | `src/lib/chat/tools.ts`             | `read_readme` AI SDK tool                 |
| Create | `src/app/api/chat/route.ts`         | POST handler — streamText                 |
| Create | `src/components/ui/chat-widget.tsx` | Pac-Man themed floating chat UI           |
| Create | `scripts/fetch-readmes.mjs`         | Build-time README fetcher script          |
| Create | `src/data/readme-cache.json`        | Empty cache placeholder                   |
| Modify | `src/app/layout.tsx`                | Add `<ChatWidget />` inside ThemeProvider |
| Modify | `package.json`                      | Add `prebuild` script                     |

---

### Task 1: Dependencies + env setup

**Files:**

- Modify: `package.json` (via npm install)
- Create: `.env.local` (manual user action — documented here)

**Interfaces:**

- Produces: `ai`, `@ai-sdk/groq`, `zod`, `react-markdown`, `remark-gfm` available in imports

- [ ] **Step 1: Install runtime dependencies**

```bash
npm install ai @ai-sdk/groq zod react-markdown remark-gfm
```

Expected: packages added to `dependencies` in `package.json`. No errors.

- [ ] **Step 2: Add GROQ_API_KEY to .env.local**

Add this line to `.env.local` (create if missing):

```
GROQ_API_KEY=gsk_your_key_here
```

Get the key from [console.groq.com](https://console.groq.com) → API Keys.

- [ ] **Step 3: Verify TypeScript types resolve**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no new type errors (project was clean before).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat(chatbot): add ai sdk, groq, zod, react-markdown deps"
```

---

### Task 2: README cache infrastructure

**Files:**

- Create: `src/lib/chat/readme-cache.ts`
- Create: `scripts/fetch-readmes.mjs`
- Create: `src/data/readme-cache.json` (empty placeholder)

**Interfaces:**

- Produces: `getCachedReadme(owner: string, name: string): Promise<ReadmeEntry | null>`
- Produces: `ReadmeEntry = { content: string; fetchedAt: string; truncated: boolean }`

- [ ] **Step 1: Create `src/data/readme-cache.json` (empty placeholder)**

```json
{}
```

- [ ] **Step 2: Create `src/lib/chat/readme-cache.ts`**

```ts
import { promises as fs } from "fs";
import path from "path";

export type ReadmeEntry = {
  content: string;
  fetchedAt: string;
  truncated: boolean;
};

type ReadmeCache = Record<string, ReadmeEntry>;

const CACHE_PATH = path.join(process.cwd(), "src", "data", "readme-cache.json");

let _cache: ReadmeCache | null = null;

export async function loadReadmeCache(): Promise<ReadmeCache> {
  if (_cache) return _cache;
  try {
    const raw = await fs.readFile(CACHE_PATH, "utf-8");
    _cache = JSON.parse(raw) as ReadmeCache;
  } catch {
    _cache = {};
  }
  return _cache;
}

export async function getCachedReadme(
  owner: string,
  name: string,
): Promise<ReadmeEntry | null> {
  const cache = await loadReadmeCache();
  return cache[`${owner}/${name}`] ?? null;
}
```

- [ ] **Step 3: Create `scripts/fetch-readmes.mjs`**

```js
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Sync with src/data/projects.tsx — only repos we can fetch
const REPOS = [
  { source: "github", owner: "NguyenNguyen0", name: "my-portfolio" },
  { source: "github", owner: "giasinguyen", name: "chatly-messaging-platform" },
  {
    source: "github",
    owner: "giasinguyen",
    name: "aurora-hotel-management-system",
  },
  {
    source: "gitlab",
    owner: "software-architecture264301",
    name: "software-architecture264301",
  },
];

const MAX_CHARS = 24_000;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function fetchGithubReadme(owner, name) {
  const headers = GITHUB_TOKEN
    ? { Authorization: `token ${GITHUB_TOKEN}` }
    : {};
  for (const branch of ["main", "master"]) {
    for (const file of ["README.md", "readme.md"]) {
      const url = `https://raw.githubusercontent.com/${owner}/${name}/${branch}/${file}`;
      const res = await fetch(url, { headers });
      if (res.ok) return res.text();
    }
  }
  return null;
}

async function fetchGitlabReadme(owner, name) {
  const project = encodeURIComponent(`${owner}/${name}`);
  for (const branch of ["main", "master"]) {
    for (const file of ["README.md", "readme.md"]) {
      const url = `https://gitlab.com/api/v4/projects/${project}/repository/files/${encodeURIComponent(file)}/raw?ref=${branch}`;
      const res = await fetch(url);
      if (res.ok) return res.text();
    }
  }
  return null;
}

async function main() {
  const cache = {};
  for (const repo of REPOS) {
    const key = `${repo.owner}/${repo.name}`;
    process.stdout.write(`Fetching ${key}... `);
    let content = null;
    try {
      content =
        repo.source === "github"
          ? await fetchGithubReadme(repo.owner, repo.name)
          : await fetchGitlabReadme(repo.owner, repo.name);
    } catch (err) {
      console.log(`error: ${err.message}`);
      continue;
    }
    if (!content) {
      console.log("not found, skipping.");
      continue;
    }
    const truncated = content.length > MAX_CHARS;
    cache[key] = {
      content: truncated
        ? content.slice(0, MAX_CHARS) + "\n\n[...truncated]"
        : content,
      fetchedAt: new Date().toISOString(),
      truncated,
    };
    console.log(
      `ok (${content.length} chars${truncated ? ", truncated" : ""}).`,
    );
  }
  const outPath = path.join(
    __dirname,
    "..",
    "src",
    "data",
    "readme-cache.json",
  );
  await fs.writeFile(outPath, JSON.stringify(cache, null, 2), "utf-8");
  console.log(`\nWrote ${Object.keys(cache).length} entries to ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
```

- [ ] **Step 4: Run the fetch script to populate the cache**

```bash
node scripts/fetch-readmes.mjs
```

Expected output (some repos may not exist / be private, that's OK):

```
Fetching NguyenNguyen0/my-portfolio... ok (XXXX chars).
Fetching giasinguyen/chatly-messaging-platform... ok (XXXX chars).
...
Wrote N entries to .../src/data/readme-cache.json
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/chat/readme-cache.ts scripts/fetch-readmes.mjs src/data/readme-cache.json
git commit -m "feat(chatbot): add readme cache infrastructure"
```

---

### Task 3: Backend — model, system prompt, tools, API route

**Files:**

- Create: `src/lib/chat/model.ts`
- Create: `src/lib/chat/system-prompt.ts`
- Create: `src/lib/chat/tools.ts`
- Create: `src/app/api/chat/route.ts`

**Interfaces:**

- Consumes: `getCachedReadme` from `src/lib/chat/readme-cache.ts`
- Consumes: `personalInfo`, `technicalSkills` from `src/data/personalInfo.tsx`
- Consumes: `projects` from `src/data/projects.tsx`
- Consumes: `socialLinks` from `src/data/socialLink.tsx`
- Produces: `POST /api/chat` — accepts `{ messages: CoreMessage[] }`, returns AI data stream

- [ ] **Step 1: Create `src/lib/chat/model.ts`**

```ts
import { createGroq } from "@ai-sdk/groq";

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

export const chatModel = groq("llama-3.3-70b-versatile");
```

- [ ] **Step 2: Create `src/lib/chat/system-prompt.ts`**

```ts
import { personalInfo, technicalSkills } from "@/data/personalInfo";
import { projects } from "@/data/projects";
import { socialLinks } from "@/data/socialLink";

export function buildSystemPrompt(): string {
  const infoLines = personalInfo
    .map((item) => `- ${item.label}: ${item.value}`)
    .join("\n");

  const skillLines = technicalSkills
    .map((cat) => `- ${cat.title}: ${cat.skills.join(", ")}`)
    .join("\n");

  const projectLines = projects
    .map((p) => {
      const links = [
        p.githubUrl ? `GitHub: ${p.githubUrl}` : "",
        p.gitlabUrl ? `GitLab: ${p.gitlabUrl}` : "",
        p.demoUrl ? `Demo: ${p.demoUrl}` : "",
      ]
        .filter(Boolean)
        .join("; ");
      return `- **${p.title}** (${p.period}): ${p.description}\n  Tech: ${p.techStack.join(", ")}. Role: ${p.role}${p.team ? `. Team: ${p.team}` : ""}${links ? `.\n  Links: ${links}` : ""}.`;
    })
    .join("\n");

  const contactLines = socialLinks
    .map((s) => `- ${s.label}: ${s.url}`)
    .join("\n");

  return `You are the AI assistant of Nguyễn Trung Nguyên's personal portfolio.

# Role
Answer visitors' questions about Nguyễn Trung Nguyên and his projects.
Be friendly, concise, and professional. Respond in the same language as the user
(default to Vietnamese if unclear).

# About Nguyễn Trung Nguyên
- Full name: Nguyễn Trung Nguyên
- Title: Full-Stack Developer · AI Integration
${infoLines}

# Technical Skills
${skillLines}

# Projects
${projectLines}

# Contact & Social
${contactLines}

# Tool Usage
- For GENERAL questions about a project (what it is, tech used), answer DIRECTLY from
  the information above — DO NOT call read_readme.
- ONLY call "read_readme" when the user asks for DEEP DETAILS not covered above
  (e.g. installation steps, specific architecture, detailed feature list).
  Pass the project name exactly as listed above.
- If README has no relevant info, say so honestly — do not fabricate.

# Boundaries
- ONLY answer about Nguyễn Trung Nguyên and his projects.
- For off-topic questions (weather, general knowledge, write code for something else),
  politely decline and redirect.
- NEVER invent information. If unknown, say so and suggest contacting via GitHub or LinkedIn.

# Format
- Use Markdown (lists, **bold**, \`code\`, tables) when helpful.
- Keep answers concise and direct.`;
}
```

- [ ] **Step 3: Create `src/lib/chat/tools.ts`**

```ts
import { tool } from "ai";
import { z } from "zod";
import { getCachedReadme } from "./readme-cache";
import { projects } from "@/data/projects";

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

export const chatTools = {
  read_readme: tool({
    description:
      "Read the detailed README of a specific project. " +
      "Only use when the user needs deep details (setup, architecture, specific features) " +
      "not covered by the project summary. Pass the project name as listed.",
    parameters: z.object({
      projectName: z
        .string()
        .describe('Project name, e.g. "Chatly" or "Aurora"'),
    }),
    execute: async ({ projectName }) => {
      const repo = findProjectRepo(projectName);
      if (!repo) {
        return {
          ok: false,
          message: `Project "${projectName}" not found or has no repo.`,
        };
      }
      const entry = await getCachedReadme(repo.owner, repo.name);
      if (!entry) {
        return {
          ok: false,
          message: `No README cache for "${projectName}". Summary info is already in context.`,
        };
      }
      return {
        ok: true,
        project: projectName,
        truncated: entry.truncated,
        content: entry.content,
      };
    },
  }),
};
```

- [ ] **Step 4: Create `src/app/api/chat/route.ts`**

```ts
import { streamText } from "ai";
import { NextRequest } from "next/server";
import { chatModel } from "@/lib/chat/model";
import { buildSystemPrompt } from "@/lib/chat/system-prompt";
import { chatTools } from "@/lib/chat/tools";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const result = streamText({
    model: chatModel,
    system: buildSystemPrompt(),
    messages,
    tools: chatTools,
    maxSteps: 3,
    temperature: 0.4,
  });

  return result.toDataStreamResponse();
}
```

- [ ] **Step 5: Verify TypeScript compiles cleanly**

```bash
npx tsc --noEmit 2>&1 | grep -E 'error|warning' | head -20
```

Expected: no errors in the new files.

- [ ] **Step 6: Quick smoke test — hit the API directly**

```bash
npm run dev &
sleep 5
curl -s -X POST http://localhost:3000/api/chat \
  -H 'Content-Type: application/json' \
  -d '{"messages":[{"role":"user","content":"What projects did Nguyen Trung Nguyen work on?"}]}' \
  | head -c 500
```

Expected: a streaming response that starts with `0:"` (AI SDK data stream format) followed by text about the projects.

```bash
kill %1
```

- [ ] **Step 7: Commit**

```bash
git add src/lib/chat/ src/app/api/chat/
git commit -m "feat(chatbot): add groq backend with system prompt and read_readme tool"
```

---

### Task 4: Chat widget UI

**Files:**

- Create: `src/components/ui/chat-widget.tsx`

**Interfaces:**

- Consumes: `useChat` from `ai/react`
- Produces: `<ChatWidget />` — zero props, self-contained floating widget

**Design spec:**

- Fixed `bottom-6 right-6`, z-index 50
- Trigger: 56×56 Pac-Man yellow circle, `MessageCircle` icon, pulse ring on first load
- Panel: `w-[360px] h-[520px]`, `bg-card border border-border`, flat edges (radius=0), slides up via framer-motion
- Header: "ASK ME" in `font-press-start text-xs text-primary`, close button
- Message list: scrollable, user messages right-aligned `bg-primary text-primary-foreground`, bot messages left-aligned `bg-muted text-foreground`
- Bot typing indicator: three animated dots
- Input row: `bg-background border-t border-border`, flat input + yellow send button
- react-markdown for bot message content

- [ ] **Step 1: Create `src/components/ui/chat-widget.tsx`**

```tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { useChat } from "ai/react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
    });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="w-[360px] h-[520px] bg-card border border-border flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-[family-name:var(--font-press-start)] text-[10px] text-primary tracking-wider">
                  ASK ME
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground text-xs mt-8 space-y-1">
                  <p className="font-[family-name:var(--font-vt323)] text-lg text-primary">
                    👾 Hello!
                  </p>
                  <p>
                    Ask me anything about Nguyễn Trung Nguyên and his projects.
                  </p>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] px-3 py-2 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground",
                    )}
                  >
                    {msg.role === "assistant" ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => (
                            <p className="mb-1 last:mb-0">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc pl-4 mb-1">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal pl-4 mb-1">
                              {children}
                            </ol>
                          ),
                          code: ({ children }) => (
                            <code className="bg-background/60 px-1 rounded text-xs font-mono">
                              {children}
                            </code>
                          ),
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary underline"
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted px-3 py-2 flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-border flex items-center gap-0"
            >
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Type a message…"
                disabled={isLoading}
                className="flex-1 bg-background text-foreground text-sm px-3 py-3 outline-none placeholder:text-muted-foreground disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="h-full px-4 py-3 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-colors"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors relative"
        aria-label="Open AI chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
        {/* pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full ring-2 ring-primary animate-ping opacity-30 pointer-events-none" />
        )}
      </button>
    </div>
  );
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit 2>&1 | grep 'chat-widget' | head -10
```

Expected: no errors for chat-widget.tsx.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/chat-widget.tsx
git commit -m "feat(chatbot): add Pac-Man themed floating chat widget"
```

---

### Task 5: Wire into layout + prebuild script

**Files:**

- Modify: `src/app/layout.tsx`
- Modify: `package.json`

**Interfaces:**

- Consumes: `<ChatWidget />` from `src/components/ui/chat-widget.tsx`

- [ ] **Step 1: Add ChatWidget to layout inside ThemeProvider**

In `src/app/layout.tsx`, add the import at the top:

```ts
import { ChatWidget } from "@/components/ui/chat-widget";
```

Modify the `<ThemeProvider>` block (currently at line ~135):

```tsx
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
  {children}
  <SpeedInsights />
  <ChatWidget />
</ThemeProvider>
```

- [ ] **Step 2: Add prebuild script to package.json**

In `package.json`, under `"scripts"`, add:

```json
"prebuild": "node scripts/fetch-readmes.mjs"
```

So the full scripts block becomes:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "prebuild": "node scripts/fetch-readmes.mjs"
}
```

- [ ] **Step 3: Verify full dev build works**

```bash
npm run dev
```

Open browser at `http://localhost:3000`. Verify:

1. Yellow pulsing chat button appears at bottom-right.
2. Clicking it opens the panel with "ASK ME" header.
3. Typing "What projects do you have?" and pressing Send returns a streamed response about the projects.
4. Typing a detail question like "Tell me about Aurora Hotel" returns detailed info; if README is cached it may use the tool.
5. Panel closes when clicking X or the trigger button again.

- [ ] **Step 4: TypeScript + lint check**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx package.json
git commit -m "feat(chatbot): wire ChatWidget into layout, add prebuild readme fetch"
```

---

## Self-Review

### Spec coverage

| Requirement                                  | Task                                                                   |
| -------------------------------------------- | ---------------------------------------------------------------------- |
| Q&A chatbot answering info about owner       | Task 3 (system prompt from existing data)                              |
| Q&A about projects                           | Task 3 (system prompt + read_readme tool)                              |
| Matches portfolio design system              | Task 4 (Pac-Man theme, flat edges, yellow primary)                     |
| Structure matches existing file layout       | All tasks — `src/lib/chat/`, `src/app/api/chat/`, `src/components/ui/` |
| Phase 1 only (no AG-UI frontend interaction) | CopilotKit deferred — plain AI SDK used                                |
| README detail via build-time cache           | Task 2 (fetch script + json cache + tool)                              |

### Phase 2 hooks (not built now)

- `useCopilotAction` calls for theme/style changes → wire in CopilotKit when ready
- Streaming tool result display (currently tool calls are invisible to user) → add tool call indicator in Phase 2
- Chat history persistence → localStorage or server session in Phase 2

skipped: CopilotKit, react-markdown syntax highlighting (`rehype-highlight`), message persistence. Add when Phase 2 begins.
