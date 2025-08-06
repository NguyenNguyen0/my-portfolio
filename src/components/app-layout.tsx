'use client';

import { SmartBackground } from './layouts';

interface AppLayoutProps {
	children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
	return (
		<SmartBackground>
			<div className='min-h-screen'>
				{/* Your app content goes here */}
				{children}
			</div>
		</SmartBackground>
	);
}
