import { tool } from 'ai';
import { z } from 'zod';
import { getCachedReadme } from './readme-cache';
import { projects } from '@/data/projects';

function findProjectRepo(name: string) {
  const norm = name.trim().toLowerCase();
  const p = projects.find((proj) => proj.title.toLowerCase().includes(norm) || proj.id.toLowerCase() === norm);
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

export const chatTools = {
  read_readme: tool({
    description:
      'Read the detailed README of a specific project. ' +
      'Only use when the user needs deep details (setup, architecture, specific features) ' +
      'not covered by the project summary. Pass the project name as listed.',
    inputSchema: z.object({
      projectName: z.string().describe('Project name, e.g. "Chatly" or "Aurora"'),
    }),
    execute: async ({ projectName }: { projectName: string }) => {
      const repo = findProjectRepo(projectName);
      if (!repo) {
        return { ok: false, message: `Project "${projectName}" not found or has no repo.` };
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
