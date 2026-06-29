import { personalInfo, technicalSkills } from '@/data/personalInfo';
import { projects } from '@/data/projects';
import { socialLinks } from '@/data/socialLink';

export function buildSystemPrompt(): string {
  const infoLines = personalInfo
    .map((item) => `- ${item.label}: ${item.value}`)
    .join('\n');

  const skillLines = technicalSkills
    .map((cat) => `- ${cat.title}: ${cat.skills.join(', ')}`)
    .join('\n');

  const projectLines = projects
    .map((p) => {
      const links = [
        p.githubUrl ? `GitHub: ${p.githubUrl}` : '',
        p.gitlabUrl ? `GitLab: ${p.gitlabUrl}` : '',
        p.demoUrl ? `Demo: ${p.demoUrl}` : '',
      ]
        .filter(Boolean)
        .join('; ');
      return `- **${p.title}** (${p.period}): ${p.description}\n  Tech: ${p.techStack.join(', ')}. Role: ${p.role}${p.team ? `. Team: ${p.team}` : ''}${links ? `.\n  Links: ${links}` : ''}.`;
    })
    .join('\n');

  const contactLines = socialLinks
    .map((s) => `- ${s.label}: ${s.url}`)
    .join('\n');

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
