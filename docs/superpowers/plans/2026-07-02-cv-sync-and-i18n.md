# CV Sync, English-First Content & Lighthouse 95+ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. This project has no test suite (see CLAUDE.md) — "verify" steps run `npm run lint` / `npm run build` / manual dev-server checks instead of a test runner.

**Goal:** Make chatbot copy English-first (Vietnamese reserved for proper nouns/explicit request), add a CV download CTA, sync SEO metadata / personal info / project data with the new CV, add NexaTech screenshots, add an "explore more projects" card with GitHub/GitLab links, then verify Lighthouse (Performance/Accessibility/Best Practices/SEO) all score 95+ against a production build.

**Architecture:** No new files, no new dependencies. Every task edits existing data/component/prompt files in place. Lighthouse is run locally via `npx lighthouse` pointed at the Playwright-installed Chromium binary (no system Chrome installed).

**Tech Stack:** Next.js 15 / React 19 / TypeScript, existing `lucide-react` icons, `npx lighthouse` (npm, no new devDependency added — invoked ad hoc via `npx`).

## Global Constraints

- English is the default written language across the whole project (UI copy, chatbot prompts, error strings). Vietnamese is used ONLY for the proper name "Nguyễn Trung Nguyên" (or "Trung Nguyên") and any place the user explicitly asked for Vietnamese. This rule itself gets documented in `CLAUDE.md` (Task 1).
- Don't touch `src/components/sections/about-section.tsx` or `src/data/story.ts` — both already match the new CV facts (Go Vap, TOEIC 625, IUH GPA references, NestJS/Qdrant/Ansible in the stack grid) and are out of scope.
- `src/data/personalInfo.tsx`'s `personalInfo`/`technicalSkills` exports are consumed ONLY by `src/lib/chat/system-prompt.ts` (verified via repo-wide grep) — editing them only affects what the chatbot says, not any visible page section.
- Every task ends in its own local commit (`git commit`, no push). Pre-existing uncommitted changes (staged phase1/phase2 chatbot plan docs, modified `src/lib/chat/model.ts`, modified `public/dev-icon.png`) are not committed standalone — they ride along with the task they relate to (Task 1 for the chat docs + model swap, Task 3 for the icon since it's referenced from `metadata.icons`).
- GitLab link for the "explore more projects" card is `https://gitlab.com/users/nguyennguyen0/groups` (user-confirmed — the raw `gitlab.com/dashboard/projects` URL they first gave is a private, login-gated dashboard, not safe to link publicly).

---

### Task 1: English-first chatbot copy + language policy doc

**Files:**
- Modify: `src/components/ui/chat-widget.tsx:14-26` (PROMPT_CHIPS), `:243-260` (tooltip copy), `:142-144` (fallback message), `:152-154` (fallback message)
- Modify: `src/lib/chat/system-prompt.ts:35-36` (default-language line)
- Modify: `src/app/api/chat/route.ts:31,33` (onError strings)
- Modify: `CLAUDE.md` (document the policy + sync the model name)
- Bundle (already-modified, unrelated to new work but riding along per Global Constraints): `src/lib/chat/model.ts`, `docs/superpowers/plans/2026-06-29-chatbot-phase1.md`, `docs/superpowers/plans/2026-06-29-chatbot-phase2-agui.md`

- [ ] **Step 1: Translate `PROMPT_CHIPS` in chat-widget.tsx**

Replace lines 14-26:

```tsx
const PROMPT_CHIPS = [
	{ label: '🎨 Change color', text: 'Change the background color to blue' },
	{
		label: '📝 Edit content',
		text: 'Change the hero description to a cheerful greeting',
	},
	{ label: '💼 View projects', text: 'Show me the featured projects' },
	{ label: '🙋 About Trung Nguyên', text: 'Introduce Trung Nguyên' },
	{ label: '🌙 Switch theme', text: 'Switch to light mode' },
	{ label: '🛠 Skills', text: 'What skills does Trung Nguyên have?' },
	{ label: '📬 Contact', text: 'How can I contact Trung Nguyên?' },
	{ label: '🔄 Reset UI', text: 'Reset the UI back to default' },
];
```

- [ ] **Step 2: Translate the Info tooltip (also sync the model name — `model.ts` now uses `openai/gpt-oss-120b`, not `llama-3.3-70b`)**

Replace lines 240-260 (the tooltip `<div>` contents):

```tsx
										<p className="text-foreground font-semibold mb-1">
											⚠️ Demo showcase
										</p>
										<p className="mb-1.5">
											Demonstrates AG-UI, tool calling,
											and context engineering — not a
											production support bot.
										</p>
										<p className="mb-1.5">
											Model: Groq{' '}
											<code className="text-primary">
												openai/gpt-oss-120b
											</code>{' '}
											(free tier). Limited to ~100k
											tokens/day, may hit rate limits at
											any time.
										</p>
										<p>
											Conversation history isn&apos;t
											saved across page reloads.
										</p>
```

- [ ] **Step 3: Translate the two fallback assistant messages**

Line ~142-144 (`Bot không trả lời được...`):

```tsx
							content: "The bot couldn't generate a reply. Please try again.",
```

Line ~152-154 (`Mất kết nối đến server...`):

```tsx
						content: 'Lost connection to the server. Please try again.',
```

- [ ] **Step 4: Flip system prompt default language in `system-prompt.ts`**

Replace lines 35-36:

```ts
Be friendly, concise, and professional. Respond in the same language as the user
(default to English if unclear).
```

- [ ] **Step 5: Translate `onError` strings in `route.ts`**

Replace lines 31 and 33:

```ts
					return 'The bot is overloaded right now (Groq quota exhausted). Please try again in a few minutes.';
				}
				return 'Something went wrong while processing your request. Please try again.';
```

- [ ] **Step 6: Update `CLAUDE.md`** — add a language-policy line and sync the model name

In the `## Architecture` section, right after the opening paragraph (after line 19, before `**Page structure**`), insert:

```markdown
**Language policy**: English is the default written language for all UI copy, chatbot prompts, and error strings. Vietnamese is used ONLY for the proper name "Nguyễn Trung Nguyên" / "Trung Nguyên", or where a user explicitly asks for Vietnamese output.
```

In the `**AI chatbot**` paragraph, replace `` `llama-3.3-70b-versatile` `` with `` `openai/gpt-oss-120b` ``.

- [ ] **Step 7: Verify**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

Run: `npm run dev`, open the chat widget in a browser, confirm chips/tooltip/empty-state render in English.

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/chat-widget.tsx src/lib/chat/system-prompt.ts src/app/api/chat/route.ts src/lib/chat/model.ts CLAUDE.md docs/superpowers/plans/2026-06-29-chatbot-phase1.md docs/superpowers/plans/2026-06-29-chatbot-phase2-agui.md
git commit -m "feat(chat): make chatbot copy English-first, sync model name, document language policy"
```

---

### Task 2: CV download button in Hero section

**Files:**
- Modify: `src/components/sections/hero-section.tsx:1-7` (imports), `:146-168` (CTA row)

- [ ] **Step 1: Import the `Download` icon**

Replace line 5:

```tsx
import { ArrowDown, Download } from 'lucide-react';
```

- [ ] **Step 2: Add the CV download button to the CTA row**

Replace the CTA `motion.div` (lines 146-168) with:

```tsx
						<motion.div
							{...(shouldReduce ? {} : fadeUp(0.42))}
							className="flex flex-wrap gap-3 sm:gap-4 items-center justify-center lg:justify-start mb-10"
						>
							<button
								onClick={() =>
									scrollToSection('projects-section')
								}
								className="font-pixel text-[10px] sm:text-xs px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground border-2 border-primary transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_color-mix(in_oklch,var(--primary)_40%,transparent)] focus-visible:outline-2 focus-visible:outline-dotted focus-visible:outline-ring focus-visible:outline-offset-2 active:translate-y-0 leading-relaxed"
								aria-label="View my projects"
							>
								&#x25B6; VIEW WORK
							</button>
							<button
								onClick={() =>
									scrollToSection('contact-section')
								}
								className="font-pixel text-[10px] sm:text-xs px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-foreground border-2 border-dotted border-foreground transition-all duration-150 hover:border-solid hover:border-primary hover:text-primary hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-dotted focus-visible:outline-ring focus-visible:outline-offset-2 leading-relaxed"
								aria-label="Contact me"
							>
								&middot; CONTACT &middot;
							</button>
							<a
								href="/cv_nguyen_trung_nguyen_fullstack.pdf"
								download="Nguyen_Trung_Nguyen_CV.pdf"
								className="font-pixel text-[10px] sm:text-xs px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-foreground border-2 border-dotted border-foreground transition-all duration-150 hover:border-solid hover:border-primary hover:text-primary hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-dotted focus-visible:outline-ring focus-visible:outline-offset-2 leading-relaxed inline-flex items-center gap-2"
								aria-label="Download CV"
							>
								<Download
									className="w-3 h-3"
									aria-hidden="true"
								/>
								DOWNLOAD CV
							</a>
						</motion.div>
```

(This switches the row from `flex-col sm:flex-row` to `flex-wrap` so three buttons don't overflow on narrow viewports — everything else in the block is unchanged, including the `·` glyphs which were already `&middot;`-equivalent literal characters in the file; keep whichever literal form is currently in the file if it differs from `&middot;`.)

- [ ] **Step 2: Verify**

Run: `npm run dev`, open the hero section, click "DOWNLOAD CV", confirm the PDF downloads (not just opens inline) and the button wraps cleanly at mobile width (375px).

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/hero-section.tsx
git commit -m "feat(hero): add CV download button"
```

---

### Task 3: Sync SEO metadata + personalInfo/technicalSkills with new CV

**Files:**
- Modify: `src/app/layout.tsx:49-113` (metadata + JSON-LD)
- Modify: `src/app/page.tsx:13-28` (page metadata)
- Modify: `src/data/personalInfo.tsx` (full file)
- Bundle (already modified in working tree, referenced by `metadata.icons` / JSON-LD `image`): `public/dev-icon.png`

- [ ] **Step 1: Update `layout.tsx` metadata description/keywords/OG/Twitter**

Replace the `description` (lines 51-52):

```ts
	description:
		'Full-Stack Developer with hands-on experience building distributed systems, AI-powered applications, and cloud-native deployments. Skilled in LangGraph, MCP, RAG, Spring Boot, FastAPI, and Next.js.',
```

Replace `keywords` (lines 53-69), adding CV-driven terms:

```ts
	keywords: [
		'Nguyễn Trung Nguyên',
		'NguyenNguyen0',
		'Full-Stack Developer',
		'Backend Developer',
		'AI Integration',
		'LangGraph',
		'MCP',
		'RAG',
		'LangChain4j',
		'Gemini API',
		'Spring Boot',
		'FastAPI',
		'NestJS',
		'Next.js',
		'React',
		'React Native',
		'Microservices',
		'Distributed Systems',
		'Qdrant',
		'Portfolio',
		'Vietnam Developer',
	],
```

Replace `openGraph.description` (line 81) and `twitter.description` (line 99) with:

```ts
			'Building distributed systems and AI-powered applications. LangGraph · MCP · RAG · Spring Boot · FastAPI · Next.js.',
```

- [ ] **Step 2: Extend the JSON-LD `Person` schema**

In the `dangerouslySetInnerHTML` object (lines 141-176), add `alumniOf` and `address` after `telephone`, and extend `knowsAbout`:

```ts
							telephone: '+84394757329',
							alumniOf: {
								'@type': 'CollegeOrUniversity',
								name: 'Industrial University of Ho Chi Minh City',
							},
							address: {
								'@type': 'PostalAddress',
								addressLocality: 'Go Vap, Ho Chi Minh City',
								addressCountry: 'VN',
							},
							description:
								'Full-Stack Developer with experience building distributed systems, AI-powered applications, and cloud-native deployments.',
							knowsAbout: [
								'Full-Stack Development',
								'Distributed Systems',
								'Microservices',
								'AI Integration',
								'LangGraph',
								'MCP',
								'RAG',
								'LangChain4j',
								'Gemini API',
								'Spring Boot',
								'FastAPI',
								'NestJS',
								'React',
								'Next.js',
								'React Native',
								'Kafka',
								'Qdrant',
								'Docker',
								'Terraform',
								'Ansible',
								'AWS',
								'API Design',
							],
```

(Keep `email`, `sameAs`, etc. as-is — only inserting `alumniOf`/`address` and extending `knowsAbout`.)

- [ ] **Step 3: Update `page.tsx` metadata**

Replace lines 14-27:

```ts
	title: 'Nguyễn Trung Nguyên — Full-Stack Developer Portfolio',
	description:
		'Backend/Full-Stack Developer specializing in distributed systems, AI-powered applications, and cloud-native deployments. Based in Ho Chi Minh City.',
	keywords: [
		'Backend Developer',
		'Full Stack',
		'Node.js',
		'TypeScript',
		'React',
		'Next.js',
		'FastAPI',
		'NestJS',
		'LangGraph',
		'RAG',
		'Portfolio',
		'Ho Chi Minh City',
	],
```

- [ ] **Step 4: Sync `personalInfo.tsx`**

Replace the full file:

```tsx
import {
	MapPin,
	MessageSquare,
	GraduationCap,
	BookOpen,
	Lightbulb,
	Award,
} from 'lucide-react';

export const personalInfo = [
	{
		icon: <MapPin className="text-xl" />,
		label: 'Location',
		value: 'Go Vap, Ho Chi Minh City',
	},
	{
		icon: <MessageSquare className="text-xl" />,
		label: 'Foreign language',
		value: 'TOEIC Listening & Reading 625 — comfortable reading and discussing technical documentation in English',
	},
	{
		icon: <GraduationCap className="text-xl" />,
		label: 'Education',
		value: 'Software Engineering @ Industrial University of Ho Chi Minh City (IUH), 2022–Present · GPA 3.2/4.0',
	},
	{
		icon: <BookOpen className="text-xl" />,
		label: 'Favorite topics',
		value: 'API Design, AI and UI/UX',
	},
	{
		icon: <Lightbulb className="text-xl" />,
		label: 'Goal',
		value: 'Contribute to scalable products as a Backend/Full-Stack Engineer while deepening expertise in software architecture and LLM integration',
	},
	{
		icon: <Award className="text-xl" />,
		label: 'Certification',
		value: 'CS50: Introduction to Computer Science — Harvard University (edX), Dec 2023',
	},
];

export const technicalSkills = [
	{
		title: 'Languages',
		skills: ['Java', 'Python', 'TypeScript'],
		variant: 'primary' as const,
	},
	{
		title: 'Frontend',
		skills: ['React', 'React Native (Expo)', 'Tailwind CSS'],
		variant: 'primary' as const,
	},
	{
		title: 'Backend',
		skills: [
			'Spring Boot',
			'FastAPI',
			'NestJS',
			'Node.js',
			'WebSocket',
			'REST APIs',
		],
		variant: 'secondary' as const,
	},
	{
		title: 'Databases',
		skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Qdrant', 'pgvector'],
		variant: 'secondary' as const,
	},
	{
		title: 'AI & LLM',
		skills: [
			'LangGraph',
			'MCP',
			'RAG',
			'Gemini API',
			'Groq',
			'LangChain4j',
			'AG-UI',
			'Vercel AI SDK',
		],
		variant: 'accent' as const,
	},
	{
		title: 'Cloud & DevOps',
		skills: [
			'Docker',
			'GitHub Actions',
			'GitLab CI/CD',
			'Terraform',
			'Ansible',
			'AWS',
			'Vercel',
		],
		variant: 'accent' as const,
	},
	{
		title: 'Tools',
		skills: ['Git', 'Postman', 'LangSmith'],
		variant: 'primary' as const,
	},
];

export const softSkills = [
	{
		title: 'Communication & Learning',
		skills: [
			'English reading & communication',
			'Self-learning & documentation',
		],
		variant: 'primary' as const,
	},
];
```

- [ ] **Step 5: Verify**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

Run: `npm run dev`, ask the chat widget "Trung Nguyên có những kỹ năng gì?" and confirm the reply lists the new categories (Databases, AI & LLM, Cloud & DevOps, etc.).

- [ ] **Step 6: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx src/data/personalInfo.tsx public/dev-icon.png
git commit -m "feat(seo): sync metadata, JSON-LD, and chatbot personal info with updated CV"
```

---

### Task 4: Project responsibilities/role bullets + chatbot awareness

**Files:**
- Modify: `src/data/projects.tsx:1-107` (interface + all 4 entries)
- Modify: `src/components/sections/projects-section.tsx:281-303` (title/meta block)
- Modify: `src/lib/chat/system-prompt.ts:14-25` (projectLines)

- [ ] **Step 1: Add `responsibilities` to the `Project` interface and populate all 4 projects**

In `src/data/projects.tsx`, add a field to the interface (after `role`, line 13):

```ts
	role: string;
	responsibilities: string[];
	team?: string;
```

Then add a `responsibilities` array to each project object. For `nexatech` (after `role`/`team`, i.e. insert before the closing `},` of that object):

```ts
		responsibilities: [
			'Owned the Product domain (catalog, category, brand, review, wishlist) using CQRS, MongoDB, and Redis',
			'Designed a distributed system combining Event-Driven, Space-Based, and Pipeline Architectures across 10+ microservices',
			"Built the platform's AI layer: LangGraph multi-agent system, MCP Orchestrator, and domain-specific MCP servers",
			'Built a real-time user-behavior pipeline with Kafka and Redis feeding a FastAPI/MongoDB recommendation service',
			'Automated infrastructure and deployment via GitLab CI/CD, Terraform, Ansible, and AWS EC2',
		],
