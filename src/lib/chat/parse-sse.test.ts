import { describe, it, expect } from 'vitest';
import { parseSSEBuffer } from './parse-sse';

describe('parseSSEBuffer', () => {
	it('parses a text-delta event', () => {
		const { events, rest } = parseSSEBuffer(
			'data: {"type":"text-delta","delta":"Hi"}\n',
		);
		expect(events).toEqual([{ type: 'text-delta', delta: 'Hi' }]);
		expect(rest).toBe('');
	});

	it('parses a tool-output-available event', () => {
		const { events } = parseSSEBuffer(
			'data: {"type":"tool-output-available","output":{"ok":true,"action":"reset_ui"}}\n',
		);
		expect(events).toEqual([
			{
				type: 'tool-output-available',
				output: { ok: true, action: 'reset_ui' },
			},
		]);
	});

	it('parses an error event', () => {
		const { events } = parseSSEBuffer(
			'data: {"type":"error","errorText":"rate limited"}\n',
		);
		expect(events).toEqual([{ type: 'error', errorText: 'rate limited' }]);
	});

	it('skips non-"data: " lines and malformed JSON', () => {
		const { events } = parseSSEBuffer(
			'event: message\ndata: not-json\ndata: {"type":"text-delta","delta":"ok"}\n',
		);
		expect(events).toEqual([{ type: 'text-delta', delta: 'ok' }]);
	});

	it('holds back an incomplete trailing line for the next chunk', () => {
		const { events, rest } = parseSSEBuffer(
			'data: {"type":"text-delta","delta":"a"}\ndata: {"type":"text-del',
		);
		expect(events).toEqual([{ type: 'text-delta', delta: 'a' }]);
		expect(rest).toBe('data: {"type":"text-del');
	});
});
