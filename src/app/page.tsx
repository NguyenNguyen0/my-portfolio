import { HeroSection } from '@/components/ui/HeroSection';
import { AboutMe } from '@/components/ui/AboutMe';

export default function Home() {
	return (
		<div className='min-h-screen transition-colors'>
			<HeroSection />
			<AboutMe />
		</div>
	);
}
