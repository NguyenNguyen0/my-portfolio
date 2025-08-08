'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { StarryBackground } from './StarryBackground';
import { PetalFallBackground } from './PetalFallBackground';
import { FallbackBackground } from './FallbackBackground';

interface SmartBackgroundProps {
	children: React.ReactNode;
}

export function SmartBackground({ children }: SmartBackgroundProps) {
	const [mounted, setMounted] = useState(false);
	const [hasError, setHasError] = useState(false);
	const { theme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	// Error boundary for background components
	useEffect(() => {
		const handleError = () => {
			setHasError(true);
		};

		window.addEventListener('error', handleError);
		return () => window.removeEventListener('error', handleError);
	}, []);

	// Show fallback during SSR or if there's an error
	if (!mounted || hasError) {
		return <FallbackBackground>{children}</FallbackBackground>;
	}

	// Render appropriate background based on theme
	try {
		if (theme === 'dark') {
			return <StarryBackground>{children}</StarryBackground>;
		} else {
			return <PetalFallBackground>{children}</PetalFallBackground>;
		}
	} catch (error) {
		console.warn('Background component failed, using fallback:', error);
		return <FallbackBackground>{children}</FallbackBackground>;
	}
}
