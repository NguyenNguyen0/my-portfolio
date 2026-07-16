import type { PortfolioStateAction } from '@/context/portfolio-actions';
import type { UiActionName } from './tools';

export const DEFAULT_THEME = 'dark';

export type UiEffect =
	| { kind: 'scrollTo'; elementId: string }
	| { kind: 'setTheme'; theme: string }
	| { kind: 'setCssVar'; name: string; value: string }
	| { kind: 'removeCssVar'; name: string }
	| { kind: 'dispatch'; action: PortfolioStateAction };

function assertNever(action: never): never {
	throw new Error(`Unhandled UI action: ${JSON.stringify(action)}`);
}

// Pure mapping from a tool's output to the UI effects it causes — kept
// free of DOM/React so it can be unit tested without a browser. No `default`
// branch: if a new tool is added to chatTools without a case here, TypeScript
// fails the build at the `assertNever` call below instead of silently no-op'ing.
export function resolveUiEffects(
	action: UiActionName,
	args: Record<string, unknown>,
): UiEffect[] {
	switch (action) {
		case 'scroll_to_section':
			return [{ kind: 'scrollTo', elementId: args.sectionId as string }];
		case 'change_theme':
			return [{ kind: 'setTheme', theme: args.theme as string }];
		case 'change_accent_color':
			return [
				{
					kind: 'setCssVar',
					name: '--primary',
					value: args.primary as string,
				},
				{
					kind: 'setCssVar',
					name: '--ring',
					value: args.ring as string,
				},
				{
					kind: 'dispatch',
					action: {
						type: 'SET_ACCENT_COLOR',
						color: args.color as string,
					},
				},
			];
		case 'highlight_project':
			return [
				{ kind: 'scrollTo', elementId: 'projects-section' },
				{
					kind: 'dispatch',
					action: {
						type: 'SET_HIGHLIGHTED_PROJECT',
						projectId: args.projectId as string,
					},
				},
			];
		case 'set_hero_description':
			return [
				{
					kind: 'dispatch',
					action: {
						type: 'SET_HERO_DESCRIPTION',
						text: args.text as string,
					},
				},
			];
		case 'focus_skill':
			return [
				{
					kind: 'dispatch',
					action: {
						type: 'SET_FOCUSED_SKILL',
						skillId: args.skillId as string,
					},
				},
			];
		case 'reset_ui':
			return [
				{ kind: 'setTheme', theme: DEFAULT_THEME },
				{ kind: 'removeCssVar', name: '--primary' },
				{ kind: 'removeCssVar', name: '--ring' },
				{ kind: 'dispatch', action: { type: 'RESET' } },
			];
		default:
			return assertNever(action);
	}
}
