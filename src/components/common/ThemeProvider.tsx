'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ComponentProps, useEffect } from 'react';

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	useEffect(() => {
		// Remove preload class after initial load to enable transitions
		const timer = setTimeout(() => {
			document.body.classList.remove('preload');
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