```

For `chatly`:

```ts
		responsibilities: [
			'Built an AI assistant with LangGraph, Groq LLM, Qdrant, and MCP — mentions, summarization, reminders, polls, Q&A',
			'Implemented RAG workflows with FastAPI: session persistence, streaming responses, contextual retrieval over Qdrant',
			'Developed real-time messaging with WebSocket (JWT auth, group chat, GIFs, stickers, voice messages)',
			'Delivered cross-platform parity across React web and React Native mobile',
			'Set up CI/CD with GitHub Actions and Docker Compose, with LangSmith tracing and EAS Build for Android',
		],
```

For `aurora`:

```ts
		responsibilities: [
			'Built a RAG chatbot with LangChain4j, Gemini API, and pgvector, streaming answers over WebSocket',
			"Developed a Document Management module feeding the chatbot's RAG knowledge base",
			'Built a News Management module with a TipTap rich-text editor, decoupled from the RAG pipeline',
			'Deployed the full stack to Railway using Docker multi-stage builds',
		],
```

For `portfolio-website`:

```ts
		responsibilities: [
			'Designed a retro/pixel-art UI system with a Pac-Man-inspired visual language',
			'Integrated an AI Q&A assistant (Groq via Vercel AI SDK v7) with AG-UI-style tool calling',
			'Wired up the contact form (Nodemailer/Gmail), Vercel Speed Insights, and Framer Motion animations',
			'Reached 95+ Lighthouse scores; deployed to Vercel with automated GitHub CI/CD',
		],
