'use client';
import { cn } from '@/lib/utils';
import type React from 'react';

import { motion } from 'framer-motion';

export const BentoGrid = ({
	className,
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				'grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto',
				className,
			)}
		>
			{children}
		</div>
	);
};

export const BentoGridItem = ({
	className,
	title,
	description,
	header,
	icon,
}: {
	className?: string;
	title?: string | React.ReactNode;
	description?: string | React.ReactNode;
	header?: React.ReactNode;
	icon?: React.ReactNode;
}) => {
	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			transition={{ type: 'spring', stiffness: 300 }}
			className={cn(
				'row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input bg-card border border-border p-4 justify-between flex flex-col space-y-4',
				className,
			)}
		>
			{header}
			<div className="group-hover/bento:translate-x-2 transition duration-200">
				{icon}
				<div className="font-sans font-bold text-card-foreground mb-2 mt-2">
					{title}
				</div>
				<div className="font-sans font-normal text-muted-foreground text-xs">
					{description}
				</div>
			</div>
		</motion.div>
	);
};
