import { tool } from 'ai';
import { z } from 'zod';
import { getCachedReadme } from './readme-cache';
import { projects } from '@/data/projects';

// ── read_readme (Phase 1 — unchanged) ─────────────────────────────────────────

function findProjectRepo(name: string) {
  const norm = name.trim().toLowerCase();
  const p = projects.find(
    (proj) => proj.title.toLowerCase().includes(norm) || proj.id.toLowerCase() === norm,
  );
  if (!p) return null;
  if (p.githubUrl) {
    const match = p.githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (match) return { source: 'github' as const, owner: match[1], name: match[2] };
  }
  if (p.gitlabUrl) {
    const match = p.gitlabUrl.match(/gitlab\.com\/([^/]+)(?:\/([^/]+))?/);
    if (match) return { source: 'gitlab' as const, owner: match[1], name: match[2] ?? match[1] };
  }
  return null;
}

const readReadmeTool = tool({
  description:
    'Read the detailed README of a specific project. ' +
    'Only use when the user needs deep details (setup, architecture, specific features) ' +
    'not covered by the project summary. Pass the project name as listed.',
  inputSchema: z.object({
    projectName: z.string().describe('Project name, e.g. "Chatly" or "Aurora"'),
  }),
  execute: async ({ projectName }: { projectName: string }) => {
    const repo = findProjectRepo(projectName);
    if (!repo) return { ok: false, message: `Project "${projectName}" not found or has no repo.` };
    const entry = await getCachedReadme(repo.owner, repo.name);
    if (!entry) return { ok: false, message: `No README cache for "${projectName}". Summary info is already in context.` };
    return { ok: true, project: projectName, truncated: entry.truncated, content: entry.content };
  },
});

// ── AG-UI tools (Phase 2) ──────────────────────────────────────────────────────

const SECTION_IDS = {
  hero: 'hero',
  about: 'about',
  story: 'story',
  projects: 'projects-section',
  contact: 'contact-section',
} as const;

const ACCENT_COLORS = {
  yellow: { primary: 'oklch(87.6% 0.179 95.4)', ring: 'oklch(87.6% 0.179 95.4)' },
  blue:   { primary: 'oklch(60% 0.22 260)',      ring: 'oklch(60% 0.22 260)' },
  purple: { primary: 'oklch(65% 0.25 300)',      ring: 'oklch(65% 0.25 300)' },
  green:  { primary: 'oklch(65% 0.20 145)',      ring: 'oklch(65% 0.20 145)' },
  red:    { primary: 'oklch(60% 0.22 20)',       ring: 'oklch(60% 0.22 20)' },
  cyan:   { primary: 'oklch(75% 0.18 195)',      ring: 'oklch(75% 0.18 195)' },
  orange: { primary: 'oklch(75% 0.20 55)',       ring: 'oklch(75% 0.20 55)' },
} as const;

const scrollToSectionTool = tool({
  description: 'Scroll the portfolio page to a specific section. Use when the user asks to see a section.',
  inputSchema: z.object({
    section: z.enum(['hero', 'about', 'story', 'projects', 'contact']),
  }),
  execute: async ({ section }: { section: keyof typeof SECTION_IDS }) => ({
    ok: true,
    action: 'scroll_to_section',
    sectionId: SECTION_IDS[section],
  }),
});

const changeThemeTool = tool({
  description: 'Switch the portfolio between DARK mode and LIGHT mode only. Do NOT use this to change colors — use change_accent_color for that.',
  inputSchema: z.object({ theme: z.enum(['dark', 'light']) }),
  execute: async ({ theme }: { theme: 'dark' | 'light' }) => ({
    ok: true,
    action: 'change_theme',
    theme,
  }),
});

const changeAccentColorTool = tool({
  description: 'Change the portfolio primary/accent color. Use when the user asks to change color, primary color, accent color, or "màu" in Vietnamese. Available: yellow (default), blue, purple, green, red, cyan, orange.',
  inputSchema: z.object({
    color: z.enum(['yellow', 'blue', 'purple', 'green', 'red', 'cyan', 'orange']),
  }),
  execute: async ({ color }: { color: keyof typeof ACCENT_COLORS }) => ({
    ok: true,
    action: 'change_accent_color',
    color,
    ...ACCENT_COLORS[color],
  }),
});

const highlightProjectTool = tool({
  description: 'Scroll to the projects section and spotlight a specific project card with a glow effect.',
  inputSchema: z.object({
    projectId: z.string().describe('Project id, e.g. "chatly", "aurora", "nexatech", "portfolio-website"'),
  }),
  execute: async ({ projectId }: { projectId: string }) => ({
    ok: true,
    action: 'highlight_project',
    projectId,
  }),
});

const setHeroDescriptionTool = tool({
  description: 'Temporarily override the hero section description paragraph with custom text.',
  inputSchema: z.object({
    text: z.string().max(200).describe('New description text for the hero section (max 200 chars)'),
  }),
  execute: async ({ text }: { text: string }) => ({
    ok: true,
    action: 'set_hero_description',
    text,
  }),
});

const focusSkillTool = tool({
  description: 'Pulse-highlight a skill node in the About section constellation.',
  inputSchema: z.object({
    skillId: z.string().describe(
      'Skill node id. Valid values: linux, mcp, langgraph, gemini, aws, docker, terraform, kafka, spring, fastapi, react, rag',
    ),
  }),
  execute: async ({ skillId }: { skillId: string }) => ({
    ok: true,
    action: 'focus_skill',
    skillId,
  }),
});

const resetUiTool = tool({
  description: 'Reset all chatbot UI modifications back to defaults (colors, text overrides, highlights).',
  inputSchema: z.preprocess((v) => v ?? {}, z.object({})),
  execute: async () => ({ ok: true, action: 'reset_ui' }),
});

// ── Export ─────────────────────────────────────────────────────────────────────

export const UI_ACTION_TOOLS = new Set([
  'scroll_to_section',
  'change_theme',
  'change_accent_color',
  'highlight_project',
  'set_hero_description',
  'focus_skill',
  'reset_ui',
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
