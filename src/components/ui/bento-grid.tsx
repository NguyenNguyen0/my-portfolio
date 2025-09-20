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
				'grid md:auto-rows-[28rem] grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto',
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
				'row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input bg-card border border-border p-5 flex flex-col',
				className,
			)}
		>
			{header}
			<div className="group-hover/bento:translate-x-2 transition duration-200 mt-4 flex-grow flex flex-col justify-between">
				<div>
					<div className="font-sans font-bold text-card-foreground mb-3 text-lg">
						{title}
					</div>
					<div className="font-sans font-normal text-muted-foreground text-sm">
						{description}
					</div>
				</div>
				<div className="mt-auto pt-4">{icon}</div>
			</div>
		</motion.div>
	);
};
