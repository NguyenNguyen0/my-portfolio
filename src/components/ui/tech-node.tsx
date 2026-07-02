'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import type { TechIconEntry } from '@/data/tech-icon-map';
import { cn } from '@/lib/utils';

interface TechNodeProps extends TechIconEntry {
	label: string;
	className?: string;
}

// Shared logo renderer for the tech marquee, skill constellation, and stack
// inventory: picks the theme-appropriate icon variant, falls back to an
// inverted single-variant SVG, then to a text abbreviation.
export function TechNode({
	label,
	lightSrc,
	darkSrc,
	invert,
	className,
}: TechNodeProps) {
	const { resolvedTheme } = useTheme();
	const src = resolvedTheme === 'light' ? lightSrc : (darkSrc ?? lightSrc);

	if (src) {
		return (
			<Image
				src={src}
				alt={label}
				width={24}
				height={24}
				className={cn(
					'object-contain w-full h-full',
					invert && 'dark:invert',
					className,
				)}
			/>
		);
	}

	return (
		<span
			className="font-pixel text-[6px] leading-tight text-center"
			aria-label={label}
		>
			{label.slice(0, 3).toUpperCase()}
		</span>
	);
}
