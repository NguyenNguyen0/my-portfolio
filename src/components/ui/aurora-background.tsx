'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface AuroraBackgroundProps {
	children: ReactNode;
	className?: string;
}

export function AuroraBackground({
	children,
	className = '',
}: AuroraBackgroundProps) {
	return (
		<div className={`relative overflow-hidden ${className}`}>
			{/* Aurora Effect */}
			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-30 blur-3xl"
					style={{
						background:
							'linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4)',
					}}
					animate={{
						x: [0, 100, 0],
						y: [0, -100, 0],
						scale: [1, 1.2, 1],
					}}
					transition={{
						duration: 20,
						repeat: Number.POSITIVE_INFINITY,
						ease: 'linear',
					}}
				/>
				<motion.div
					className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl"
					style={{
						background:
							'linear-gradient(45deg, #f59e0b, #ef4444, #8b5cf6)',
					}}
					animate={{
						x: [0, -100, 0],
						y: [0, 100, 0],
						scale: [1, 1.3, 1],
					}}
					transition={{
						duration: 25,
						repeat: Number.POSITIVE_INFINITY,
						ease: 'linear',
					}}
				/>
				<motion.div
					className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl"
					style={{
						background:
							'linear-gradient(45deg, #06b6d4, #3b82f6, #f59e0b)',
					}}
					animate={{
						x: [-200, 200, -200],
						y: [-100, 100, -100],
						scale: [1, 1.1, 1],
					}}
					transition={{
						duration: 30,
						repeat: Number.POSITIVE_INFINITY,
						ease: 'linear',
					}}
				/>
			</div>

			{/* Grid Pattern */}
			<div
				className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
				style={{
					backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
					backgroundSize: '50px 50px',
				}}
			/>

			{/* Content */}
			<div className="relative z-10">{children}</div>
		</div>
	);
}
