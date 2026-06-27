'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

// Scattered background pellets — fixed positions (viewport %)
// Skew toward edges so they don't crowd center content
const BG_PELLETS = [
	{ x: 3,  y: 12, d: 0.0, dur: 1.6 },
	{ x: 96, y: 8,  d: 0.5, dur: 2.0 },
	{ x: 8,  y: 35, d: 1.1, dur: 1.4 },
	{ x: 92, y: 30, d: 0.3, dur: 1.8 },
	{ x: 5,  y: 58, d: 0.8, dur: 1.5 },
	{ x: 95, y: 55, d: 1.4, dur: 2.2 },
	{ x: 2,  y: 78, d: 0.2, dur: 1.7 },
	{ x: 97, y: 75, d: 0.9, dur: 1.3 },
	{ x: 15, y: 5,  d: 1.6, dur: 1.9 },
	{ x: 80, y: 4,  d: 0.4, dur: 1.6 },
	{ x: 20, y: 92, d: 1.2, dur: 2.1 },
	{ x: 78, y: 94, d: 0.6, dur: 1.4 },
	{ x: 50, y: 3,  d: 1.8, dur: 1.8 },
	{ x: 48, y: 96, d: 0.1, dur: 2.0 },
	{ x: 30, y: 48, d: 1.5, dur: 1.5 },
	{ x: 68, y: 52, d: 0.7, dur: 1.7 },
];

interface GridBackgroundProps {
	children: ReactNode;
	className?: string;
}

export function GridBackground({ children, className }: GridBackgroundProps) {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => { setMounted(true); }, []);

	// Before mount, default to dark (matches defaultTheme)
	const isDark = !mounted || resolvedTheme !== 'light';

	const DARK_GRID = `
		linear-gradient(oklch(87.6% 0.179 95.4 / 0.065) 1px, transparent 1px),
		linear-gradient(90deg, oklch(87.6% 0.179 95.4 / 0.065) 1px, transparent 1px)
	`;
	const LIGHT_GRID = `
		linear-gradient(oklch(44.8% 0.249 264.1 / 0.09) 1px, transparent 1px),
		linear-gradient(90deg, oklch(44.8% 0.249 264.1 / 0.09) 1px, transparent 1px)
	`;
	const SCANLINES = `
		repeating-linear-gradient(
			0deg,
			transparent 0px,
			transparent 2px,
			oklch(0% 0 0 / 0.07) 2px,
			oklch(0% 0 0 / 0.07) 3px
		)
	`;

	return (
		<div className={cn('relative min-h-screen bg-background', className)}>
			{/* ── Fixed background layers (pointer-events: none so they never block clicks) ── */}
			<div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">

				{/* Dark maze grid */}
				<div
					className="absolute inset-0 transition-opacity duration-500"
					style={{
						opacity: isDark ? 1 : 0,
						backgroundImage: DARK_GRID,
						backgroundSize: '32px 32px',
						animation: 'grid-glow 6s ease-in-out infinite',
					}}
				/>

				{/* Light maze grid */}
				<div
					className="absolute inset-0 transition-opacity duration-500"
					style={{
						opacity: isDark ? 0 : 1,
						backgroundImage: LIGHT_GRID,
						backgroundSize: '32px 32px',
					}}
				/>

				{/* CRT scanlines — dark mode only */}
				<div
					className="absolute inset-0 transition-opacity duration-500"
					style={{
						opacity: isDark ? 1 : 0,
						backgroundImage: SCANLINES,
					}}
				/>

				{/* Neon corner glow — dark mode only */}
				<div
					className="absolute inset-0 transition-opacity duration-500"
					style={{
						opacity: isDark ? 0.35 : 0,
						background: `
							radial-gradient(ellipse 60% 40% at 0% 0%, oklch(87.6% 0.179 95.4 / 0.08) 0%, transparent 70%),
							radial-gradient(ellipse 60% 40% at 100% 100%, oklch(44.8% 0.249 264.1 / 0.08) 0%, transparent 70%)
						`,
					}}
				/>

				{/* Scattered pellets — blink independently */}
				{BG_PELLETS.map((p, i) => (
					<div
						key={i}
						className="absolute rounded-full bg-primary animate-pixel-blink"
						style={{
							left: `${p.x}%`,
							top: `${p.y}%`,
							width: '5px',
							height: '5px',
							opacity: 0.55,
							animationDelay: `${p.d}s`,
							animationDuration: `${p.dur}s`,
							transition: 'background-color 0.3s ease',
						}}
					/>
				))}
			</div>

			{/* Content — sits above background layers */}
			<div className="relative z-10">{children}</div>
		</div>
	);
}