```

- [ ] **Step 2: Render responsibilities on the project card**

In `src/components/sections/projects-section.tsx`, replace the title/meta block (lines 281-303) to add a bullet list after the role line:

```tsx
					{/* Title + meta */}
					<div>
						<h3 className="font-pixel text-sm sm:text-base text-foreground leading-relaxed mb-2.5">
							{project.title}
						</h3>
						<div className="flex flex-wrap gap-x-4 gap-y-1.5">
							{project.period && (
								<span className="font-pixel text-[7px] text-muted-foreground tracking-wide">
									{project.period}
								</span>
							)}
							{project.team && (
								<span className="font-pixel text-[7px] text-muted-foreground tracking-wide">
									· {project.team}
								</span>
							)}
						</div>
						{project.role && (
							<p className="font-pixel text-[7px] text-secondary mt-1 tracking-wide">
								{project.role}
							</p>
						)}
						{project.responsibilities?.length > 0 && (
							<ul className="mt-3 space-y-1">
								{project.responsibilities.map((item) => (
									<li
										key={item}
										className="font-mono-custom text-xs text-muted-foreground leading-relaxed flex gap-2"
									>
										<span
											className="text-primary flex-shrink-0"
											aria-hidden="true"
										>
											&#x25B8;
										</span>
										{item}
									</li>
								))}
							</ul>
						)}
					</div>
