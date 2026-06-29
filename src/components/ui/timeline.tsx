'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { StoryEntry } from '@/data/story';

interface TimelineProps {
	items: StoryEntry[];
}

const fadeUp: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const slideLeft: Variants = {
	hidden: { opacity: 0, x: -24 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const slideRight: Variants = {
	hidden: { opacity: 0, x: 24 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const nodeVariant: Variants = {
	hidden: { scale: 0, opacity: 0 },
	visible: {
		scale: 1,
		opacity: 1,
		transition: { type: 'spring', stiffness: 400, damping: 15 },
	},
};

export function Timeline({ items }: TimelineProps) {
	const shouldReduce = useReducedMotion();

	return (
		<div className="relative mx-auto max-w-4xl px-4">
			{/* Vertical dotted line — hidden on mobile, shown from md */}
			<div
				className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-px"
				style={{ borderLeft: '2px dotted var(--border)' }}
				aria-hidden="true"
			/>

			{/* Mobile vertical line */}
			<div
				className="md:hidden absolute left-6 top-0 bottom-0 w-px"
				style={{ borderLeft: '2px dotted var(--border)' }}
				aria-hidden="true"
			/>

			<div className="space-y-12 md:space-y-16">
				{items.map((item, index) => {
					const isEven = index % 2 === 0;
					const cardVariant = shouldReduce
						? fadeUp
						: isEven
						? slideLeft
						: slideRight;

					return (
						<div key={item.year} className="relative flex items-start">
							{/* ─── Desktop layout ─── */}
							<div className="hidden md:flex w-full items-start gap-0">
								{/* Left content (even items) */}
								<div className="w-[calc(50%-32px)] flex justify-end">
									{isEven && (
										<motion.div
											variants={cardVariant}
											initial="hidden"
											whileInView="visible"
											viewport={{ once: true, margin: '-60px' }}
											className="w-full max-w-sm"
										>
											<TimelineCard item={item} />
										</motion.div>
									)}
								</div>

								{/* Center node */}
								<div className="w-16 flex justify-center flex-shrink-0 pt-6">
									<motion.div
										variants={nodeVariant}
										initial="hidden"
										whileInView="visible"
										viewport={{ once: true, margin: '-60px' }}
										transition={{ delay: index * 0.1 }}
										className="relative flex items-center justify-center w-4 h-4 animate-node-pulse"
									>
										<div className="w-4 h-4 rounded-full border-2 border-primary bg-background" />
										<div className="absolute w-2 h-2 rounded-full bg-primary" />
									</motion.div>
								</div>

								{/* Right content (odd items) */}
								<div className="w-[calc(50%-32px)] flex justify-start">
									{!isEven && (
										<motion.div
											variants={cardVariant}
											initial="hidden"
											whileInView="visible"
											viewport={{ once: true, margin: '-60px' }}
											className="w-full max-w-sm"
										>
											<TimelineCard item={item} />
										</motion.div>
									)}
								</div>
							</div>

							{/* ─── Mobile layout ─── */}
							<div className="md:hidden flex w-full gap-6 items-start">
								{/* Node */}
								<div className="flex-shrink-0 relative flex items-center justify-center w-4 h-4 mt-6 z-10">
									<motion.div
										variants={nodeVariant}
										initial="hidden"
										whileInView="visible"
										viewport={{ once: true }}
										className="relative flex items-center justify-center w-4 h-4 animate-node-pulse"
									>
										<div className="w-4 h-4 rounded-full border-2 border-primary bg-background" />
										<div className="absolute w-2 h-2 rounded-full bg-primary" />
									</motion.div>
								</div>

								{/* Content */}
								<motion.div
									variants={shouldReduce ? fadeUp : slideLeft}
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true }}
									className="flex-1 min-w-0"
								>
									<TimelineCard item={item} />
								</motion.div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

function TimelineCard({ item }: { item: StoryEntry }) {
	return (
		<div className="pixel-card p-6 group">
			<p
				className="font-pixel text-[10px] text-primary mb-2 leading-relaxed"
				aria-label={`Year: ${item.year}`}
			>
				{item.year}
			</p>
			<p className="font-pixel text-[11px] text-foreground mb-3 leading-relaxed">
				{item.label}
			</p>
			<h3 className="font-pixel text-[10px] text-muted-foreground mb-3 leading-relaxed">
				{item.title}
			</h3>
			<p className="font-mono-custom text-sm text-muted-foreground leading-relaxed">
				{item.body}
			</p>
		</div>
	);
}
