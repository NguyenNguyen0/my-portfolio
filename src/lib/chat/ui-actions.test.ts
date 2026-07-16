import { describe, it, expect } from 'vitest';
import { resolveUiEffects, DEFAULT_THEME } from './ui-actions';
import type { UiActionName } from './tools';

describe('resolveUiEffects', () => {
	it('reset_ui resets theme, css vars, and dispatches RESET', () => {
		const effects = resolveUiEffects('reset_ui', {});
		expect(effects).toEqual([
			{ kind: 'setTheme', theme: DEFAULT_THEME },
			{ kind: 'removeCssVar', name: '--primary' },
			{ kind: 'removeCssVar', name: '--ring' },
			{ kind: 'dispatch', action: { type: 'RESET' } },
		]);
	});

	it('change_accent_color sets both css vars and dispatches', () => {
		const effects = resolveUiEffects('change_accent_color', {
			color: 'blue',
			primary: 'oklch(60% 0.22 260)',
			ring: 'oklch(60% 0.22 260)',
		});
		expect(effects).toEqual([
			{
				kind: 'setCssVar',
				name: '--primary',
				value: 'oklch(60% 0.22 260)',
			},
			{ kind: 'setCssVar', name: '--ring', value: 'oklch(60% 0.22 260)' },
			{
				kind: 'dispatch',
				action: { type: 'SET_ACCENT_COLOR', color: 'blue' },
			},
		]);
	});

	it('throws for an action outside the known union (fails loudly, not silently)', () => {
		expect(() =>
			resolveUiEffects('not_a_real_action' as UiActionName, {}),
		).toThrow(/Unhandled UI action/);
	});
});