```

- [ ] **Step 3: Feed responsibilities into the chatbot's project context**

In `src/lib/chat/system-prompt.ts`, replace the `projectLines` map body (lines 15-24):

```ts
	const projectLines = projects
		.map((p) => {
			const links = [
				p.githubUrl ? `GitHub: ${p.githubUrl}` : '',
				p.gitlabUrl ? `GitLab: ${p.gitlabUrl}` : '',
				p.demoUrl ? `Demo: ${p.demoUrl}` : '',
			]
				.filter(Boolean)
				.join('; ');
			const responsibilities = p.responsibilities?.length
				? `\n  Responsibilities: ${p.responsibilities.join('; ')}.`
				: '';
			return `- **${p.title}** (${p.period}): ${p.description}\n  Tech: ${p.techStack.join(', ')}. Role: ${p.role}${p.team ? `. Team: ${p.team}` : ''}${links ? `.\n  Links: ${links}` : ''}.${responsibilities}`;
		})
		.join('\n');
```

- [ ] **Step 4: Verify**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors (TypeScript will flag any project object missing the now-required `responsibilities` field — fix any gaps).

Run: `npm run dev`, scroll to Projects, confirm bullet lists render under each role. Ask the chatbot "What did you do on NexaTech?" and confirm it cites specific responsibilities.

- [ ] **Step 5: Commit**

```bash
git add src/data/projects.tsx src/components/sections/projects-section.tsx src/lib/chat/system-prompt.ts
git commit -m "feat(projects): add per-project responsibilities from CV, surface in UI and chatbot"
```

---

### Task 5: NexaTech thumbnail/gallery images

**Files:**
- Modify: `src/data/projects.tsx` (nexatech entry)

- [ ] **Step 1: Add the `images` array to the `nexatech` project**

In the `nexatech` object (after `gitlabUrl`, before `type`), add:

```ts
		images: [
			'/nexatech/nexatech1.png',
			'/nexatech/nexatech2.png',
			'/nexatech/nexatech3.png',
			'/nexatech/nexatech4.png',
			'/nexatech/nexatech5.png',
			'/nexatech/nexatech6.png',
		],
