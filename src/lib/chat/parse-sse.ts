// Parses `text/event-stream` chunks from the /api/chat UIMessage stream.
// Pulled out of chat-widget.tsx so the format (already broken/fixed by AI SDK
// version bumps at least twice) has a unit test instead of only living inside
// a React event handler.
export function parseSSEBuffer(buffer: string): {
	events: Record<string, unknown>[];
	rest: string;
} {
	const lines = buffer.split('\n');
	const rest = lines.pop() ?? '';

	const events: Record<string, unknown>[] = [];
	for (const line of lines) {
		if (!line.startsWith('data: ')) continue;
		const raw = line.slice(6).trim();
		if (!raw) continue;
		try {
			events.push(JSON.parse(raw));
		} catch {
			// malformed line — skip, matches prior inline behavior
		}
	}
	return { events, rest };
}
