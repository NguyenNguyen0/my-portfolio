'use client';

import Image from 'next/image';
import { motion, useReducedMotion, type Transition } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { PacManRunner } from '@/components/ui/pac-man-runner';
import { usePortfolioActions } from '@/context/portfolio-actions';

const NAME_PARTS = ['Nguyễn Trung', 'Nguyên'] as const;

const fadeUp = (delay = 0) => ({
	initial: { opacity: 0, y: 24 },
	animate: { opacity: 1, y: 0 },
	transition: {
		duration: 0.5,
		ease: 'easeOut' as const,
		delay,
	} satisfies Transition,
});

const fadeIn = (delay = 0) => ({
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	transition: {
		duration: 0.6,
		ease: 'easeOut' as const,
		delay,
	} satisfies Transition,
});

export const HeroSection = () => {
	const shouldReduce = useReducedMotion();
	const { state } = usePortfolioActions();

	const scrollToSection = (id: string) => {
		const el = document.getElementById(id);
		if (!el) return;
		const top = el.getBoundingClientRect().top + window.scrollY - 64;
		window.scrollTo({ top, behavior: 'smooth' });
	};

	return (
		<>
			<style>{`
			@keyframes name-pulse {
				0%, 100% { text-shadow: 0 0 10px oklch(87.6% 0.179 95.4 / 0.75), 0 0 26px oklch(87.6% 0.179 95.4 / 0.4), 0 0 52px oklch(87.6% 0.179 95.4 / 0.15); }
				50%       { text-shadow: 0 0 16px oklch(87.6% 0.179 95.4 / 0.92), 0 0 40px oklch(87.6% 0.179 95.4 / 0.55), 0 0 72px oklch(87.6% 0.179 95.4 / 0.25); }
			}
			.dark .name-glow { animation: name-pulse 3s ease-in-out infinite; }
		`}</style>
			<section
				className="relative min-h-screen flex items-center px-4 py-20 lg:py-0 overflow-hidden"
				aria-label="Hero"
			>
				<div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* ── Left: text content ── */}
					<div className="text-center lg:text-left order-2 lg:order-1">
						{/* INSERT COIN */}
						<motion.p
							{...(shouldReduce ? {} : fadeUp(0))}
							className="font-pixel text-[10px] sm:text-xs text-primary mb-6 animate-pixel-blink tracking-widest"
							aria-label="Insert coin to start"
						>
							INSERT COIN &#x25B6;
						</motion.p>

						{/* Name */}
						<h1 className="name-glow font-[family-name:var(--font-vt323)] text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl text-foreground mb-4 leading-none">
							{NAME_PARTS.map((part, pi) => {
								const offset = NAME_PARTS.slice(0, pi).reduce(
									(s, p) => s + p.length,
									0,
								);
								return (
									<span
										key={pi}
										style={{
											display: 'block',
											whiteSpace: 'nowrap',
										}}
									>
										{shouldReduce
											? part
											: Array.from(part).map(
													(char, ci) => (
														<motion.span
															key={ci}
															initial={{
																opacity: 0,
																y: 20,
															}}
															animate={{
																opacity: 1,
																y: 0,
															}}
															transition={{
																duration: 0.28,
																ease: 'easeOut',
																delay:
																	0.1 +
																	(offset +
																		ci) *
																		0.038,
															}}
															whileHover={{
																y: -6,
																transition: {
																	duration: 0.1,
																},
															}}
															style={{
																display:
																	'inline-block',
																cursor: 'default',
															}}
														>
															{char === ' '
																? ' '
																: char}
														</motion.span>
													),
												)}
									</span>
								);
							})}
						</h1>

						{/* Role */}
						<motion.p
							{...(shouldReduce ? {} : fadeUp(0.22))}
							className="font-pixel text-[10px] sm:text-xs text-muted-foreground mb-5 tracking-wide leading-relaxed"
						>
							FULL-STACK DEVELOPER · AI INTEGRATION
						</motion.p>

						{/* Description */}
						<motion.p
							{...(shouldReduce ? {} : fadeUp(0.32))}
							className="font-mono-custom text-sm sm:text-base text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
						>
							{state.heroDescription ??
								'Builds distributed systems end-to-end — Spring Boot microservices, Kafka pipelines, LangGraph AI agents, React interfaces. Deployed to production on AWS. Ships things that work.'}
						</motion.p>

						{/* CTAs */}
						<motion.div
							{...(shouldReduce ? {} : fadeUp(0.42))}
							className="flex flex-wrap gap-3 sm:gap-4 items-center justify-center lg:justify-start mb-10"
						>
							<button
								onClick={() =>
									scrollToSection('projects-section')
								}
								className="font-pixel text-[10px] sm:text-xs px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground border-2 border-primary transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_color-mix(in_oklch,var(--primary)_40%,transparent)] focus-visible:outline-2 focus-visible:outline-dotted focus-visible:outline-ring focus-visible:outline-offset-2 active:translate-y-0 leading-relaxed"
								aria-label="View my projects"
							>
								&#x25B6; VIEW WORK
							</button>
							<button
								onClick={() =>
									scrollToSection('contact-section')
								}
								className="font-pixel text-[10px] sm:text-xs px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-foreground border-2 border-dotted border-foreground transition-all duration-150 hover:border-solid hover:border-primary hover:text-primary hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-dotted focus-visible:outline-ring focus-visible:outline-offset-2 leading-relaxed"
								aria-label="Contact me"
							>
								· CONTACT ·
							</button>
							<a
								href="/cv_nguyen_trung_nguyen_fullstack.pdf"
								download="Nguyen_Trung_Nguyen_CV.pdf"
								className="font-pixel text-[10px] sm:text-xs px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-foreground border-2 border-dotted border-foreground transition-all duration-150 hover:border-solid hover:border-primary hover:text-primary hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-dotted focus-visible:outline-ring focus-visible:outline-offset-2 leading-relaxed inline-flex items-center gap-2"
								aria-label="Download CV"
							>
								<Download
									className="w-3 h-3"
									aria-hidden="true"
								/>
								DOWNLOAD CV
							</a>
						</motion.div>

						{/* Pac-Man runner */}
						<motion.div
							{...(shouldReduce ? {} : fadeUp(0.55))}
							className="flex justify-center lg:justify-start"
							aria-hidden="true"
						>
							<PacManRunner />
						</motion.div>
					</div>

					{/* ── Right: Player card ── */}
					<motion.div
						{...(shouldReduce ? {} : fadeIn(0.3))}
						className="order-1 lg:order-2 flex justify-center lg:justify-end"
					>
						<PlayerCard />
					</motion.div>
				</div>

				{/* Scroll indicator */}
				<motion.div
					{...(shouldReduce ? {} : fadeUp(0.7))}
					className="absolute bottom-6 left-1/2 -translate-x-1/2"
					aria-hidden="true"
				>
					<motion.div
						animate={shouldReduce ? {} : { y: [0, 6, 0] }}
						transition={{
							duration: 1.4,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					>
						<ArrowDown className="w-5 h-5 text-muted-foreground" />
					</motion.div>
				</motion.div>
			</section>
		</>
	);
};

function PlayerCard() {
	const shouldReduce = useReducedMotion();

	// Timing strings — disabled when user prefers reduced motion
	const sweepAnim = shouldReduce ? 'none' : 'crt-sweep 5s linear infinite';
	const flickerAnim = shouldReduce
		? 'none'
		: 'crt-flicker 7s linear infinite';
	const bandAnim = shouldReduce
		? 'none'
		: 'crt-band-glitch 6s linear infinite';
	const shakeAnim = shouldReduce
		? 'none'
		: 'crt-container-glitch 6s linear infinite';

	return (
		<div className="relative w-72 sm:w-80 md:w-96 lg:w-[26rem] border-2 border-primary flex-shrink-0">
			{/* Corner brackets */}
			<span
				className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-primary"
				aria-hidden="true"
			/>
			<span
				className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-primary"
				aria-hidden="true"
			/>
			<span
				className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-primary"
				aria-hidden="true"
			/>
			<span
				className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-primary"
				aria-hidden="true"
			/>

			{/* PLAYER 1 badge */}
			<div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
				<span className="font-pixel text-[9px] bg-primary text-primary-foreground px-3 py-1 whitespace-nowrap tracking-widest">
					PLAYER 1
				</span>
			</div>

			{/* ── Avatar + CRT layers ── */}
			<div
				className="relative overflow-hidden bg-[oklch(6%_0_0)]"
				style={{ animation: shakeAnim }}
				aria-hidden="false"
			>
				{/* Base pixel avatar */}
				<Image
					src="/pixel-avatar.jpg"
					alt="Pixel avatar of Nguyễn Trung Nguyên"
					width={320}
					height={360}
					className="w-full h-auto object-cover block"
					priority
					style={{
						imageRendering: 'pixelated',
						animation: flickerAnim,
					}}
				/>

				{/* Layer 1: Glitch displacement band */}
				<div
					className="absolute inset-0 pointer-events-none"
					aria-hidden="true"
					style={{
						backgroundImage: 'url(/pixel-avatar.png)',
						backgroundSize: '100% auto',
						backgroundPosition: 'top center',
						backgroundRepeat: 'no-repeat',
						animation: bandAnim,
					}}
				/>

				{/* Layer 2: Sweep bar */}
				<div
					className="absolute left-0 right-0 pointer-events-none"
					aria-hidden="true"
					style={{
						height: '18%',
						background:
							'linear-gradient(to bottom, transparent 0%, oklch(87.6% 0.179 95.4 / 0.09) 40%, oklch(87.6% 0.179 95.4 / 0.14) 50%, oklch(87.6% 0.179 95.4 / 0.09) 60%, transparent 100%)',
						animation: sweepAnim,
					}}
				/>

				{/* Layer 3: Enhanced scanlines */}
				<div
					className="absolute inset-0 pointer-events-none"
					aria-hidden="true"
					style={{
						backgroundImage:
							'repeating-linear-gradient(0deg, oklch(0% 0 0 / 0.22) 0px, oklch(0% 0 0 / 0.22) 1px, transparent 1px, transparent 3px)',
					}}
				/>

				{/* Layer 4: Vignette */}
				<div
					className="absolute inset-0 pointer-events-none"
					aria-hidden="true"
					style={{
						background:
							'radial-gradient(ellipse 85% 85% at 50% 45%, transparent 35%, oklch(0% 0 0 / 0.55) 100%)',
					}}
				/>

				{/* Layer 5: RGB chromatic aberration tint */}
				<div
					className="absolute inset-0 pointer-events-none mix-blend-screen opacity-[0.04]"
					aria-hidden="true"
					style={{
						background:
							'linear-gradient(to right, oklch(65% 0.25 30) 0%, transparent 30%, transparent 70%, oklch(55% 0.25 270) 100%)',
					}}
				/>
			</div>

			{/* Status bar */}
			<div className="flex items-center justify-between px-4 py-2.5 bg-background border-t border-primary">
				<span className="font-pixel text-[8px] text-muted-foreground">
					LV.04
				</span>
				<div
					className={`flex items-center gap-1.5 ${shouldReduce ? '' : 'animate-ready-blink'}`}
				>
					<div className="w-1.5 h-1.5 rounded-full bg-primary" />
					<span className="font-pixel text-[8px] text-primary tracking-widest">
						READY
					</span>
				</div>
				<span className="font-pixel text-[8px] text-muted-foreground">
					&#x221E; PTS
				</span>
			</div>
		</div>
	);
}