```

(These 6 files already exist in `public/nexatech/` — no new assets needed. This matches the `images`-array pattern already used by `chatly` and `aurora`, so the existing `Carousel` component in `projects-section.tsx` picks them up with no code changes.)

- [ ] **Step 2: Verify**

Run: `npm run dev`, scroll to the NexaTech card, confirm the carousel cycles through all 6 screenshots and the lightbox opens on click.

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.tsx
git commit -m "feat(projects): add NexaTech screenshot gallery"
```

---

### Task 6: "Explore more projects" card

**Files:**
- Modify: `src/components/sections/projects-section.tsx` (add component + render it)

- [ ] **Step 1: Add an `ExploreMoreCard` component**

In `src/components/sections/projects-section.tsx`, add this new component after `ProjectCard` (after line 386, before the `// ── Section ──` comment):

```tsx
// ── Explore More ────────────────────────────────────────────────────────────

function ExploreMoreCard() {
	return (
		<motion.div
			variants={fadeUp}
			className="border border-dashed border-primary/50 bg-card p-8 sm:p-12 flex flex-col items-center justify-center text-center gap-4"
		>
			<p className="font-pixel text-xs sm:text-sm text-primary tracking-widest">
				&#x25B6; EXPLORE MORE PROJECTS
			</p>
			<p className="font-mono-custom text-sm text-muted-foreground max-w-md">
				More repositories, experiments, and side projects live on
				GitHub and GitLab.
			</p>
			<div className="flex flex-wrap gap-3 justify-center pt-2">
				<a
					href="https://github.com/NguyenNguyen0?tab=repositories"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Explore more projects on GitHub"
					className="font-pixel text-[9px] flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground border-2 border-primary transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_3px_0_0_color-mix(in_oklch,var(--primary)_40%,transparent)]"
				>
					<Github className="w-3 h-3" aria-hidden="true" />
					GITHUB
				</a>
				<a
					href="https://gitlab.com/users/nguyennguyen0/groups"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Explore more projects on GitLab"
					className="font-pixel text-[9px] flex items-center gap-2 px-4 py-2.5 border border-dotted border-border text-muted-foreground transition-all duration-150 hover:border-solid hover:border-primary hover:text-primary hover:-translate-y-0.5"
				>
					<GitLabIcon />
					GITLAB
				</a>
			</div>
		</motion.div>
	);
}
```

