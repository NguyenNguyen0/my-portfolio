// Extracts a fixed subset of tech-stack-icons' SVGs (light + dark variants)
// into static files under public/icons/stack/. tech-stack-icons ships its
// entire ~690-icon dataset as one runtime module with no per-icon export, so
// importing the package client-side bundles all of it (~8.7MB — confirmed by
// building with it once). Running this script at dev time and committing the
// output avoids that: the package stays a devDependency, never shipped to
// the browser. Re-run after `npm update tech-stack-icons` if icons change.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const pkgEntry = path.join(
	here,
	'../node_modules/tech-stack-icons/dist/index.js',
);
const tmpEntry = path.join(here, '.tech-stack-icons-data.mjs');
const OUT_DIR = path.join(here, '../public/icons/stack');

// techId -> tech-stack-icons name
const ICONS = {
	html: 'html5',
	css: 'css3',
	javascript: 'js',
	typescript: 'typescript',
	java: 'java',
	python: 'python',
	go: 'go',
	react: 'react',
	redux: 'redux',
	nextjs: 'nextjs',
	tailwindcss: 'tailwindcss',
	nodejs: 'nodejs',
	express: 'expressjs',
	flask: 'flask',
	mongodb: 'mongodb',
	postgresql: 'postgresql',
	redis: 'redis',
	git: 'git',
	docker: 'docker',
	postman: 'postman',
	vercel: 'vercel',
	linux: 'linux',
	langgraph: 'langgraph',
	gemini: 'gemini',
	aws: 'aws',
	terraform: 'terraform',
	spring: 'spring',
	expo: 'expo',
	nestjs: 'nestjs',
	groq: 'groq',
	ollama: 'ollama',
};

const src = await readFile(pkgEntry, 'utf8');
const marker = 'var f={';
const idx = src.indexOf(marker);
if (idx === -1) {
	throw new Error(
		'Could not find icon data literal in tech-stack-icons bundle — package internals may have changed.',
	);
}
const patched = `export const __iconsData=${src
	.slice(idx + 'var f='.length)
	.replace(';var h=f;', ';var h=__iconsData;')}`;
await writeFile(tmpEntry, patched);

try {
	const { __iconsData } = await import(
		`file://${tmpEntry}?t=${Date.now()}`
	);

	await mkdir(OUT_DIR, { recursive: true });

	let count = 0;
	for (const [techId, stackIconName] of Object.entries(ICONS)) {
		const entry = __iconsData[stackIconName];
		if (!entry) {
			console.error(
				`MISSING in tech-stack-icons: ${stackIconName} (${techId})`,
			);
			continue;
		}
		await writeFile(
			path.join(OUT_DIR, `${techId}-light.svg`),
			entry.svg.light,
		);
		await writeFile(path.join(OUT_DIR, `${techId}-dark.svg`), entry.svg.dark);
		count += 1;
	}

	console.log(`Extracted ${count} icons (light+dark) to ${OUT_DIR}`);
} finally {
	await rm(tmpEntry, { force: true });
}
