'use client';
import { Marquee } from '@/components/ui/marquee';
import { techIcons } from '@/data/techIcons';
import Image from 'next/image';

// Filter the technologies that exist in techIcons
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
	'Microsoft SQL Server',
	'Tailwind CSS',
	'Docker',
	'Git',
	'Vercel',
	'Linux CLI',
	'Postman',
	'Java',
].filter((tech) => tech in techIcons);

export const TechMarquee = () => {
	return (
		<section
			className="py-12 border-y border-border"
			aria-labelledby="tech-title"
		>
			<div className="mb-8 text-center">
				<h3
					id="tech-title"
					className="text-lg font-semibold text-primary"
				>
					Technologies I work with
				</h3>
			</div>
			<Marquee
				pauseOnHover={true}
				className="[--duration:50s]"
				speed="slow"
				aria-label="Scrolling technology icons"
			>
				{technologies.map((tech) => (
					<TechBadge key={tech} tech={tech} />
				))}
			</Marquee>
		</section>
	);
};

export const TechBadge = ({ tech }: { tech: string }) => {
	const techIcon = techIcons[tech];

	if (!techIcon) return null;

	return (
		<div
			className={`tech-badge-hover flex items-center justify-center px-6 py-3 mx-2 rounded-full border ${techIcon.borderColor} ${techIcon.bgColor} hover:scale-105 hover:shadow-md`}
		>
			<div className="flex items-center space-x-2">
				<Image
					src={techIcon.iconPath}
					alt={`${tech} icon`}
					width={20}
					height={20}
					className="object-contain"
					loading="lazy"
				/>
				<span className="text-sm font-medium whitespace-nowrap">
					{tech}
				</span>
			</div>
		</div>
	);
};
