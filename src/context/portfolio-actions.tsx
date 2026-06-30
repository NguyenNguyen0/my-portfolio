'use client';

import { createContext, useContext, useReducer, type ReactNode } from 'react';

export type PortfolioState = {
	accentColor: string | null;
	highlightedProject: string | null;
	heroDescription: string | null;
	focusedSkill: string | null;
};

export type PortfolioStateAction =
	| { type: 'SET_ACCENT_COLOR'; color: string | null }
	| { type: 'SET_HIGHLIGHTED_PROJECT'; projectId: string | null }
	| { type: 'SET_HERO_DESCRIPTION'; text: string | null }
	| { type: 'SET_FOCUSED_SKILL'; skillId: string | null }
	| { type: 'RESET' };

const initialState: PortfolioState = {
	accentColor: null,
	highlightedProject: null,
	heroDescription: null,
	focusedSkill: null,
};

function reducer(
	state: PortfolioState,
	action: PortfolioStateAction,
): PortfolioState {
	switch (action.type) {
		case 'SET_ACCENT_COLOR':
			return { ...state, accentColor: action.color };
		case 'SET_HIGHLIGHTED_PROJECT':
			return { ...state, highlightedProject: action.projectId };
		case 'SET_HERO_DESCRIPTION':
			return { ...state, heroDescription: action.text };
		case 'SET_FOCUSED_SKILL':
			return { ...state, focusedSkill: action.skillId };
		case 'RESET':
			return initialState;
		default:
			return state;
	}
}

const PortfolioActionsContext = createContext<{
	state: PortfolioState;
	dispatch: React.Dispatch<PortfolioStateAction>;
} | null>(null);

export function PortfolioActionsProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<PortfolioActionsContext.Provider value={{ state, dispatch }}>
			{children}
		</PortfolioActionsContext.Provider>
	);
}

export function usePortfolioActions() {
	const ctx = useContext(PortfolioActionsContext);
	if (!ctx)
		throw new Error(
			'usePortfolioActions must be used inside PortfolioActionsProvider',
		);
	return ctx;
}
