'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div className='flex items-center space-x-2'>
			<span className='text-sm font-medium'>Theme:</span>
			<select
				value={theme}
				onChange={e => setTheme(e.target.value)}
				className='rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white'
			>
				<option value='light'>Light</option>
				<option value='dark'>Dark</option>
				<option value='system'>System</option>
			</select>
		</div>
	);
}
