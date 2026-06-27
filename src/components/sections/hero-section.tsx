'use client';

import { motion, useReducedMotion, type Transition } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { PacManRunner } from '@/components/ui/pac-man-runner';

const fadeUp = (delay = 0) => ({
	initial: { opacity: 0, y: 24 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5, ease: 'easeOut' as const, delay } satisfies Transition,
});

export const HeroSection = () => {
	const shouldReduce = useReducedMotion();

	const scrollToSection = (id: string) => {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<section
			className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden"
			aria-label="Hero"
		>
			{/* INSERT COIN label */}
			<motion.p
				{...(shouldReduce ? {} : fadeUp(0))}
				className="font-pixel text-[10px] sm:text-xs text-primary mb-6 sm:mb-8 animate-pixel-blink tracking-widest"
				aria-label="Insert coin to start"
			>
				INSERT COIN ▶
			</motion.p>

			{/* Name — Be Vietnam Pro, NOT Press Start 2P (no Vietnamese glyph support) */}
			<motion.h1
				{...(shouldReduce ? {} : fadeUp(0.15))}
				className="font-[family-name:var(--font-be-vietnam-pro)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight"
				aria-label="Nguyễn Trung Nguyên"
			>
				Nguyễn Trung Nguyên
			</motion.h1>

			{/* Role */}
			<motion.p
				{...(shouldReduce ? {} : fadeUp(0.25))}
				className="font-pixel text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-4 sm:mb-6 tracking-wide leading-relaxed"
			>
				BACKEND DEVELOPER
			</motion.p>

			{/* Description */}
			<motion.p
				{...(shouldReduce ? {} : fadeUp(0.35))}
				className="font-mono-custom text-sm sm:text-base text-muted-foreground mb-8 sm:mb-12 max-w-xl leading-relaxed px-2"
			>
				Xây dựng APIs mạnh mẽ, giao diện đẹp,<br className="hidden sm:block" />
				và những thứ hoạt động tốt từ backend đến frontend.
			</motion.p>

			{/* CTAs */}
			<motion.div
				{...(shouldReduce ? {} : fadeUp(0.45))}
				className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center"
			>
				<button
					onClick={() => scrollToSection('projects-section')}
					className="font-pixel text-[10px] sm:text-xs px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground border-2 border-primary transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_color-mix(in_oklch,var(--primary)_40%,transparent)] focus-visible:outline-2 focus-visible:outline-dotted focus-visible:outline-ring focus-visible:outline-offset-2 active:translate-y-0 leading-relaxed"
					aria-label="View my projects"
				>
					▶ VIEW WORK
				</button>

				<button
					onClick={() => scrollToSection('contact-section')}
					className="font-pixel text-[10px] sm:text-xs px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-foreground border-2 border-dotted border-foreground transition-all duration-150 hover:border-solid hover:border-primary hover:text-primary hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-dotted focus-visible:outline-ring focus-visible:outline-offset-2 leading-relaxed"
					aria-label="Contact me"
				>
					· CONTACT ·
				</button>
			</motion.div>

			{/* Pac-Man runner strip */}
			<motion.div
				{...(shouldReduce ? {} : fadeUp(0.6))}
				className="absolute bottom-20 left-4 right-4"
				aria-hidden="true"
			>
				<PacManRunner />
			</motion.div>

			{/* Scroll indicator */}
			<motion.div
				{...(shouldReduce ? {} : fadeUp(0.7))}
				className="absolute bottom-6 left-1/2 -translate-x-1/2"
				aria-hidden="true"
			>
				<motion.div
					animate={shouldReduce ? {} : { y: [0, 6, 0] }}
					transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
				>
					<ArrowDown className="w-5 h-5 text-muted-foreground" />
				</motion.div>
			</motion.div>
		</section>
	);
};
