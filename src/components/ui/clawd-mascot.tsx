'use client';

import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

const QUIPS = [
	"hi, I'm Clawd",
	'built with Claude Code',
	'*pinch*',
	'ship it 🚀',
	'vibes: immaculate',
	'reviewing your PR...',
	'lgtm 🦀',
];

// Scattered easter-egg mascot — pure div/CSS crab (same technique as
// PacManRunner), no image asset, no new JS dependency. Idle bob is
// continuous; hover pinches the claws; click plays a punch animation and
// cycles a speech-bubble quip. Fully decorative, so it just disappears for
// prefers-reduced-motion rather than rendering static.
export function ClawdMascot({ className }: { className?: string }) {
	const shouldReduce = useReducedMotion();
	const [pokeCount, setPokeCount] = useState(0);

	if (shouldReduce) return null;

	return (
		<button
			type="button"
			onClick={() => setPokeCount((c) => c + 1)}
			aria-label="Clawd the crab — click to poke"
			className={cn(
				'clawd clawd-idle relative inline-flex bg-transparent border-0 p-0 cursor-pointer select-none',
				className,
			)}
		>
			{pokeCount > 0 && (
				<span
					key={pokeCount}
					className="clawd-quip absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-pixel text-[6px] bg-popover border border-border px-1.5 py-1 text-foreground pointer-events-none z-20"
				>
					{QUIPS[(pokeCount - 1) % QUIPS.length]}
				</span>
			)}

			<span
				key={pokeCount}
				className={cn(
					'flex flex-col items-center gap-0.5',
					pokeCount > 0 && 'clawd-poke',
				)}
			>
				{/* Eyes */}
				<span className="flex gap-2">
					<span className="w-1.5 h-1.5 rounded-full bg-foreground" />
					<span className="w-1.5 h-1.5 rounded-full bg-foreground" />
				</span>
				{/* Claws + body */}
				<span className="flex items-center">
					<span className="clawd-claw w-3 h-3 rounded-full bg-primary" />
					<span className="w-6 h-4 rounded-[50%] bg-primary -mx-0.5" />
					<span className="clawd-claw w-3 h-3 rounded-full bg-primary" />
				</span>
				{/* Legs */}
				<span className="flex gap-3">
					<span className="w-2 h-[2px] bg-primary rotate-[25deg] origin-right" />
					<span className="w-2 h-[2px] bg-primary -rotate-[25deg] origin-left" />
				</span>
			</span>
		</button>
	);
}
