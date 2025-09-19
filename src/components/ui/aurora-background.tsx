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
				{/* Primary aurora blob - top right */}
				<motion.div
					className="absolute -top-20 right-0 w-[50vw] h-[50vw] rounded-full opacity-40 blur-[100px]"
					style={{
						background:
							'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)',
					}}
					animate={{
						x: [0, 100, 0],
						y: [0, -100, 0],
						scale: [1, 1.2, 1],
						opacity: [0.4, 0.6, 0.4],
					}}
					transition={{
						duration: 20,
						repeat: Number.POSITIVE_INFINITY,
						ease: 'easeInOut',
					}}
				/>

				{/* Warm aurora blob - bottom left */}
				<motion.div
					className="absolute -bottom-20 left-0 w-[50vw] h-[50vw] rounded-full opacity-40 blur-[100px]"
					style={{
						background:
							'linear-gradient(135deg, #f59e0b, #ef4444, #8b5cf6)',
					}}
					animate={{
						x: [0, -100, 0],
						y: [0, 100, 0],
						scale: [1, 1.3, 1],
						opacity: [0.4, 0.5, 0.4],
					}}
					transition={{
						duration: 25,
						repeat: Number.POSITIVE_INFINITY,
						ease: 'easeInOut',
					}}
				/>

				{/* Center aurora blob */}
				<motion.div
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full opacity-30 blur-[120px]"
					style={{
						background:
							'linear-gradient(135deg, #06b6d4, #3b82f6, #f59e0b)',
					}}
					animate={{
						scale: [1, 1.1, 1],
						opacity: [0.3, 0.4, 0.3],
						rotate: [0, 10, 0, -10, 0],
					}}
					transition={{
						duration: 30,
						repeat: Number.POSITIVE_INFINITY,
						ease: 'easeInOut',
					}}
				/>

				{/* Top left blob */}
				<motion.div
					className="absolute -top-20 -left-20 w-[40vw] h-[40vw] rounded-full opacity-30 blur-[90px]"
					style={{
						background:
							'linear-gradient(135deg, #8b5cf6, #ec4899, #f43f5e)',
					}}
					animate={{
						x: [0, 80, 0],
						y: [0, 40, 0],
						scale: [1, 1.15, 1],
						opacity: [0.3, 0.4, 0.3],
						rotate: [0, -5, 0, 5, 0],
					}}
					transition={{
						duration: 18,
						repeat: Number.POSITIVE_INFINITY,
						ease: 'easeInOut',
					}}
				/>

				{/* Bottom right blob */}
				<motion.div
					className="absolute -bottom-20 -right-20 w-[40vw] h-[40vw] rounded-full opacity-30 blur-[90px]"
					style={{
						background:
							'linear-gradient(135deg, #06b6d4, #0ea5e9, #14b8a6)',
					}}
					animate={{
						x: [0, -80, 0],
						y: [0, -40, 0],
						scale: [1, 1.15, 1],
						opacity: [0.3, 0.4, 0.3],
						rotate: [0, 5, 0, -5, 0],
					}}
					transition={{
						duration: 22,
						repeat: Number.POSITIVE_INFINITY,
						ease: 'easeInOut',
					}}
				/>

				{/* Extra small moving blobs for sparkle */}
				<motion.div
					className="absolute top-1/3 left-1/4 w-[15vw] h-[15vw] rounded-full opacity-60 blur-[50px]"
					style={{
						background: 'linear-gradient(135deg, #a855f7, #ec4899)',
					}}
					animate={{
						x: [-50, 50, -50],
						y: [-30, 30, -30],
						scale: [1, 1.3, 1],
						opacity: [1, 1.5, 1],
					}}
					transition={{
						duration: 15,
						repeat: Number.POSITIVE_INFINITY,
						ease: 'easeInOut',
					}}
				/>

				<motion.div
					className="absolute top-2/3 right-1/4 w-[15vw] h-[15vw] rounded-full opacity-20 blur-[50px]"
					style={{
						background: 'linear-gradient(135deg, #2dd4bf, #0ea5e9)',
					}}
					animate={{
						x: [50, -50, 50],
						y: [30, -30, 30],
						scale: [1, 1.2, 1],
						opacity: [1, 1.5, 1],
					}}
					transition={{
						duration: 12,
						repeat: Number.POSITIVE_INFINITY,
						ease: 'easeInOut',
					}}
				/>
			</div>

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
