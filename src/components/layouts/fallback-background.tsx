'use client';

interface FallbackBackgroundProps {
	children: React.ReactNode;
}

export function FallbackBackground({ children }: FallbackBackgroundProps) {
	return (
		<div className='relative h-full w-full transition-colors bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-black'>
			{/* Subtle pattern overlay */}
			<div
				className='absolute inset-0 opacity-10'
				style={{
					backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
					backgroundSize: '20px 20px',
				}}
			/>

			{/* Content */}
			<div className='relative z-10'>{children}</div>
		</div>
	);
}
