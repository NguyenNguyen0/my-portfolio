'use client';

import { ReactNode } from 'react';

interface PersonalInfoCardProps {
	icon: string | ReactNode;
	label: string;
	value: string;
}

export function PersonalInfoCard({ icon, label, value }: PersonalInfoCardProps) {
	return (
		<div className='group flex items-start space-x-3 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-blue-300 dark:hover:border-blue-700'>
			<div className='flex-shrink-0 text-2xl' role='img' aria-label={label}>
				{icon}
			</div>
			<div className='flex-1 min-w-0'>
				<dt className='text-sm font-medium text-gray-600 dark:text-gray-400'>{label}</dt>
				<dd className='mt-1 text-sm text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300'>
					{value}
				</dd>
			</div>
		</div>
	);
}
