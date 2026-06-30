import { promises as fs } from 'fs';
import path from 'path';

export type ReadmeEntry = {
	content: string;
	fetchedAt: string;
	truncated: boolean;
};

type ReadmeCache = Record<string, ReadmeEntry>;

const CACHE_PATH = path.join(process.cwd(), 'src', 'data', 'readme-cache.json');

let _cache: ReadmeCache | null = null;

export async function loadReadmeCache(): Promise<ReadmeCache> {
	if (_cache) return _cache;
	try {
		const raw = await fs.readFile(CACHE_PATH, 'utf-8');
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
