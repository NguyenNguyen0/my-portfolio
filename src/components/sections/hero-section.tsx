'use client';
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Eye, MessageSquare, ArrowRight } from 'lucide-react';

export const HeroSection = () => {
	const scrollToSection = (id: string) => {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	};

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
					<h1 aria-label="Nguyễn Trung Nguyên, Full Stack Developer">
						<AnimatedGradientText className="text-6xl sm:text-7xl md:text-9xl lg:text-10xl font-bold mb-4 md:mb-6">
							{`<${'Nguyễn Trung Nguyên'}/>`}
						</AnimatedGradientText>
					</h1>

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
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							transition={{ type: "spring", stiffness: 400, damping: 17 }}
						>
							<Button
								size="lg"
								className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 group"
								onClick={() => scrollToSection('projects-section')}
								aria-label="View my projects"
							>
								<Eye className="mr-2 h-5 w-5 group-hover:animate-pulse" />
								View My Work
								<ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" />
							</Button>
						</motion.div>
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							transition={{ type: "spring", stiffness: 400, damping: 17 }}
						>
							<Button
								variant="outline"
								size="lg"
								className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-transparent backdrop-blur-sm group"
								onClick={() => scrollToSection('contact-section')}
								aria-label="Contact me"
							>
								<MessageSquare className="mr-2 h-5 w-5 group-hover:animate-bounce" />
								Contact Me
							</Button>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</HeroHighlight>
	);
};
