'use client';
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const HeroSection = () => {
	return (
		<HeroHighlight className="min-h-screen">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="text-center max-w-4xl mx-auto px-4"
			>
				<AnimatedGradientText className="text-5xl md:text-7xl font-bold mb-6">
					John Developer
				</AnimatedGradientText>

				<h2 className="text-2xl md:text-4xl font-semibold text-foreground mb-8">
					I build{' '}
					<Highlight className="text-foreground">
						exceptional digital experiences
					</Highlight>{' '}
					with modern web technologies
				</h2>

				<p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
					Full-stack developer passionate about creating beautiful,
					functional, and user-centered digital experiences.
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button size="lg" className="text-lg px-8 py-6">
						View My Work
					</Button>
					<Button
						variant="outline"
						size="lg"
						className="text-lg px-8 py-6 bg-transparent"
					>
						Contact Me
					</Button>
				</div>
			</motion.div>
		</HeroHighlight>
	);
};
