import { HeroSection } from '@/components/ui/HeroSection';
import { AboutMe } from '@/components/ui/AboutMe';
import { ProjectSection } from '@/components/ui/ProjectSection';
import { Contact } from '@/components/ui/Contact';

export default function Home() {
	return (
		<div className='min-h-screen transition-colors'>
			<HeroSection />
			<AboutMe />
			<ProjectSection />
			<Contact />
		</div>
	);
}
