'use client';

import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Anthropic's Clawd mascot color — fixed brand color, not a theme token
// (same reasoning as hardcoded brand hexes elsewhere, e.g. the tech badge
// palette in projects-section.tsx).
const CLAWD_ORANGE = '#D97757';
const CLAWD_EYE = '#171310';
const CELL = 6; // px per pixel

// Two hand-drawn frames (legs alternate) for a real sprite-style scuttle —
// not a transform tween. 'X' = body/arm pixel, 'E' = eye pixel, '.' = empty.
// Eyes sit embedded in the body row (orange neighbors on every side) rather
// than floating in an empty row above it — a dark eye pixel surrounded by
// '.' (transparent, showing the page background through) is invisible
// against a dark theme. Arms are just row 2 running the full grid width,
// wider than the body rows above/below it, so they poke out past the
// silhouette.
type Frame = string[];

const FRAME_A: Frame = [
	'.XXXXXXXX.',
	'.XEXXXXEX.',
	'.XEXXXXEX.',
	'XXXXXXXXXX',
	'.XXXXXXXX.',
	'.X.X..X.X.',
];

const FRAME_B: Frame = [
	'.XXXXXXXX.',
	'.XEXXXXEX.',
	'.XEXXXXEX.',
	'XXXXXXXXXX',
	'.XXXXXXXX.',
	'..X.XX.X..',
];

const WINK_FRAME: Frame = [
	'.XXXXXXXX.',
	'.XXXXXXEX.',
	'.XXXXXXEX.',
	'XXXXXXXXXX',
	'.XXXXXXXX.',
	'.X.X..X.X.',
];

function PixelFrame({
	frame,
	className,
}: {
	frame: Frame;
	className?: string;
}) {
	const cols = frame[0].length;
	const rows = frame.length;
	return (
		<div
			className={className}
			style={{
				display: 'grid',
				gridTemplateColumns: `repeat(${cols}, ${CELL}px)`,
				gridTemplateRows: `repeat(${rows}, ${CELL}px)`,
			}}
		>
			{frame.flatMap((row, y) =>
				[...row].map((ch, x) => (
					<span
						key={`${y}-${x}`}
						style={{
							width: CELL,
							height: CELL,
							background:
								ch === 'X'
									? CLAWD_ORANGE
									: ch === 'E'
										? CLAWD_EYE
										: 'transparent',
						}}
					/>
				)),
			)}
		</div>
	);
}

const QUIPS = [
	"hi, I'm Clawd",
	'built with Claude Code',
	'*scuttle*',
	'ship it 🚀',
	'vibes: immaculate',
	'reviewing your PR...',
	'lgtm 🦀',
];

// Scattered easter-egg mascot — pixel-matrix crab, real sprite frames (no
// image asset, no new dependency). Idle: two leg frames swap via a CSS hard
// keyframe cut, a genuine scuttle rather than an interpolated transform.
// Hover: scuttle speeds up. Click: punch bounce + a one-off wink frame +
// a cycling speech-bubble quip. Bails out entirely under
// prefers-reduced-motion.
export function ClawdMascot({ className }: { className?: string }) {
	const shouldReduce = useReducedMotion();
	const [pokeCount, setPokeCount] = useState(0);
	const [winking, setWinking] = useState(false);

	if (shouldReduce) return null;

	return (
		<button
			type="button"
			onClick={() => {
				setPokeCount((c) => c + 1);
				setWinking(true);
			}}
			aria-label="Clawd the crab — click to poke"
			className={cn(
				'clawd group relative inline-flex bg-transparent border-0 p-0 cursor-pointer select-none',
				className,
			)}
		>
			{pokeCount > 0 && (
				<span
					key={`quip-${pokeCount}`}
					className="clawd-quip absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-pixel text-[6px] bg-popover border border-border px-1.5 py-1 text-foreground pointer-events-none z-20"
				>
					{QUIPS[(pokeCount - 1) % QUIPS.length]}
				</span>
			)}

			<span
				key={`frame-${pokeCount}`}
				className={cn('relative block', pokeCount > 0 && 'clawd-poke')}
				onAnimationEnd={() => setWinking(false)}
			>
				{winking ? (
					<PixelFrame frame={WINK_FRAME} />
				) : (
					<>
						<PixelFrame
							frame={FRAME_A}
							className="clawd-frame-a group-hover:[animation-duration:0.25s]"
						/>
						<PixelFrame
							frame={FRAME_B}
							className="clawd-frame-b absolute inset-0 group-hover:[animation-duration:0.25s]"
						/>
					</>
				)}
			</span>
		</button>
	);
}
