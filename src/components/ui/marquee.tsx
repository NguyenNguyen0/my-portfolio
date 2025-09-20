'use client';
import { cn } from '@/lib/utils';
import type React from 'react';
import { useState, useRef } from 'react';

export const Marquee = ({
	className,
	reverse,
	pauseOnHover = false,
	children,
	vertical = false,
	repeat = 4,
	speed = 'normal', // 'slow', 'normal', 'fast'
	...props
}: {
	className?: string;
	reverse?: boolean;
	pauseOnHover?: boolean;
	children?: React.ReactNode;
	vertical?: boolean;
	repeat?: number;
	speed?: 'slow' | 'normal' | 'fast';
	[key: string]: unknown;
}) => {
	const [isPaused, setIsPaused] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	// Map speed names to duration values
	const speedMap = {
		slow: '60s',
		normal: '40s',
		fast: '20s',
	};

	const duration = speedMap[speed] || '40s';

	return (
		<div
			{...props}
			ref={containerRef}
			className={cn(
				'group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)]',
				`[--duration:${duration}]`,
				{
					'flex-row': !vertical,
					'flex-col': vertical,
				},
				className,
			)}
			onMouseEnter={() => pauseOnHover && setIsPaused(true)}
			onMouseLeave={() => pauseOnHover && setIsPaused(false)}
		>
			{Array(repeat)
				.fill(0)
				.map((_, i) => (
					<div
						key={i}
						className={cn(
							'flex shrink-0 justify-around [gap:var(--gap)]',
							{
								'animate-marquee flex-row': !vertical,
								'animate-marquee-vertical flex-col': vertical,
								'[animation-direction:reverse]': reverse,
							},
						)}
						style={{
							animationPlayState: isPaused ? 'paused' : 'running',
						}}
					>
						{children}
					</div>
				))}
		</div>
	);
};
