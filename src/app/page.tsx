import { HeroSection } from '@/components/ui/HeroSection';
import { AboutMe } from '@/components/ui/AboutMe';
import { Contact } from '@/components/ui/Contact';

export default function Home() {
	return (
		<div className='min-h-screen transition-colors'>
			<HeroSection />
			<AboutMe />
			<Contact />
		</div>
	);
}
