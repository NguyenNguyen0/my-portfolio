'use client';

import { Marquee } from '@/components/ui/marquee';
import { techIcons } from '@/data/techIcons';
import Image from 'next/image';

const technologies = [
	'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Redux Toolkit',
	'Next.js', 'Node.js', 'Express', 'Python', 'FastAPI', 'Flask',
	'MongoDB', 'PostgreSQL', 'Redis', 'Microsoft SQL Server',
	'Tailwind CSS', 'Docker', 'Git', 'Vercel', 'Linux CLI', 'Postman', 'Java',
].filter((tech) => tech in techIcons);

export const TechMarquee = () => {
	return (
		<section
			className="py-8 border-y border-dotted border-border"
			aria-labelledby="tech-title"
		>
			<p
				id="tech-title"
				className="font-pixel text-[10px] text-center text-muted-foreground mb-6 tracking-widest"
			>
				TECH STACK
			</p>

			<div className="marquee-container">
				<Marquee
					pauseOnHover
					className="[--duration:50s] [--gap:12px]"
					aria-label="Scrolling technology icons"
				>
					{technologies.map((tech) => (
						<TechBadge key={tech} tech={tech} />
					))}
				</Marquee>
			</div>
		</section>
	);
};

export const TechBadge = ({ tech }: { tech: string }) => {
	const techIcon = techIcons[tech];
	if (!techIcon) return null;

	return (
		<div className="pixel-card flex items-center gap-2 px-4 py-2 mx-2 cursor-default select-none">
			<Image
				src={techIcon.iconPath}
				alt={`${tech} icon`}
				width={18}
				height={18}
				className="object-contain flex-shrink-0"
				loading="lazy"
			/>
			<span className="font-mono-custom text-xs text-foreground whitespace-nowrap">
				{tech}
			</span>
		</div>
	);
};
