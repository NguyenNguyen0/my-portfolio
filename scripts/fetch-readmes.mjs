import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Sync with src/data/projects.tsx — only repos we can fetch
const REPOS = [
  { source: 'github', owner: 'NguyenNguyen0', name: 'my-portfolio' },
  { source: 'github', owner: 'giasinguyen', name: 'chatly-messaging-platform' },
  { source: 'github', owner: 'giasinguyen', name: 'aurora-hotel-management-system' },
  { source: 'gitlab', owner: 'software-architecture264301', name: 'software-architecture264301' },
];

const MAX_CHARS = 24_000;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function fetchGithubReadme(owner, name) {
  const headers = GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {};
  for (const branch of ['main', 'master']) {
    for (const file of ['README.md', 'readme.md']) {
      const url = `https://raw.githubusercontent.com/${owner}/${name}/${branch}/${file}`;
      const res = await fetch(url, { headers });
      if (res.ok) return res.text();
    }
  }
  return null;
}

async function fetchGitlabReadme(owner, name) {
  const project = encodeURIComponent(`${owner}/${name}`);
  for (const branch of ['main', 'master']) {
    for (const file of ['README.md', 'readme.md']) {
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
      content = repo.source === 'github'
        ? await fetchGithubReadme(repo.owner, repo.name)
        : await fetchGitlabReadme(repo.owner, repo.name);
    } catch (err) {
      console.log(`error: ${err.message}`);
      continue;
    }
    if (!content) { console.log('not found, skipping.'); continue; }
    const truncated = content.length > MAX_CHARS;
    cache[key] = {
      content: truncated ? content.slice(0, MAX_CHARS) + '\n\n[...truncated]' : content,
      fetchedAt: new Date().toISOString(),
      truncated,
    };
    console.log(`ok (${content.length} chars${truncated ? ', truncated' : ''}).`);
  }
  const outPath = path.join(__dirname, '..', 'src', 'data', 'readme-cache.json');
  await fs.writeFile(outPath, JSON.stringify(cache, null, 2), 'utf-8');
  console.log(`\nWrote ${Object.keys(cache).length} entries to ${outPath}`);
}

main().catch(e => { console.error(e); process.exit(1); });
