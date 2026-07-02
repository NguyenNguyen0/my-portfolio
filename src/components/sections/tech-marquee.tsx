'use client';

import { Marquee } from '@/components/ui/marquee';
import { TechNode } from '@/components/ui/tech-node';
import { techIcons } from '@/data/techIcons';

const technologies = [
	'HTML',
	'CSS',
	'JavaScript',
	'TypeScript',
	'React',
	'Redux Toolkit',
	'Next.js',
	'Node.js',
	'Express',
	'Python',
	'FastAPI',
	'Flask',
	'MongoDB',
	'PostgreSQL',
	'Redis',
	'Tailwind CSS',
	'Docker',
	'Git',
	'Vercel',
	'Linux CLI',
	'Postman',
	'Java',
	'LangGraph',
	'Claude',
	'LangSmith',
	'Bash',
	'OpenAI',
	'shadcn/ui',
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
			<div className="w-5 h-5 flex-shrink-0 flex items-center justify-center bg-foreground/10 p-0.5">
				<TechNode label={tech} {...techIcon} />
			</div>
			<span className="font-mono-custom text-xs text-foreground whitespace-nowrap">
				{tech}
			</span>
		</div>
	);
};
