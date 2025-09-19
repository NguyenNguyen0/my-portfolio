'use client';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

export const TextReveal = ({
	text,
	className,
}: {
	text: string;
	className?: string;
}) => {
	const words = text.split(' ');

	const container = {
		hidden: { opacity: 0 },
		visible: (i = 1) => ({
			opacity: 1,
			transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
		}),
	};

	const child = {
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				type: 'spring',
				damping: 12,
				stiffness: 100,
			},
		},
		hidden: {
			opacity: 0,
			x: 20,
			transition: {
				type: 'spring',
				damping: 12,
				stiffness: 100,
			},
		},
	};

	return (
		<motion.div
			style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}
			variants={container}
			initial="hidden"
			animate="visible"
			className={cn('', className)}
		>
			{words.map((word, index) => (
				<motion.span
					variants={child as Variants}
					style={{ marginRight: '5px' }}
					key={index}
				>
					{word}
				</motion.span>
			))}
		</motion.div>
	);
};
