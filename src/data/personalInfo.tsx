import {
	MapPin,
	MessageSquare,
	GraduationCap,
	BookOpen,
	Lightbulb,
	Award,
} from 'lucide-react';

export const personalInfo = [
	{
		icon: <MapPin className="text-xl" />,
		label: 'Location',
		value: 'Go Vap, Ho Chi Minh City',
	},
	{
		icon: <MessageSquare className="text-xl" />,
		label: 'Foreign language',
		value: 'TOEIC Listening & Reading 625 — comfortable reading and discussing technical documentation in English',
	},
	{
		icon: <GraduationCap className="text-xl" />,
		label: 'Education',
		value: 'Software Engineering @ Industrial University of Ho Chi Minh City (IUH), 2022–Present · GPA 3.2/4.0',
	},
	{
		icon: <BookOpen className="text-xl" />,
		label: 'Favorite topics',
		value: 'API Design, AI and UI/UX',
	},
	{
		icon: <Lightbulb className="text-xl" />,
		label: 'Goal',
		value: 'Contribute to scalable products as a Backend/Full-Stack Engineer while deepening expertise in software architecture and LLM integration',
	},
	{
		icon: <Award className="text-xl" />,
		label: 'Certification',
		value: 'CS50: Introduction to Computer Science — Harvard University (edX), Dec 2023',
	},
];

export const technicalSkills = [
	{
		title: 'Languages',
		skills: ['Java', 'Python', 'TypeScript'],
		variant: 'primary' as const,
	},
	{
		title: 'Frontend',
		skills: ['React', 'React Native (Expo)', 'Tailwind CSS'],
		variant: 'primary' as const,
	},
	{
		title: 'Backend',
		skills: [
			'Spring Boot',
			'FastAPI',
			'NestJS',
			'Node.js',
			'WebSocket',
			'REST APIs',
		],
		variant: 'secondary' as const,
	},
	{
		title: 'Databases',
		skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Qdrant', 'pgvector'],
		variant: 'secondary' as const,
	},
	{
		title: 'AI & LLM',
		skills: [
			'LangGraph',
			'MCP',
			'RAG',
			'Gemini API',
			'Groq',
			'LangChain4j',
			'AG-UI',
			'Vercel AI SDK',
		],
		variant: 'accent' as const,
	},
	{
		title: 'Cloud & DevOps',
		skills: [
			'Docker',
			'GitHub Actions',
			'GitLab CI/CD',
			'Terraform',
			'Ansible',
			'AWS',
			'Vercel',
		],
		variant: 'accent' as const,
	},
	{
		title: 'Tools',
		skills: ['Git', 'Postman', 'LangSmith'],
		variant: 'primary' as const,
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
