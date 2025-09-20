'use client';
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const HeroSection = () => {
	return (
		<HeroHighlight className="min-h-screen">
			<div className="relative w-full h-screen overflow-hidden">
				{/* Content overlay */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="relative z-10 text-center max-w-4xl mx-auto px-2 sm:px-4 flex flex-col justify-center h-full pb-8 md:py-0"
				>
					<AnimatedGradientText className="text-6xl sm:text-7xl md:text-9xl lg:text-10xl font-bold mb-4 md:mb-6">
						{`<${'Nguyễn Trung Nguyên'}/>`}
					</AnimatedGradientText>

					<h2 className="text-xl sm:text-2xl md:text-4xl font-semibold text-foreground mb-4 md:mb-8">
						A Backend developer{' '}
						<Highlight className="text-foreground">
							with a flair of Frontend
						</Highlight>{' '}
					</h2>
					<p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-12 max-w-2xl mx-auto leading-relaxed px-2 sm:px-4">
						Full-stack developer passionate about creating
						beautiful, functional, and user-centered digital
						experiences.
					</p>
					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
						<Button
							size="lg"
							className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
							onClick={() => {
								document
									.getElementById('projects-section')
									?.scrollIntoView({ behavior: 'smooth' });
							}}
						>
							View My Work
						</Button>
						<Button
							variant="outline"
							size="lg"
							className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-transparent backdrop-blur-sm"
							onClick={() => {
								document
									.getElementById('contact-section')
									?.scrollIntoView({ behavior: 'smooth' });
							}}
						>
							Contact Me
						</Button>
					</div>
				</motion.div>
			</div>
		</HeroHighlight>
	);
};