- [ ] **Step 2: Render it after the project list**

In the `ProjectsSection` component, replace the `projects.map(...)` block (lines 434-441) to append the new card inside the same staggered container:

```tsx
				{projects.map((project, i) => (
					<ProjectCard
						key={project.id}
						project={project}
						index={i}
						isHighlighted={state.highlightedProject === project.id}
					/>
				))}
				<ExploreMoreCard />
```

- [ ] **Step 3: Verify**

Run: `npm run dev`, scroll past the last project card, confirm the "Explore more projects" card renders with working GitHub/GitLab links (open in new tab, `rel="noopener noreferrer"` present).

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/projects-section.tsx
git commit -m "feat(projects): add explore-more-projects card with GitHub/GitLab links"
```

---

### Task 7: Lighthouse verification (Performance / Accessibility / Best Practices / SEO ≥ 95)

**Files:** none (verification-only task; may produce a follow-up fix commit if any category is below 95)

- [ ] **Step 1: Production build**

```bash
npm run build
```

Expected: build succeeds with no ESLint/TypeScript errors.

- [ ] **Step 2: Start the production server in the background**

```bash
npm run start &
```

Expected: server listening on `http://localhost:3000`.

- [ ] **Step 3: Run Lighthouse against the Playwright-installed Chromium (no system Chrome present on this machine)**

