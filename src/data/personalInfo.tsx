import {
	MapPin,
	MessageSquare,
	GraduationCap,
	BookOpen,
	Lightbulb,
} from 'lucide-react';

export const personalInfo = [
	{
		icon: <MapPin className="text-xl" />,
		label: 'Location',
		value: 'Ho Chi Minh City',
	},
	{
		icon: <MessageSquare className="text-xl" />,
		label: 'Foreign language',
		value: 'Good English communication, reading and understanding technical documents',
	},
	{
		icon: <GraduationCap className="text-xl" />,
		label: 'Education',
		value: 'Self-study + online courses',
	},
	{
		icon: <BookOpen className="text-xl" />,
		label: 'Favorite topics',
		value: 'API Design, AI and UI/UX',
	},
	{
		icon: <Lightbulb className="text-xl" />,
		label: 'Goal',
		value: 'Become a Fullstack Developer with beautiful design thinking & strong technical skills',
	},
];

export const technicalSkills = [
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

export const softSkills = [
	{
		title: 'Communication & Learning',
		skills: [
			'English reading & communication',
			'Self-learning & documentation',
		],
		variant: 'primary' as const,
	},
];
