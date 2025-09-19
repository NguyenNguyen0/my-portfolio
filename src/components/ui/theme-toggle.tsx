'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
	const [theme, setTheme] = useState<'light' | 'dark'>('dark');

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme') as
			| 'light'
			| 'dark'
			| null;
		const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
			.matches
			? 'dark'
			: 'light';
		const initialTheme = savedTheme || systemTheme;

		setTheme(initialTheme);
		document.documentElement.classList.toggle(
			'dark',
			initialTheme === 'dark',
		);
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
		document.documentElement.classList.toggle('dark', newTheme === 'dark');
	};

	return (
		<motion.button
			onClick={toggleTheme}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			className="relative p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
		>
			<motion.div
				initial={false}
				animate={{ rotate: theme === 'dark' ? 180 : 0 }}
				transition={{ duration: 0.3 }}
			>
				{theme === 'light' ? (
					<Sun size={18} className="text-yellow-500" />
				) : (
					<Moon size={18} className="text-blue-400" />
				)}
			</motion.div>
		</motion.button>
	);
}
