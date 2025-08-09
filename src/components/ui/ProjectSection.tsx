'use client';

import React, { useState, useMemo } from 'react';
import { projects, projectTypes } from '@/data/projects';
import { ProjectCard } from './ProjectCard';

interface ProjectSectionProps {
	title?: string;
	description?: string;
	initialShowCount?: number;
}

export function ProjectSection({
	title = 'Featured Projects',
	description = 'A collection of my recent work and personal projects showcasing various technologies and skills.',
	initialShowCount = 3,
}: ProjectSectionProps) {
	const [selectedType, setSelectedType] = useState('All');
	const [showAll, setShowAll] = useState(false);

	// Filter projects based on selected type
	const filteredProjects = useMemo(() => {
		if (selectedType === 'All') {
			return projects;
		}
		return projects.filter(project => project.type.includes(selectedType));
	}, [selectedType]);

	// Determine how many projects to show
	const projectsToShow = showAll ? filteredProjects : filteredProjects.slice(0, initialShowCount);
	const hasMoreProjects = filteredProjects.length > initialShowCount;

	return (
		<section className='py-16 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<div className='text-center mb-12'>
					<h2 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
						{title}
					</h2>
					<p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed'>
						{description}
					</p>
				</div>

				{/* Filter Buttons */}
				<div className='flex flex-wrap justify-center gap-2 mb-12'>
					{projectTypes.map(type => (
						<button
							key={type}
							onClick={() => {
								setSelectedType(type);
								setShowAll(false); // Reset show all when changing filter
							}}
							className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
								selectedType === type
									? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
									: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
							}`}
						>
							{type}
							{type !== 'All' && (
								<span className='ml-2 text-xs opacity-75'>
									(
									{
										projects.filter(p =>
											p.type.includes(type)
										).length
									}
									)
								</span>
							)}
						</button>
					))}
				</div>

				{/* Projects Grid */}
				{projectsToShow.length > 0 ? (
					<>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
							{projectsToShow.map(project => (
								<ProjectCard key={project.id} project={project} />
							))}
						</div>

						{/* Show More/Less Button */}
						{hasMoreProjects && (
							<div className='text-center'>
								<button
									onClick={() => setShowAll(!showAll)}
									className='inline-flex items-center px-6 py-3 text-base font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-colors duration-200 border border-blue-200 dark:border-blue-800'
								>
									{showAll ? (
										<>
											<svg
												className='w-5 h-5 mr-2'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M5 15l7-7 7 7'
												/>
											</svg>
											Show Less
										</>
									) : (
										<>
											<svg
												className='w-5 h-5 mr-2'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M19 9l-7 7-7-7'
												/>
											</svg>
											Show More Projects (
											{filteredProjects.length -
												initialShowCount}{' '}
											more)
										</>
									)}
								</button>
							</div>
						)}
					</>
				) : (
					/* No Projects Found */
					<div className='text-center py-12'>
						<div className='w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center'>
							<svg
								className='w-12 h-12 text-gray-400 dark:text-gray-500'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
								/>
							</svg>
						</div>
						<h3 className='text-xl font-medium text-gray-900 dark:text-white mb-2'>
							No projects found
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							No projects match the selected filter. Try selecting a different
							category.
						</p>
					</div>
				)}
			</div>
		</section>
	);
}
