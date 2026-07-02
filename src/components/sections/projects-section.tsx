'use client';

import Image from 'next/image';
import {
	motion,
	AnimatePresence,
	useReducedMotion,
	type Variants,
} from 'framer-motion';
import {
	ExternalLink,
	Github,
	ChevronLeft,
	ChevronRight,
	X,
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { projects } from '@/data/projects';
import { usePortfolioActions } from '@/context/portfolio-actions';

// Badge color palette — cycle by tech index
const BADGE_PALETTE = [
	{ color: '#FFD700', bg: 'rgba(255,215,0,0.08)' },
	{ color: '#2A3FE5', bg: 'rgba(42,63,229,0.10)' },
	{ color: '#16A34A', bg: 'rgba(22,163,74,0.10)' },
	{ color: '#F97316', bg: 'rgba(249,115,22,0.10)' },
	{ color: '#A855F7', bg: 'rgba(168,85,247,0.10)' },
	{ color: '#F4B9B0', bg: 'rgba(244,185,176,0.10)' },
];

const GitLabIcon = () => (
	<svg
		viewBox="0 0 24 24"
		className="w-3 h-3"
		fill="currentColor"
		aria-hidden="true"
	>
		<path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.49a.42.42 0 0 1 .11-.18.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" />
	</svg>
);

const fadeUp: Variants = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: 'easeOut' as const },
	},
};

// ── Carousel ──────────────────────────────────────────────────────────────────

