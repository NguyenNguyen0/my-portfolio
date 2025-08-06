'use client';

import { SmartBackground, Header } from './layouts';

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
