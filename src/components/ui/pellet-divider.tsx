'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface PelletDividerProps {
	className?: string;
	count?: number;
}

export function PelletDivider({
	className = '',
	count = 32,
}: PelletDividerProps) {
	const shouldReduce = useReducedMotion();

	return (
		<div
			className={`flex items-center justify-center gap-3 py-6 overflow-hidden ${className}`}
			aria-hidden="true"
		>
			{Array.from({ length: count }).map((_, i) => (
				<motion.span
					key={i}
					className="block w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
					initial={{
						opacity: shouldReduce ? 1 : 0,
						scale: shouldReduce ? 1 : 0,
					}}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true, margin: '-20px' }}
					transition={{
						type: 'spring',
						stiffness: 400,
						damping: 15,
						delay: shouldReduce ? 0 : i * 0.018,
					}}
				/>
			))}
		</div>
	);
}
