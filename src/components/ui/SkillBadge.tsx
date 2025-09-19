'use client';

import React from 'react';
import Image from 'next/image';
import { techIcons } from '@/data/techIcons';

interface SkillBadgeProps {
	skill: string;
	variant?: 'primary' | 'secondary' | 'accent';
	size?: 'sm' | 'md' | 'lg';
}

export function SkillBadge({ skill, variant = 'primary', size = 'md' }: SkillBadgeProps) {
	// Check if this skill has a custom tech icon
	const techConfig = techIcons[skill];

	const variants = {
		primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
		secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300 border-gray-200 dark:border-gray-700',
		accent: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800',
	};

	const sizes = {
		sm: 'px-2 py-1 text-xs',
		md: 'px-3 py-1.5 text-sm',
		lg: 'px-4 py-2 text-base',
	};

	// Use custom styling for tech skills, fallback to variant styling
	const customStyling = techConfig
		? `${techConfig.bgColor} ${techConfig.borderColor} text-gray-800 dark:text-gray-200`
		: variants[variant];

	return (
		<span
			className={`
				inline-flex items-center gap-1.5 font-medium rounded-full border
				transition-all duration-200 hover:scale-105 hover:shadow-sm
				${customStyling}
				${sizes[size]}
			`}
		>
			{techConfig && (
				<span className='flex-shrink-0'>
					<Image
						src={techConfig.iconPath}
						alt={`${skill} icon`}
						width={16}
						height={16}
						className='w-4 h-4'
					/>
				</span>
			)}
			{skill}
		</span>
	);
}
