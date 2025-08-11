'use client';

import { Avatar } from './Avatar';
import { PersonalInfoCard } from './PersonalInfoCard';
import { SkillsSection } from './SkillsSection';
import { Quote } from './Quote';
import { GiMountainClimbing } from 'react-icons/gi';
import { FaUserTie, FaLaptopCode, FaHandPeace } from 'react-icons/fa';
import {
	HiLocationMarker,
	HiChat,
	HiAcademicCap,
	HiBookOpen,
	HiLightBulb,
	HiCode,
	HiBookmark,
	HiLightningBolt,
} from 'react-icons/hi';
import { RiRocketLine } from 'react-icons/ri';

const personalInfo = [
	{
		icon: <HiLocationMarker className='text-xl' />,
		label: 'Location',
		value: 'Ho Chi Minh City',
	},
	{
		icon: <HiChat className='text-xl' />,
		label: 'Foreign language',
		value: 'Good English communication, reading and understanding technical documents',
	},
	{
		icon: <HiAcademicCap className='text-xl' />,
		label: 'Education',
		value: 'Self-study + online courses',
	},
	{
		icon: <HiBookOpen className='text-xl' />,
		label: 'Favorite topics',
		value: 'API Design, AI and UI/UX',
	},
	{
		icon: <HiLightBulb className='text-xl' />,
		label: 'Goal',
		value: 'Become a Fullstack Developer with beautiful design thinking & strong technical skills',
	},
];

const technicalSkills = [
	{
		title: 'Programing languages',
		skills: ['JavaScript', 'TypeScript', 'Java', 'Python'],
		variant: 'primary' as const,
	},
	{
		title: 'Frontend',
		skills: ['HTML', 'CSS', 'React', 'Next.js', 'Tailwind CSS'],
		variant: 'primary' as const,
	},
	{
		title: 'Backend',
		skills: [
			'Node.js',
			'Express',
			'RESTful APIs',
			'FastAPI',
			'Flask',
			'MongoDB',
			'PostgreSQL',
			'Redis',
			'Microsoft SQL Server',
		],
		variant: 'secondary' as const,
	},
	{
		title: 'Tools & Others',
		skills: ['Git', 'Docker', 'Postman', 'Vercel', 'Linux CLI'],
		variant: 'accent' as const,
	},
];

const softSkills = [
	{
		title: 'Communication & Learning',
		skills: ['English reading & communication', 'Self-learning & documentation'],
		variant: 'primary' as const,
	},
];

export function AboutMe() {
	return (
		<section
			id='about'
			className='py-20 bg-gradient-to-b from-white/40 to-gray-50/40 dark:from-gray-900/70 dark:to-gray-800/70'
		>
			<div className='container mx-auto px-4 max-w-6xl'>
				{/* Header */}
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
						About Me
					</h2>
					<div className='w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full'></div>
				</div>

				{/* Personal Avatar & Introduction */}
				<div className='grid lg:grid-cols-2 gap-12 mb-16'>
					{/* Avatar Section */}
					<div className='flex flex-col items-center text-center space-y-6'>
						<Avatar
							src='/avatar.jpg'
							alt='Nguyên - Personal Avatar'
							size='3xl'
							className='mb-4'
						/>
						<div className='space-y-4'>
							<h3 className='text-2xl font-semibold text-gray-900 dark:text-white'>
								Hi, I&apos;m Nguyên. A passionate developer!
							</h3>
							<p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
								I craft functional, beautiful web apps — solving
								real-world problems with clean code and creative UX.
							</p>
						</div>
					</div>

					{/* Detailed Introduction */}
					<div className='space-y-6'>
						<h3 className='text-2xl font-semibold text-gray-900 dark:text-white flex items-center'>
							<GiMountainClimbing className='mr-2 text-fuchsia-500' />
							My Journey
						</h3>
						<div className='space-y-4'>
							{/* Timeline list */}
							<div className='space-y-3'>
								<div className='flex items-start space-x-3 text-gray-600 dark:text-gray-300'>
									<HiCode className='text-xl mt-1 flex-shrink-0' />
									<p className='leading-relaxed'>
										Self-taught developer driven by
										curiosity
									</p>
								</div>
								<div className='flex items-start space-x-3 text-gray-600 dark:text-gray-300'>
									<HiBookmark className='text-xl mt-1 flex-shrink-0' />
									<p className='leading-relaxed'>
										Learned through building real projects
										&amp; online courses
									</p>
								</div>
								<div className='flex items-start space-x-3 text-gray-600 dark:text-gray-300'>
									<HiLightningBolt className='text-xl mt-1 flex-shrink-0' />
									<p className='leading-relaxed'>
										Passion for full-stack with maintainable
										code &amp; intuitive UIs
									</p>
								</div>
								<div className='flex items-start space-x-3 text-gray-600 dark:text-gray-300'>
									<RiRocketLine className='text-xl mt-1 flex-shrink-0' />
									<p className='leading-relaxed'>
										Exploring modern tech, design
										principles, and open-source
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Personal Information Grid */}
				<div className='mb-16'>
					<h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center flex items-center'>
						<FaUserTie className='mr-2 text-cyan-600' />
						Personal Information
					</h3>
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{personalInfo.map((info, index) => (
							<PersonalInfoCard
								key={index}
								icon={info.icon}
								label={info.label}
								value={info.value}
							/>
						))}
					</div>
				</div>
				<hr className='mb-18 border-2 border-dashed border-gray-700/40 dark:border-gray-200/40' />
				{/* Skills Section */}
				<div className='grid lg:grid-cols-2 gap-12 mb-16'>
					{/* Technical Skills */}
					<div>
						<SkillsSection
							title={
								<h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center'>
									<FaLaptopCode className='mr-2 text-green-600' />
									Technical Skills
								</h3>
							}
							skillGroups={technicalSkills}
						/>
					</div>

					{/* Soft Skills */}
					<div>
						<SkillsSection
							title={
								<h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center'>
									<FaHandPeace className='mr-2 text-yellow-400' />
									Soft Skills
								</h3>
							}
							skillGroups={softSkills}
						/>
					</div>
				</div>

				{/* Quote and CTA */}
				<div className='max-w-4xl mx-auto'>
					<Quote
						quote='I believe that great software should not only work well, but also feels delightful to use.'
						ctaText='Get In Touch'
					/>
				</div>
			</div>
		</section>
	);
}
