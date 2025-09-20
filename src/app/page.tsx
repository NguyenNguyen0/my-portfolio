import { AboutSection } from '@/components/sections/about-section';
import { ContactSection } from '@/components/sections/contact-section';
import { GitHubSection } from '@/components/sections/github-section';
import { HeroSection } from '@/components/sections/hero-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { TechMarquee } from '@/components/sections/tech-marquee';
import { GridBackground } from '@/components/ui/grid-background';
import { ResizableNavbar } from '@/components/ui/resizable-navbar';
import { Footer } from '@/components/sections/footer';

export default function Home() {
	return (
		<GridBackground className="min-h-screen">
			<ResizableNavbar />
			<main className="pt-16 px-4 md:px-8">
				<div id="hero">
					<HeroSection />
				</div>

				<TechMarquee />

				<div id="about" className="mt-16">
					<AboutSection />
				</div>

				<div id="projects" className="mt-16">
					<ProjectsSection />
				</div>

				<div id="github" className="mt-16">
					<GitHubSection />
				</div>

				<div id="contact" className="mt-16">
					<ContactSection />
				</div>

				<Footer />
			</main>
		</GridBackground>
	);
}
