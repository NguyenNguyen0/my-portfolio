import { AboutSection } from '@/components/sections/about-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { StorySection } from '@/components/sections/story-section';
import { TechMarquee } from '@/components/sections/tech-marquee';
import { GridBackground } from '@/components/ui/grid-background';
import { ResizableNavbar } from '@/components/ui/resizable-navbar';
import { PelletDivider } from '@/components/ui/pellet-divider';
import { ChatWidget } from '@/components/ui/chat-widget';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Nguyễn Trung Nguyên — Full-Stack Developer Portfolio',
	description:
		'Full-Stack Developer specializing in distributed systems, AI-powered applications, and cloud-native deployments. Based in Ho Chi Minh City.',
	keywords: [
		'Backend Developer', 'Full Stack', 'Node.js', 'TypeScript',
		'React', 'Next.js', 'FastAPI', 'Portfolio', 'Ho Chi Minh City',
	],
};

export default function Home() {
	return (
		<GridBackground>
			<ResizableNavbar />

			<main className="pt-16">
				<div id="hero">
					<HeroSection />
				</div>

				<PelletDivider />

				<TechMarquee />

				<PelletDivider />

				<div id="about">
					<AboutSection />
				</div>

				<PelletDivider />

				<div id="story">
					<StorySection />
				</div>

				<PelletDivider />

				<div id="projects-section">
					<ProjectsSection />
				</div>

				<PelletDivider />

				<div id="contact-section">
					<ContactSection />
				</div>

				<Footer />
			</main>

			<ChatWidget />
		</GridBackground>
	);
}
