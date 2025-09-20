'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
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
				animate={{ rotate: 180 }}
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
