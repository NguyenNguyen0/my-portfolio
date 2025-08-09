'use client';

import React from 'react';
import Image from 'next/image';
import { Project } from '@/data/projects';
import { SkillBadge } from './SkillBadge';

interface ProjectCardProps {
	project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
	const hasImage = project.image;

	return (
		<div className='group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700'>
			{/* Project Image */}
			{hasImage ? (
				<div className='relative h-48 w-full overflow-hidden'>
					<Image
						src={project.image!}
						alt={`${project.title} preview`}
						fill
						className='object-cover group-hover:scale-105 transition-transform duration-300'
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
				</div>
			) : (
				<div className='h-48 w-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center'>
					<div className='text-center'>
						<div className='w-16 h-16 mx-auto mb-3 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center'>
							<svg
								className='w-8 h-8 text-blue-600 dark:text-blue-400'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
								/>
							</svg>
						</div>
						<p className='text-sm text-gray-600 dark:text-gray-400 font-medium'>
							Code Project
						</p>
					</div>
				</div>
			)}

			{/* Project Content */}
			<div className='p-6'>
				{/* Title */}
				<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200'>
					{project.title}
				</h3>

				{/* Description */}
				<p className='text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3'>
					{project.description}
				</p>

				{/* Tech Stack */}
				<div className='mb-6'>
					<h4 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
						Tech Stack
					</h4>
					<div className='flex flex-wrap gap-2'>
						{project.techStack.map((tech, index) => (
							<SkillBadge key={index} skill={tech} size='sm' />
						))}
					</div>
				</div>

				{/* Action Buttons */}
				<div className='flex gap-3'>
					{/* GitHub Button */}
					<a
						href={project.githubUrl}
						target='_blank'
						rel='noopener noreferrer'
						className='flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 border border-gray-200 dark:border-gray-600'
					>
						<svg className='w-4 h-4 mr-2' fill='currentColor' viewBox='0 0 24 24'>
							<path
								fillRule='evenodd'
								d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
								clipRule='evenodd'
							/>
						</svg>
						Code
					</a>

					{/* Demo Button */}
					{project.demoUrl && (
						<a
							href={project.demoUrl}
							target='_blank'
							rel='noopener noreferrer'
							className='flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-lg transition-colors duration-200'
						>
							<svg
								className='w-4 h-4 mr-2'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
								/>
							</svg>
							Demo
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
