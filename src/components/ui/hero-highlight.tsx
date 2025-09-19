'use client';
import { cn } from '@/lib/utils';
import type React from 'react';

import { motion } from 'framer-motion';

export const HeroHighlight = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={cn(
				'relative h-[40rem] w-full flex items-center justify-center',
				className,
			)}
		>
			<div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
			<div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]" />
			<div className="relative z-20">{children}</div>
		</div>
	);
};

export const Highlight = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<motion.span
			initial={{
				backgroundSize: '0% 100%',
			}}
			animate={{
				backgroundSize: '100% 100%',
			}}
			transition={{
				duration: 2,
				ease: 'linear',
				delay: 0.5,
			}}
			style={{
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'left center',
				display: 'inline',
			}}
			className={cn(
				'relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20',
				className,
			)}
		>
			{children}
		</motion.span>
	);
};
