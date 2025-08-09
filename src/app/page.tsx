import { HeroSection } from '@/components/ui/HeroSection';
import { AboutMe } from '@/components/ui/AboutMe';
import { ProjectSection } from '@/components/ui/ProjectSection';
import { GitHubStats } from '@/components/ui/GitHubStats';
import { Contact } from '@/components/ui/Contact';

export default function Home() {
	return (
		<div className='min-h-screen transition-colors'>
			<HeroSection />
			<AboutMe />
			<ProjectSection />
			<GitHubStats />
			<Contact />
		</div>
	);
}
