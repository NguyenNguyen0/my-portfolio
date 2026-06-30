'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const BG_PELLETS = [
	{ x: 3, y: 12, d: 0.0, dur: 1.6 },
	{ x: 96, y: 8, d: 0.5, dur: 2.0 },
	{ x: 8, y: 35, d: 1.1, dur: 1.4 },
	{ x: 92, y: 30, d: 0.3, dur: 1.8 },
	{ x: 5, y: 58, d: 0.8, dur: 1.5 },
	{ x: 95, y: 55, d: 1.4, dur: 2.2 },
	{ x: 2, y: 78, d: 0.2, dur: 1.7 },
	{ x: 97, y: 75, d: 0.9, dur: 1.3 },
	{ x: 15, y: 5, d: 1.6, dur: 1.9 },
	{ x: 80, y: 4, d: 0.4, dur: 1.6 },
	{ x: 20, y: 92, d: 1.2, dur: 2.1 },
	{ x: 78, y: 94, d: 0.6, dur: 1.4 },
	{ x: 50, y: 3, d: 1.8, dur: 1.8 },
	{ x: 48, y: 96, d: 0.1, dur: 2.0 },
	{ x: 30, y: 48, d: 1.5, dur: 1.5 },
	{ x: 68, y: 52, d: 0.7, dur: 1.7 },
];

const PAC_LANES = [
	{ y: 22, dir: 1, delay: 0, dur: 30 },
	{ y: 55, dir: -1, delay: 10, dur: 35 },
	{ y: 80, dir: 1, delay: 20, dur: 28 },
] as const;

// Blinky / Pinky / Inky
const GHOST_COLORS = [
	'oklch(65% 0.22 20)',
	'oklch(70% 0.18 330)',
	'oklch(65% 0.18 200)',
] as const;

interface GridBackgroundProps {
	children: ReactNode;
	className?: string;
}

export function GridBackground({ children, className }: GridBackgroundProps) {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const auraRef = useRef<HTMLDivElement>(null);
	const pelletRefs = useRef<(HTMLDivElement | null)[]>([]);
	const eatenTimers = useRef<(ReturnType<typeof setTimeout> | null)[]>(
		Array.from({ length: BG_PELLETS.length }, () => null),
	);
	const isDarkRef = useRef(true);

	useEffect(() => {
		setMounted(true);
	}, []);

	const isDark = !mounted || resolvedTheme !== 'light';

	useEffect(() => {
		isDarkRef.current = isDark;
	}, [isDark]);

	useEffect(() => {
		const timers = eatenTimers.current;
		const onMouseMove = (e: MouseEvent) => {
			// Layer 1: cursor aura
			if (auraRef.current) {
				const c = isDarkRef.current
					? 'oklch(87.6% 0.179 95.4 / 0.07)'
					: 'oklch(44.8% 0.249 264.1 / 0.07)';
				auraRef.current.style.background = `radial-gradient(260px circle at ${e.clientX}px ${e.clientY}px, ${c}, transparent 70%)`;
			}

			// Layer 2: dot consumption
			pelletRefs.current.forEach((el, i) => {
				if (!el || eatenTimers.current[i]) return;
				const r = el.getBoundingClientRect();
				if (
					Math.hypot(
						e.clientX - r.left - 2.5,
						e.clientY - r.top - 2.5,
					) < 80
				) {
					el.style.transform = 'scale(0)';
					el.style.opacity = '0';
					eatenTimers.current[i] = setTimeout(() => {
						if (el) {
							el.style.transform = '';
							el.style.opacity = '0.55';
						}
						eatenTimers.current[i] = null;
					}, 3000);
				}
			});
		};

		window.addEventListener('mousemove', onMouseMove, { passive: true });
		return () => {
			window.removeEventListener('mousemove', onMouseMove);
			timers.forEach((t) => {
				if (t) clearTimeout(t);
			});
		};
	}, []);

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
		<>
			<style>{`
				@keyframes pac-walk {
					from { left: -3%; }
					to   { left: 103%; }
				}
				@keyframes pac-walk-reverse {
					from { left: 103%; }
					to   { left: -3%; }
				}
				@keyframes pac-munch {
					0%, 100% { clip-path: polygon(50% 50%, 100% 25%, 100% 0%, 0% 0%, 0% 100%, 100% 100%, 100% 75%); }
					50%       { clip-path: polygon(50% 50%, 100% 50%, 100% 0%, 0% 0%, 0% 100%, 100% 100%, 100% 50%); }
				}
				@keyframes pac-munch-reverse {
					0%, 100% { clip-path: polygon(50% 50%, 0% 25%, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 75%); }
					50%       { clip-path: polygon(50% 50%, 0% 50%, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%); }
				}
				@keyframes ghost-float {
					0%, 100% { transform: translateY(0px); }
					50%       { transform: translateY(-3px); }
				}
			`}</style>

			<div
				className={cn('relative min-h-screen bg-background', className)}
			>
				<div
					className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
					aria-hidden="true"
				>
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

					{/* Neon corner glow */}
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

					{/* Cursor aura — Layer 1 */}
					<div ref={auraRef} className="absolute inset-0" />

					{/* Pac-Man walkers — Layer 3 */}
					{PAC_LANES.map((lane, i) => (
						<div
							key={`lane-${i}`}
							style={{
								position: 'absolute',
								top: `${lane.y}%`,
								width: '16px',
								height: '16px',
								opacity: isDark ? 1 : 0.4,
								animation: `${lane.dir === 1 ? 'pac-walk' : 'pac-walk-reverse'} ${lane.dur}s linear ${lane.delay}s infinite normal backwards`,
							}}
						>
							{/* Pac-Man body */}
							<div
								style={{
									width: '16px',
									height: '16px',
									background: 'oklch(87.6% 0.179 95.4)',
									borderRadius: '50%',
									opacity: 0.35,
									animation: `${lane.dir === 1 ? 'pac-munch' : 'pac-munch-reverse'} 0.25s ease-in-out infinite`,
								}}
							/>
							{/* Ghost trailing behind */}
							<div
								style={{
									position: 'absolute',
									top: '1px',
									left: lane.dir === 1 ? '-24px' : '24px',
									width: '14px',
									height: '14px',
									background: GHOST_COLORS[i],
									borderRadius: '50% 50% 20% 20%',
									opacity: 0.22,
									animation:
										'ghost-float 1.1s ease-in-out infinite',
									animationDelay: `${i * 0.3}s`,
								}}
							/>
						</div>
					))}

					{/* Scattered pellets — Layer 2 (dot consumption) */}
					{BG_PELLETS.map((p, i) => (
						<div
							key={i}
							ref={(el) => {
								pelletRefs.current[i] = el;
							}}
							className="absolute rounded-full bg-primary animate-pixel-blink"
							style={{
								left: `${p.x}%`,
								top: `${p.y}%`,
								width: '5px',
								height: '5px',
								opacity: 0.55,
								animationDelay: `${p.d}s`,
								animationDuration: `${p.dur}s`,
								transition:
									'transform 0.25s ease, opacity 0.25s ease, background-color 0.3s ease',
							}}
						/>
					))}
				</div>

				{/* Content */}
				<div className="relative z-10">{children}</div>
			</div>
		</>
	);
}
