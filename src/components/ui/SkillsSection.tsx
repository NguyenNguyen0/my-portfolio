'use client';

import { ReactElement } from 'react';
import { SkillBadge } from './SkillBadge';

interface SkillGroup {
	title: string;
	skills: string[];
	variant?: 'primary' | 'secondary' | 'accent';
}

interface SkillsSectionProps {
	title: string | ReactElement;
	skillGroups: SkillGroup[];
}

export function SkillsSection({ title, skillGroups }: SkillsSectionProps) {
	return (
		<div className='space-y-6'>
			{typeof title === 'string' ? (
				<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>{title}</h3>
			) : (
				title
			)}
			<div className='space-y-6'>
				{skillGroups.map((group, index) => (
					<div key={index} className='space-y-3'>
						<h4 className='text-lg font-medium text-gray-800 dark:text-gray-200'>
							{group.title}
						</h4>
						<div className='flex flex-wrap gap-2'>
							{group.skills.map((skill, skillIndex) => (
								<SkillBadge
									key={skillIndex}
									skill={skill}
									variant={group.variant || 'primary'}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
