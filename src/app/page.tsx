import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { GitHubSection } from "@/components/sections/github-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ResizableNavbar } from "@/components/ui/resizable-navbar";

export default function Home() {
	return (
		<AuroraBackground className="min-h-screen">
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

				<footer className="border-t border-border/50 py-12 mt-16 backdrop-blur-sm">
					<div className="max-w-7xl mx-auto text-center">
						<p className="text-muted-foreground">
						© 2025 John Developer. Built with Next.js, Tailwind CSS, and Framer Motion.
						</p>
						<div className="flex justify-center gap-6 mt-4">
						<a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
							About
						</a>
						<a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
							Projects
						</a>
						<a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
							Contact
						</a>
						</div>
					</div>
				</footer>
			</main>
		</AuroraBackground>
	);
}
