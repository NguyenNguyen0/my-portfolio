const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 10;

// ponytail: single-instance in-memory map, fine at portfolio traffic scale.
// Resets on redeploy/cold start; move to Upstash/Vercel KV if traffic grows
// past one instance or persistence across restarts matters.
const hits = new Map<string, { count: number; resetAt: number }>();

export function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const entry = hits.get(ip);
	if (!entry || now > entry.resetAt) {
		hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
		return false;
	}
	entry.count += 1;
	return entry.count > MAX_REQUESTS_PER_WINDOW;
}
