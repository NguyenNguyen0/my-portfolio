'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GridBackgroundProps {
	children: ReactNode;
	className?: string;
}

export function GridBackground({
	children,
	className = '',
}: GridBackgroundProps) {
	return (
		<div className={`relative overflow-hidden ${className}`}>
			{/* Grid Pattern */}
			<motion.div
				className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
				style={{
					backgroundImage: `
						linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
						linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
					`,
					backgroundSize: '40px 40px',
				}}
				animate={{
					opacity: [0.1, 0.2, 0.1],
				}}
				transition={{
					duration: 10,
					repeat: Number.POSITIVE_INFINITY,
					ease: 'easeInOut',
				}}
			/>

			{/* Subtle glow overlay */}
			<div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-30 mix-blend-overlay" />

			{/* Content */}
			<div className="relative z-10">{children}</div>
		</div>
	);
}
