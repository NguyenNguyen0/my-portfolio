'use client';
import { cn } from '@/lib/utils';
import type React from 'react';

import { motion } from 'framer-motion';
import { useState } from 'react';

export const SpotlightCard = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isHovering, setIsHovering] = useState(false);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		setMousePosition({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		});
	};

	return (
		<motion.div
			className={cn(
				'relative overflow-hidden rounded-xl bg-card border border-border p-6',
				className,
			)}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			whileHover={{ scale: 1.02 }}
			transition={{ type: 'spring', stiffness: 300 }}
		>
			{isHovering && (
				<div
					className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
					style={{
						background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--primary), 0.1), transparent 40%)`,
					}}
				/>
			)}
			{children}
		</motion.div>
	);
};
