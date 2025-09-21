'use client';
import Image from 'next/image';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/projects';

export const ProjectsSection = () => {
	return (
		<section id="projects-section" className="py-20 px-4 max-w-7xl mx-auto">
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
							<div className="relative overflow-hidden rounded-lg h-60 -mx-5 -mt-5">
								{project.image ? (
									<Image
										width={600}
										height={400}
										src={project.image}
										alt={`Screenshot of ${project.title} project showing ${project.description.substring(0, 30)}...`}
										className="w-full h-60 object-cover transition-transform duration-300 group-hover/bento:scale-105"
										priority={i < 2} // Only prioritize first two projects
										loading={i < 2 ? 'eager' : 'lazy'}
										blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIiAvPjwvc3ZnPg=="
										placeholder="blur"
									/>
								) : (
									<FallBackProjectImage />
								)}
								<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
							</div>
						}
						icon={
							<div className="space-y-4">
								<div
									className="flex flex-wrap gap-2"
									role="list"
									aria-label={`Technologies used in ${project.title}`}
								>
									{project.techStack.map((tech) => (
										<span
											key={tech}
											className="px-2.5 py-1.5 bg-secondary text-secondary-foreground rounded text-xs"
											role="listitem"
										>
											{tech}
										</span>
									))}
								</div>
								<div className="flex gap-3">
									{project.demoUrl && (
										<Button
											size="sm"
											variant="outline"
											className="h-9 px-4 bg-transparent"
											asChild
										>
											<a
												href={project.demoUrl}
												target="_blank"
												rel="noopener noreferrer"
												aria-label={`View live demo of ${project.title}`}
											>
												<ExternalLink
													className="w-4 h-4 mr-2"
													aria-hidden="true"
												/>
												Demo
											</a>
										</Button>
									)}
									{project.githubUrl && (
										<Button
											size="sm"
											variant="outline"
											className="h-9 px-4 bg-transparent"
											asChild
										>
											<a
												href={project.githubUrl}
												target="_blank"
												rel="noopener noreferrer"
												aria-label={`View source code for ${project.title} on GitHub`}
											>
												<Github
													className="w-4 h-4 mr-2"
													aria-hidden="true"
												/>
												Code
											</a>
										</Button>
									)}
								</div>
							</div>
						}
					/>
				))}
			</BentoGrid>
		</section>
	);
};

const FallBackProjectImage = () => {
	return (
		<div
			className="h-60 w-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center"
			role="img"
			aria-label="Project placeholder image"
		>
			<div className="text-center">
				<div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
					<svg
						className="w-10 h-10 text-blue-600 dark:text-blue-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
						/>
					</svg>
				</div>
				<p className="text-base text-gray-600 dark:text-gray-400 font-medium">
					Code Project
				</p>
			</div>
		</div>
	);
};
