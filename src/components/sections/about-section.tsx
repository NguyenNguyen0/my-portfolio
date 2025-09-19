'use client';
import Image from 'next/image';
import { TextReveal } from '@/components/ui/text-reveal';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { motion } from 'framer-motion';

const skills = [
	'React',
	'Next.js',
	'TypeScript',
	'Node.js',
	'Tailwind CSS',
	'Framer Motion',
	'PostgreSQL',
	'MongoDB',
];

export const AboutSection = () => {
	return (
		<section className="py-20 px-4 max-w-7xl mx-auto">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}
				className="text-center mb-16"
			>
				<h2 className="text-4xl md:text-5xl font-bold mb-8">
					About Me
				</h2>
			</motion.div>

			<div className="grid md:grid-cols-2 gap-12 items-center">
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					<SpotlightCard className="h-80 flex items-center justify-center">
						<Image
							width={256}
							height={256}
							src="/avatar.jpg"
							alt="Developer Portrait"
							className="w-64 h-64 rounded-full object-cover"
						/>
					</SpotlightCard>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 20 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="space-y-6"
				>
					<TextReveal
						text="I'm a passionate full-stack developer with 5+ years of experience creating digital solutions that make a difference. I love turning complex problems into simple, beautiful, and intuitive designs."
						className="text-lg leading-relaxed text-muted-foreground"
					/>

					<div className="space-y-4">
						<h3 className="text-2xl font-semibold">
							Skills & Technologies
						</h3>
						<div className="flex flex-wrap gap-3">
							{skills.map((skill, index) => (
								<motion.span
									key={skill}
									initial={{ opacity: 0, scale: 0.8 }}
									whileInView={{ opacity: 1, scale: 1 }}
									transition={{
										duration: 0.5,
										delay: index * 0.1,
									}}
									viewport={{ once: true }}
									className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
								>
									{skill}
								</motion.span>
							))}
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};
