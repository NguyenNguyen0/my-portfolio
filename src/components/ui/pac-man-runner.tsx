'use client';

import { useReducedMotion } from 'framer-motion';

// 12 pellets, Pac-Man runs for 4.5s across 110% width
// Pac-Man reaches pellet at x% at time: (x + 5) / 110 * 4.5 seconds
// Converted to keyframe %: eat-at = (x + 5) / 110 * 86  (86% = when pac-man exits)
const PELLET_COUNT = 12;

function eatAtPercent(index: number, total: number): number {
	const x = 4 + index * (92 / (total - 1)); // pellet x position (%)
	return Math.round(((x + 5) / 110) * 86); // % into animation when pac reaches it
}

export function PacManRunner() {
	const shouldReduce = useReducedMotion();
	if (shouldReduce) return null;

	return (
		<div
			className="relative h-8 w-full max-w-xs sm:max-w-lg md:max-w-2xl mx-auto overflow-hidden select-none"
			aria-hidden="true"
		>
			{/* Track line */}
			<div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 bg-border opacity-40" />

			{/* Pellets */}
			{Array.from({ length: PELLET_COUNT }, (_, i) => {
				const x = 4 + i * (92 / (PELLET_COUNT - 1));
				const eatAt = eatAtPercent(i, PELLET_COUNT);

				return (
					<div
						key={i}
						className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
						style={{
							left: `${x}%`,
							// CSS custom property drives the keyframe %
							['--eat-at' as string]: `${eatAt}%`,
							animation: 'pellet-eaten 4.5s linear infinite',
						}}
					/>
				);
			})}

			{/* Pac-Man character */}
			<div
				className="absolute top-1/2 -translate-y-1/2"
				style={{ animation: 'pac-run 4.5s linear infinite' }}
			>
				<div className="relative w-6 h-6 flex flex-col overflow-visible">
					{/* Top half */}
					<div
						className="w-6 h-3 rounded-t-full bg-primary flex-shrink-0"
						style={{
							transformOrigin: 'center 100%',
							animation: 'munch-top 0.22s linear infinite',
						}}
					/>
					{/* Bottom half */}
					<div
						className="w-6 h-3 rounded-b-full bg-primary flex-shrink-0"
						style={{
							transformOrigin: 'center 0%',
							animation: 'munch-bottom 0.22s linear infinite',
						}}
					/>
				</div>
			</div>
		</div>
	);
}