```bash
CHROME_PATH="$HOME/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome"
mkdir -p /tmp/claude-1000/-home-nguyen-Workspace-nodejs-my-portfolio/43f061b0-f66f-42d7-ae2a-0f425af6ed88/scratchpad/lighthouse
npx -y lighthouse http://localhost:3000 \
  --chrome-path="$CHROME_PATH" \
  --chrome-flags="--headless=new --no-sandbox" \
  --preset=desktop \
  --output=json --output-path=/tmp/claude-1000/-home-nguyen-Workspace-nodejs-my-portfolio/43f061b0-f66f-42d7-ae2a-0f425af6ed88/scratchpad/lighthouse/desktop.json \
  --only-categories=performance,accessibility,best-practices,seo
npx -y lighthouse http://localhost:3000 \
  --chrome-path="$CHROME_PATH" \
  --chrome-flags="--headless=new --no-sandbox" \
  --output=json --output-path=/tmp/claude-1000/-home-nguyen-Workspace-nodejs-my-portfolio/43f061b0-f66f-42d7-ae2a-0f425af6ed88/scratchpad/lighthouse/mobile.json \
  --only-categories=performance,accessibility,best-practices,seo
```

- [ ] **Step 4: Read the category scores**

```bash
node -e "
for (const f of ['desktop','mobile']) {
  const r = require('/tmp/claude-1000/-home-nguyen-Workspace-nodejs-my-portfolio/43f061b0-f66f-42d7-ae2a-0f425af6ed88/scratchpad/lighthouse/' + f + '.json');
  console.log(f, Object.fromEntries(Object.entries(r.categories).map(([k,v]) => [k, Math.round(v.score*100)])));
}
"
```