function Carousel({ images, title }: { images: string[]; title: string }) {
	const [idx, setIdx] = useState(0);
	const [lightbox, setLightbox] = useState(false);
	const shouldReduce = useReducedMotion();

	const next = useCallback(
		() => setIdx((i) => (i + 1) % images.length),
		[images.length],
	);
	const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);

	useEffect(() => {
		if (shouldReduce || images.length <= 1 || lightbox) return;
		const t = setInterval(next, 3500);
		return () => clearInterval(t);
	}, [shouldReduce, images.length, lightbox, next]);

	if (!images.length) {
		return (
			<div className="h-full w-full bg-muted flex items-center justify-center">
				<span className="font-pixel text-[10px] text-muted-foreground tracking-widest">
					&lt;NO IMG/&gt;
				</span>
			</div>
		);
	}

	return (
		<>
			<div
				className="relative h-full overflow-hidden cursor-pointer group/car select-none"
				onClick={() => setLightbox(true)}
				role="button"
				aria-label={`View screenshots of ${title}`}
				tabIndex={0}
				onKeyDown={(e) => e.key === 'Enter' && setLightbox(true)}
			>
				{/* Slides */}
				<AnimatePresence mode="wait" initial={false}>
					<motion.div
						key={idx}
						initial={{ opacity: 0, x: 16 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -16 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className="absolute inset-0"
					>
						<Image
							src={images[idx]}
							alt={`${title} — screenshot ${idx + 1} of ${images.length}`}
							fill
							className="object-contain bg-muted"
							sizes="(max-width: 768px) 100vw, 45vw"
						/>
					</motion.div>
				</AnimatePresence>

				{/* Scanline overlay */}
				<div
					className="absolute inset-0 pointer-events-none"
					aria-hidden="true"
					style={{
						backgroundImage:
							'repeating-linear-gradient(0deg, oklch(0% 0 0 / 0.12) 0px, oklch(0% 0 0 / 0.12) 1px, transparent 1px, transparent 3px)',
					}}
				/>

				{/* Prev / Next */}
				{images.length > 1 && (
					<>
						<button
							onClick={(e) => {
								e.stopPropagation();
								prev();
							}}
							className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/70 border border-primary text-primary flex items-center justify-center opacity-0 group-hover/car:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground"
							aria-label="Previous screenshot"
						>
							<ChevronLeft className="w-4 h-4" />
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								next();
							}}
							className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/70 border border-primary text-primary flex items-center justify-center opacity-0 group-hover/car:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground"
							aria-label="Next screenshot"
						>
							<ChevronRight className="w-4 h-4" />
						</button>
					</>
				)}

				{/* Dots */}
				{images.length > 1 && (
					<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
						{images.map((_, i) => (
							<button
								key={i}
								onClick={(e) => {
									e.stopPropagation();
									setIdx(i);
								}}
								aria-label={`Screenshot ${i + 1}`}
								style={{
									width: i === idx ? '14px' : '6px',
									height: '6px',
									background:
										i === idx
											? 'var(--primary)'
											: 'rgba(255,255,255,0.3)',
									transition: 'width 0.2s, background 0.2s',
								}}
							/>
						))}
					</div>
				)}

				{/* Counter badge */}
				<div className="absolute top-3 right-3 z-10 opacity-0 group-hover/car:opacity-100 transition-opacity">
					<span className="font-pixel text-[7px] bg-black/85 text-primary px-2 py-1 border border-primary/60 tracking-widest">
						{images.length > 1
							? `${idx + 1}/${images.length} · VIEW ALL`
							: 'VIEW'}
					</span>
				</div>
			</div>

			{/* Lightbox */}
			<AnimatePresence>
				{lightbox && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center overflow-y-auto py-8 px-4"
						onClick={() => setLightbox(false)}
					>
						<div
							className="flex items-center justify-between w-full max-w-4xl mb-6 flex-shrink-0"
							onClick={(e) => e.stopPropagation()}
						>
							<span className="font-pixel text-[9px] text-primary tracking-widest">
								{title.toUpperCase()} — GALLERY ({images.length}{' '}
								SCREENSHOTS)
							</span>
							<button
								onClick={() => setLightbox(false)}
								className="w-8 h-8 border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
								aria-label="Close gallery"
							>
								<X className="w-4 h-4" />
							</button>
						</div>

						<div
							className="flex flex-col gap-4 w-full max-w-4xl"
							onClick={(e) => e.stopPropagation()}
						>
							{images.map((src, i) => (
								<div
									key={i}
									className="relative w-full border border-primary/30"
									style={{ aspectRatio: '16/9' }}
								>
									<Image
										src={src}
										alt={`${title} screenshot ${i + 1}`}
										fill
										className="object-contain bg-muted"
										sizes="(max-width: 1024px) 100vw, 896px"
									/>
									<span className="absolute bottom-2 left-2 font-pixel text-[7px] bg-black/80 text-muted-foreground px-2 py-1">
										{i + 1} / {images.length}
									</span>
								</div>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

// ── Project Card ──────────────────────────────────────────────────────────────

function ProjectCard({
	project,
	index,
	isHighlighted,
}: {
	project: (typeof projects)[number];
	index: number;
	isHighlighted?: boolean;
}) {
	const images = project.images ?? (project.image ? [project.image] : []);
	const isEven = index % 2 === 0;

	return (
		<motion.article
			variants={fadeUp}
			className={`border border-dotted border-border bg-card overflow-hidden transition-all duration-300 hover:border-solid hover:border-primary/50${isHighlighted ? ' ring-2 ring-primary shadow-[0_0_24px_oklch(87.6%_0.179_95.4/0.5)]' : ''}`}
		>
			<div
				className={`flex flex-col lg:flex-row lg:min-h-[480px] ${isEven ? '' : 'lg:flex-row-reverse'}`}
			>
				{/* ── Image carousel ── */}
				<div className="lg:w-[45%] h-80 sm:h-[420px] lg:h-auto relative flex-shrink-0">
					<Carousel images={images} title={project.title} />
				</div>

				{/* ── Content ── */}
				<div
					className={`flex flex-col flex-1 p-6 lg:p-8 gap-5 min-w-0 ${isEven ? 'lg:border-l' : 'lg:border-r'} border-dotted border-border`}
				>
					{/* Type tags */}
					<div className="flex flex-wrap gap-2">
						{project.type.map((t) => (
							<span
								key={t}
								className="font-pixel text-[7px] px-2 py-1 border border-dotted border-primary text-primary tracking-widest"
							>
								{t.toUpperCase()}
							</span>
						))}
					</div>

					{/* Title + meta */}
					<div>
						<h3 className="font-pixel text-sm sm:text-base text-foreground leading-relaxed mb-2.5">
							{project.title}
						</h3>
						<div className="flex flex-wrap gap-x-4 gap-y-1.5">
							{project.period && (
								<span className="font-pixel text-[7px] text-muted-foreground tracking-wide">
									{project.period}
								</span>
							)}
							{project.team && (
								<span className="font-pixel text-[7px] text-muted-foreground tracking-wide">
									· {project.team}
								</span>
							)}
						</div>
						{project.role && (
							<p className="font-pixel text-[7px] text-secondary mt-1 tracking-wide">
								{project.role}
							</p>
						)}
						{project.responsibilities?.length > 0 && (
							<ul className="mt-3 space-y-1">
								{project.responsibilities.map((item) => (
									<li
										key={item}
										className="font-mono-custom text-xs text-muted-foreground leading-relaxed flex gap-2"
									>
										<span
											className="text-primary flex-shrink-0"
											aria-hidden="true"
										>
											&#x25B8;
										</span>
										{item}
									</li>
								))}
							</ul>
						)}
					</div>

					{/* Description */}
					<p className="font-mono-custom text-sm text-muted-foreground leading-relaxed">
						{project.description}
					</p>

					{/* Tech stack badges */}
					<div
						className="flex flex-wrap gap-2"
						role="list"
						aria-label={`Technologies in ${project.title}`}
					>
						{project.techStack.map((tech, i) => {
							const { color, bg } =
								BADGE_PALETTE[i % BADGE_PALETTE.length];
							return (
								<span
									key={tech}
									role="listitem"
									className="font-mono-custom text-[11px] px-3 py-1.5 font-semibold tracking-wide transition-all duration-150"
									style={{
										color,
										border: `1px solid ${color}`,
										background: bg,
										boxShadow: `0 0 8px ${bg}, inset 0 0 4px ${bg}`,
									}}
								>
									{tech}
								</span>
							);
						})}
					</div>

					{/* Links */}
					<div className="flex flex-wrap gap-3 pt-4 border-t border-dotted border-border mt-auto">
						{project.demoUrl && (
							<a
								href={project.demoUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`Live demo of ${project.title}`}
								className="font-pixel text-[9px] flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground border-2 border-primary transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_3px_0_0_color-mix(in_oklch,var(--primary)_40%,transparent)]"
							>
								<ExternalLink
									className="w-3 h-3"
									aria-hidden="true"
								/>
								LIVE DEMO
							</a>
						)}
						{project.githubUrl && (
							<a
								href={project.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`GitHub source for ${project.title}`}
								className="font-pixel text-[9px] flex items-center gap-2 px-4 py-2.5 border border-dotted border-border text-muted-foreground transition-all duration-150 hover:border-solid hover:border-primary hover:text-primary hover:-translate-y-0.5"
							>
								<Github
									className="w-3 h-3"
									aria-hidden="true"
								/>
								GITHUB
							</a>
						)}
						{project.gitlabUrl && (
							<a
								href={project.gitlabUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`GitLab source for ${project.title}`}
								className="font-pixel text-[9px] flex items-center gap-2 px-4 py-2.5 border border-dotted border-border text-muted-foreground transition-all duration-150 hover:border-solid hover:border-primary hover:text-primary hover:-translate-y-0.5"
							>
								<GitLabIcon />
								GITLAB
							</a>
						)}
					</div>
				</div>
			</div>
		</motion.article>
	);
}

// ── Section ───────────────────────────────────────────────────────────────────

export const ProjectsSection = () => {
	const shouldReduce = useReducedMotion();
	const { state, dispatch } = usePortfolioActions();

	useEffect(() => {
		if (!state.highlightedProject) return;
		const t = setTimeout(
			() =>
				dispatch({ type: 'SET_HIGHLIGHTED_PROJECT', projectId: null }),
			4000,
		);
		return () => clearTimeout(t);
	}, [state.highlightedProject, dispatch]);

	return (
		<section
			id="projects-section"
			className="py-16 sm:py-24 px-4 max-w-7xl mx-auto"
		>
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
				initial={shouldReduce ? false : 'hidden'}
				whileInView="visible"
				viewport={{ once: true }}
				variants={{
					hidden: {},
					visible: { transition: { staggerChildren: 0.12 } },
				}}
				className="flex flex-col gap-8"
			>
				{projects.map((project, i) => (
					<ProjectCard
						key={project.id}
						project={project}
						index={i}
						isHighlighted={state.highlightedProject === project.id}
					/>
				))}
			</motion.div>
		</section>
	);
};
