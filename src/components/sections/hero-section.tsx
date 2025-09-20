'use client';
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { World } from '@/components/ui/globe';
import { globeData } from '@/data/globeData';
import { Suspense } from 'react';

export const HeroSection = () => {
	return (
		<HeroHighlight className="min-h-screen">
			<div className="relative w-full h-screen">
				{/* Globe 3D background */}
				<div className="absolute inset-0 z-0 opacity-70">
					<Suspense fallback={<div className="w-full h-full bg-background" />}>
						<div className="w-full h-full">
							<World data={globeData} />
						</div>
					</Suspense>
				</div>

				{/* Content overlay */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="relative z-10 text-center max-w-4xl mx-auto px-4 flex flex-col justify-center h-full"
				>
					<AnimatedGradientText className="text-9xl md:text-10xl font-bold mb-6">
						{`<${"Nguyễn Trung Nguyên"}/>`}
					</AnimatedGradientText>

					<h2 className="text-2xl md:text-4xl font-semibold text-foreground mb-8">
						A Backend developer{' '}
						<Highlight className="text-foreground">
							with a flair of Frontend
						</Highlight>{' '}
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
							className="text-lg px-8 py-6 bg-transparent backdrop-blur-sm"
						>
							Contact Me
						</Button>
					</div>
				</motion.div>
			</div>
		</HeroHighlight>
	);
};
