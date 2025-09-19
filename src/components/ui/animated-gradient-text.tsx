'use client';
import { cn } from '@/lib/utils';
import type React from 'react';

import { motion } from 'framer-motion';

export const AnimatedGradientText = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
			className={cn(
				'bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent',
				className,
			)}
		>
			{children}
		</motion.div>
	);
};