Expected: `performance`, `accessibility`, `best-practices`, `seo` all ≥ 95 in both runs.

- [ ] **Step 5: If any category is below 95, diagnose and fix**

Read the specific audit failures from the JSON (`r.audits`, filter by `score < 1` within the failing category) — common culprits in this stack:
- Performance: unsized `next/image` usage, missing `priority`/`sizes`, large LCP element (the hero `PlayerCard` avatar already has `priority` + explicit width/height — verify it wasn't broken by Task 2/6 edits).
- Accessibility: color contrast on the new `ExploreMoreCard` links/text against `bg-card`, missing `aria-label`s on new interactive elements (Task 2's download link, Task 6's GitHub/GitLab links already have `aria-label`).
- SEO: meta description length (Google truncates ~155-160 chars — check the new `layout.tsx`/`page.tsx` descriptions from Task 3 aren't too long or too short), broken/missing `alt` text on the new NexaTech images (Task 5 reuses the existing `Carousel` component's `alt={`${title} — screenshot ${idx+1} of ${images.length}`}`, so this should already be covered).

Apply the minimal fix, re-run Steps 1-4 until all four categories are ≥ 95 in both desktop and mobile runs.

- [ ] **Step 6: Stop the server**

```bash
kill %1
```

- [ ] **Step 7: Commit (only if Step 5 required code changes)**

```bash
git add -A
git commit -m "perf: fix Lighthouse findings to reach 95+ across performance/a11y/best-practices/SEO"
```

---

## Self-Review

- **Spec coverage:** (1) English-first chatbot copy + CLAUDE.md doc → Task 1. (2) CV download button in hero → Task 2. (3) SEO metadata + project section + prompts + other parts (personalInfo/technicalSkills) synced to new CV → Tasks 3-4. (3.1) Per-project responsibilities/role → Task 4. (4) NexaTech thumbnail → Task 5. (5) Explore-more-projects card with GitHub/GitLab links → Task 6. Lighthouse 95+ across all metrics, one commit per job, pre-existing uncommitted changes folded into the matching job → Task 7 + Global Constraints. All covered.
- **Placeholder scan:** no TBD/TODO — every step has literal code to write.
- **Type consistency:** `responsibilities: string[]` added to `Project` interface in Task 4 Step 1 and consumed identically in `projects-section.tsx` (Task 4 Step 2) and `system-prompt.ts` (Task 4 Step 3); `images` field in Task 5 reuses the interface's existing `images?: string[]` — no new type needed.
