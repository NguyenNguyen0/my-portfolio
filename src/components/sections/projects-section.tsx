'use client';

import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '@/data/projects';

const fadeUp: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stagger: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.1 } },
};

export const ProjectsSection = () => {
	const shouldReduce = useReducedMotion();

	return (
		<section id="projects-section" className="py-16 sm:py-24 px-4 max-w-7xl mx-auto">
			{/* Heading */}
			<motion.div
				variants={fadeUp}
				initial={shouldReduce ? false : 'hidden'}
				whileInView="visible"
				viewport={{ once: true }}
				className="mb-12 sm:mb-16"
			>
				<p className="font-pixel text-[10px] text-primary mb-3 tracking-widest">
					PROJECTS
				</p>
				<h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground leading-relaxed">
					FEATURED WORK
				</h2>
			</motion.div>

			<motion.div
				variants={stagger}
				initial={shouldReduce ? false : 'hidden'}
				whileInView="visible"
				viewport={{ once: true }}
				className="grid sm:grid-cols-2 gap-6"
			>
				{projects.map((project, i) => (
					<motion.article
						key={project.id}
						variants={fadeUp}
						className="pixel-card flex flex-col group"
					>
						{/* Image */}
						<div className="relative overflow-hidden h-48 sm:h-52 flex-shrink-0">
							{project.image ? (
								<Image
									width={600}
									height={400}
									src={project.image}
									alt={`Screenshot of ${project.title}`}
									className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
									priority={i < 2}
									loading={i < 2 ? 'eager' : 'lazy'}
									placeholder="blur"
									blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMGQwZDBkIiAvPjwvc3ZnPg=="
								/>
							) : (
								<ProjectPlaceholder />
							)}
							{/* Type badges overlay */}
							<div className="absolute top-3 left-3 flex gap-2 flex-wrap">
								{project.type.map((t) => (
									<span
										key={t}
										className="font-pixel text-[8px] px-2 py-1 bg-background/90 text-primary border border-dotted border-primary"
									>
										{t.toUpperCase()}
									</span>
								))}
							</div>
						</div>

						{/* Content */}
						<div className="flex flex-col flex-1 p-5 gap-4">
							<div>
								<h3 className="font-pixel text-[11px] text-foreground mb-2 leading-relaxed">
									{project.title}
								</h3>
								<p className="font-mono-custom text-sm text-muted-foreground leading-relaxed">
									{project.description}
								</p>
							</div>

							{/* Tech stack */}
							<div
								className="flex flex-wrap gap-2 mt-auto"
								role="list"
								aria-label={`Technologies used in ${project.title}`}
							>
								{project.techStack.map((tech) => (
									<span
										key={tech}
										className="font-mono-custom text-[11px] px-2.5 py-1 border border-dotted border-border text-muted-foreground"
										role="listitem"
									>
										{tech}
									</span>
								))}
							</div>

							{/* Links */}
							<div className="flex gap-3 pt-2 border-t border-dotted border-border">
								{project.demoUrl && (
									<a
										href={project.demoUrl}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={`View live demo of ${project.title}`}
										className="font-pixel text-[9px] flex items-center gap-1.5 text-muted-foreground border border-dotted border-border px-3 py-2 transition-all duration-150 hover:border-solid hover:border-primary hover:text-primary hover:-translate-y-0.5"
									>
										<ExternalLink className="w-3 h-3" aria-hidden="true" />
										DEMO
									</a>
								)}
								{project.githubUrl && (
									<a
										href={project.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={`View source code for ${project.title} on GitHub`}
										className="font-pixel text-[9px] flex items-center gap-1.5 text-muted-foreground border border-dotted border-border px-3 py-2 transition-all duration-150 hover:border-solid hover:border-primary hover:text-primary hover:-translate-y-0.5"
									>
										<Github className="w-3 h-3" aria-hidden="true" />
										CODE
									</a>
								)}
							</div>
						</div>
					</motion.article>
				))}
			</motion.div>
		</section>
	);
};

function ProjectPlaceholder() {
	return (
		<div
			className="h-full w-full bg-muted flex items-center justify-center"
			role="img"
			aria-label="Project placeholder"
		>
			<p className="font-pixel text-[10px] text-muted-foreground tracking-widest">
				&lt;PROJECT/&gt;
			</p>
		</div>
	);
}
