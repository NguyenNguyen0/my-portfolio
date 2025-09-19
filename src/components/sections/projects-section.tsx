'use client';
import Image from 'next/image';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
	{
		title: 'E-Commerce Platform',
		description:
			'Full-stack e-commerce solution with Next.js, Stripe integration, and admin dashboard.',
		image: '/modern-ecommerce-interface.png',
		tech: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
		demo: '#',
		github: '#',
		className: 'md:col-span-2',
	},
	{
		title: 'Task Management App',
		description:
			'Collaborative task management with real-time updates and team features.',
		image: '/task-management-dashboard.png',
		tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
		demo: '#',
		github: '#',
	},
	{
		title: 'Weather Dashboard',
		description:
			'Beautiful weather app with location-based forecasts and interactive maps.',
		image: '/weather-dashboard-interface.png',
		tech: ['React', 'OpenWeather API', 'Chart.js'],
		demo: '#',
		github: '#',
	},
	{
		title: 'Portfolio Website',
		description:
			'Responsive portfolio built with modern animations and smooth interactions.',
		image: '/modern-portfolio-website.png',
		tech: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
		demo: '#',
		github: '#',
		className: 'md:col-span-2',
	},
];

export const ProjectsSection = () => {
	return (
		<section className="py-20 px-4 max-w-7xl mx-auto">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}
				className="text-center mb-16"
			>
				<h2 className="text-4xl md:text-5xl font-bold mb-4">
					Featured Projects
				</h2>
				<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
					Here are some of my recent projects that showcase my skills
					and passion for development.
				</p>
			</motion.div>

			<BentoGrid className="max-w-6xl mx-auto">
				{projects.map((project, i) => (
					<BentoGridItem
						key={i}
						title={project.title}
						description={project.description}
						className={project.className}
						header={
							<div className="relative overflow-hidden rounded-lg">
								<Image
									width={100}
									height={128}
									src={project.image || '/placeholder.svg'}
									alt={project.title}
									className="w-full h-32 object-cover transition-transform duration-300 group-hover/bento:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
							</div>
						}
						icon={
							<div className="space-y-4">
								<div className="flex flex-wrap gap-2">
									{project.tech.map((tech) => (
										<span
											key={tech}
											className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
										>
											{tech}
										</span>
									))}
								</div>
								<div className="flex gap-2">
									<Button
										size="sm"
										variant="outline"
										className="h-8 px-3 bg-transparent"
									>
										<ExternalLink className="w-3 h-3 mr-1" />
										Demo
									</Button>
									<Button
										size="sm"
										variant="outline"
										className="h-8 px-3 bg-transparent"
									>
										<Github className="w-3 h-3 mr-1" />
										Code
									</Button>
								</div>
							</div>
						}
					/>
				))}
			</BentoGrid>
		</section>
	);
};
