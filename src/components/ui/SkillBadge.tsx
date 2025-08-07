'use client';

import React from 'react';
import Image from 'next/image';

// Tech icons mapping to public/icons/ directory with their brand colors
const techIcons: Record<string, { iconPath: string; color: string; bgColor: string; borderColor: string }> = {
	HTML: {
		iconPath: '/icons/html-icon.svg',
		color: '#E34F26',
		bgColor: 'bg-orange-50 dark:bg-orange-900/20',
		borderColor: 'border-orange-200 dark:border-orange-800',
	},
	CSS: {
		iconPath: '/icons/css-icon.svg',
		color: '#1572B6',
		bgColor: 'bg-blue-50 dark:bg-blue-900/20',
		borderColor: 'border-blue-200 dark:border-blue-800',
	},
	JavaScript: {
		iconPath: '/icons/js-icon.svg',
		color: '#F7DF1E',
		bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
		borderColor: 'border-yellow-200 dark:border-yellow-800',
	},
	TypeScript: {
		iconPath: '/icons/TypeScript.svg',
		color: '#3178C6',
		bgColor: 'bg-blue-50 dark:bg-blue-900/20',
		borderColor: 'border-blue-200 dark:border-blue-800',
	},
	Java: {
		iconPath: '/icons/Java.svg',
		color: '#ED8B00',
		bgColor: 'bg-orange-50 dark:bg-orange-900/20',
		borderColor: 'border-orange-200 dark:border-orange-800',
	},
	Python: {
		iconPath: '/icons/Python-icon.svg',
		color: '#3776AB',
		bgColor: 'bg-blue-50 dark:bg-blue-900/20',
		borderColor: 'border-blue-200 dark:border-blue-800',
	},
	React: {
		iconPath: '/icons/react-icon.svg',
		color: '#61DAFB',
		bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
		borderColor: 'border-cyan-200 dark:border-cyan-800',
	},
	'Next.js': {
		iconPath: '/icons/nextjs-icon.svg',
		color: '#000000',
		bgColor: 'bg-gray-50 dark:bg-gray-800/50',
		borderColor: 'border-gray-200 dark:border-gray-700',
	},
	'Tailwind CSS': {
		iconPath: '/icons/tailwind-icon.svg',
		color: '#06B6D4',
		bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
		borderColor: 'border-cyan-200 dark:border-cyan-800',
	},
	'Node.js': {
		iconPath: '/icons/nodejs-icon.svg',
		color: '#339933',
		bgColor: 'bg-green-50 dark:bg-green-900/20',
		borderColor: 'border-green-200 dark:border-green-800',
	},
	Express: {
		iconPath: '/icons/express-js-icon.svg',
		color: '#000000',
		bgColor: 'bg-gray-50 dark:bg-gray-800/50',
		borderColor: 'border-gray-200 dark:border-gray-700',
	},
	FastAPI: {
		iconPath: '/icons/FastAPI-icon.svg',
		color: '#009688',
		bgColor: 'bg-teal-50 dark:bg-teal-900/20',
		borderColor: 'border-teal-200 dark:border-teal-800',
	},
	Flask: {
		iconPath: '/icons/Flask-icon.svg',
		color: '#000000',
		bgColor: 'bg-gray-50 dark:bg-gray-800/50',
		borderColor: 'border-gray-200 dark:border-gray-700',
	},
	MongoDB: {
		iconPath: '/icons/MongoDB-icon.svg',
		color: '#4DB33D',
		bgColor: 'bg-green-50 dark:bg-green-900/20',
		borderColor: 'border-green-200 dark:border-green-800',
	},
	PostgreSQL: {
		iconPath: '/icons/postgresql-icon.svg',
		color: '#336791',
		bgColor: 'bg-blue-50 dark:bg-blue-900/20',
		borderColor: 'border-blue-200 dark:border-blue-800',
	},
	Redis: {
		iconPath: '/icons/Redis-icon.svg',
		color: '#DC382D',
		bgColor: 'bg-red-50 dark:bg-red-900/20',
		borderColor: 'border-red-200 dark:border-red-800',
	},
	'Microsoft SQL Server': {
		iconPath: '/icons/Microsoft SQL Server.svg',
		color: '#CC2927',
		bgColor: 'bg-red-50 dark:bg-red-900/20',
		borderColor: 'border-red-200 dark:border-red-800',
	},
	Git: {
		iconPath: '/icons/Git.svg',
		color: '#F05032',
		bgColor: 'bg-orange-50 dark:bg-orange-900/20',
		borderColor: 'border-orange-200 dark:border-orange-800',
	},
	Docker: {
		iconPath: '/icons/Docker.svg',
		color: '#2496ED',
		bgColor: 'bg-blue-50 dark:bg-blue-900/20',
		borderColor: 'border-blue-200 dark:border-blue-800',
	},
	Postman: {
		iconPath: '/icons/Postman.svg',
		color: '#FF6C37',
		bgColor: 'bg-orange-50 dark:bg-orange-900/20',
		borderColor: 'border-orange-200 dark:border-orange-800',
	},
	Vercel: {
		iconPath: '/icons/Vercel.svg',
		color: '#000000',
		bgColor: 'bg-gray-50 dark:bg-gray-800/50',
		borderColor: 'border-gray-200 dark:border-gray-700',
	},
	'Linux CLI': {
		iconPath: '/icons/linux.svg',
		color: '#000000',
		bgColor: 'bg-gray-50 dark:bg-gray-800/50',
		borderColor: 'border-gray-200 dark:border-gray-700',
	},
};

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
