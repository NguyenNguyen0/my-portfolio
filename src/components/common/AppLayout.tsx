'use client';

import { SmartBackground } from '@/components/backgrounds';
import { Header } from '@/components/navigation';

interface AppLayoutProps {
	children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
	return (
		<SmartBackground>
			<div className='min-h-screen'>
				<Header />
				<main className='pt-20'>{children}</main>
			</div>
		</SmartBackground>
	);
}
