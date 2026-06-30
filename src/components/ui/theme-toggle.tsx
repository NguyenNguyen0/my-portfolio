'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <div className="w-9 h-9" aria-hidden="true" />;
	}

	const isDark = theme === 'dark';

	return (
		<button
			onClick={() => setTheme(isDark ? 'light' : 'dark')}
			className="relative w-9 h-9 border border-dotted border-border flex items-center justify-center text-muted-foreground transition-colors duration-150 hover:border-solid hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-dotted focus-visible:outline-ring"
			aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
		>
			<AnimatePresence mode="wait" initial={false}>
				<motion.span
					key={isDark ? 'moon' : 'sun'}
					initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
					animate={{ opacity: 1, rotate: 0, scale: 1 }}
					exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
					transition={{ duration: 0.2, ease: 'easeOut' }}
					className="absolute font-pixel text-[12px] leading-none select-none"
					aria-hidden="true"
				>
					{isDark ? '☾' : '☀'}
				</motion.span>
			</AnimatePresence>
		</button>
	);
}
