'use client';

import Image from 'next/image';

interface AvatarProps {
	src?: string;
	alt: string;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	className?: string;
}

export function Avatar({ src, alt, size = 'md', className = '' }: AvatarProps) {
	const sizes = {
		sm: 'w-16 h-16',
		md: 'w-24 h-24',
		lg: 'w-32 h-32',
		xl: 'w-40 h-40',
	};

	const initials = alt
		.split(' ')
		.map(name => name[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);

	return (
		<div
			className={`
				${sizes[size]}
				rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600
				flex items-center justify-center text-white font-bold
				shadow-lg border-4 border-white dark:border-gray-800
				transition-all duration-300 hover:scale-105 hover:shadow-xl
				${className}
			`}
		>
			{src ? (
				<Image
					src={src}
					alt={alt}
					width={160}
					height={160}
					className='w-full h-full object-cover'
					priority={size === 'xl'}
				/>
			) : (
				<span className={size === 'sm' ? 'text-lg' : 'text-2xl'}>{initials}</span>
			)}
		</div>
	);
}
