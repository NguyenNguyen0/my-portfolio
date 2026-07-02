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
	'.XXXXXXXX.',
	'.X.X..X.X.',
];

// Renders a frame as a single element via the box-shadow pixel-art trick
// (one shadow entry per lit pixel) instead of one <span> per cell. With 4
// mascot instances x 2-3 stacked frame layers running continuous CSS
// animations, a ~60-node-per-frame grid measurably raised Style/Layout and
// Rendering cost in a Lighthouse trace; this drops it to 1 DOM node per
// frame layer.
interface Sprite {
	shadow: string;
	width: number;
	height: number;
}

function compileFrame(frame: Frame): Sprite {
	const shadows: string[] = [];
	frame.forEach((row, y) => {
		[...row].forEach((ch, x) => {
			if (ch === '.') return;
			shadows.push(
				`${x * CELL}px ${y * CELL}px 0 0 ${ch === 'E' ? CLAWD_EYE : CLAWD_ORANGE}`,
			);
		});
	});
	return {
		shadow: shadows.join(', '),
		width: frame[0].length * CELL,
		height: frame.length * CELL,
	};
}

const SPRITE_A = compileFrame(FRAME_A);
const SPRITE_B = compileFrame(FRAME_B);
const SPRITE_WINK = compileFrame(WINK_FRAME);

function PixelFrame({
	sprite,
	className,
}: {
	sprite: Sprite;
	className?: string;
}) {
	// Every box-shadow copy inherits the *element's own* size — so the
	// shadow-bearing element must be a single CELL square (the "seed"
	// pixel), not the full sprite box. A separate, normally-sized wrapper
	// carries the className/layout so the frame still occupies the right
	// footprint in the flex row / absolute-inset overlay.
	return (
		<span
			className={className}
			style={{
				display: 'block',
				position: 'relative',
				width: sprite.width,
				height: sprite.height,
			}}
		>
			<span
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: CELL,
					height: CELL,
					boxShadow: sprite.shadow,
				}}
			/>
		</span>
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
				'clawd group relative inline-flex bg-transparent border-0 p-0 cursor-pointer select-none [contain:layout_paint]',
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
				className={cn('relative block', pokeCount > 0 && 'clawd-poke')}
				onAnimationEnd={() => setWinking(false)}
			>
				{winking ? (
					<PixelFrame sprite={SPRITE_WINK} />
				) : (
					<>
						<PixelFrame
							sprite={SPRITE_A}
							className="clawd-frame-a group-hover:[animation-duration:0.25s]"
						/>
						<PixelFrame
							sprite={SPRITE_B}
							className="clawd-frame-b absolute inset-0 group-hover:[animation-duration:0.25s]"
						/>
					</>
				)}
			</span>
		</button>
	);
}
