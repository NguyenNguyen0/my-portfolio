'use client';
import { Marquee } from '@/components/ui/marquee';

const technologies = [
	'React',
	'Next.js',
	'TypeScript',
	'Node.js',
	'Python',
	'PostgreSQL',
	'MongoDB',
	'Tailwind CSS',
	'Framer Motion',
	'Docker',
	'AWS',
	'Vercel',
	'Git',
	'Figma',
];

export const TechMarquee = () => {
	return (
		<section className="py-12 border-y border-border">
			<div className="mb-8 text-center">
				<h3 className="text-lg font-semibold text-muted-foreground">
					Technologies I work with
				</h3>
			</div>
			<Marquee pauseOnHover className="[--duration:30s]">
				{technologies.map((tech) => (
					<div
						key={tech}
						className="flex items-center justify-center px-6 py-3 bg-secondary/50 rounded-full mx-2"
					>
						<span className="text-sm font-medium whitespace-nowrap">
							{tech}
						</span>
					</div>
				))}
			</Marquee>
		</section>
	);
};
