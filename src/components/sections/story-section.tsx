'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Timeline } from '@/components/ui/timeline';
import { storyEntries } from '@/data/story';

const fadeUp: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export const StorySection = () => {
	const shouldReduce = useReducedMotion();

	return (
		<section className="py-16 sm:py-24 px-4" id="story">
			<div className="max-w-7xl mx-auto">
				{/* Heading */}
				<motion.div
					variants={fadeUp}
					initial={shouldReduce ? false : 'hidden'}
					whileInView="visible"
					viewport={{ once: true }}
					className="mb-12 sm:mb-20 text-center"
				>
					<p className="font-pixel text-[10px] text-primary mb-3 tracking-widest">
						STORY MODE
					</p>
					<h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground leading-relaxed">
						MY JOURNEY
					</h2>
					<p className="font-mono-custom text-sm text-muted-foreground mt-4 max-w-lg mx-auto leading-relaxed">
						Every step from the first line of code to today.
					</p>
				</motion.div>

				<Timeline items={storyEntries} />
			</div>
		</section>
	);
};
