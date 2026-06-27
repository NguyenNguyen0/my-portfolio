export interface Project {
	id: string;
	title: string;
	description: string;
	techStack: string[];
	image?: string;
	demoUrl?: string;
	githubUrl: string;
	gitlabUrl?: string;
	type: string[];
	period: string;
	role: string;
	team?: string;
}

export const projects: Project[] = [
	{
		id: 'nexatech',
		title: 'NexaTech E-Commerce Platform',
		description:
			'Distributed e-commerce platform with polyglot microservices, LangGraph-based multi-agent AI ecosystem, MCP Orchestrator, hybrid recommendation engine, and automated cloud deployment.',
		techStack: ['Java', 'Spring Cloud', 'FastAPI', 'Kafka', 'MongoDB', 'Redis', 'React', 'Next.js', 'LangGraph', 'Terraform', 'AWS'],
		githubUrl: 'https://gitlab.com/nguyennguyen0',
		gitlabUrl: 'https://gitlab.com/nguyennguyen0',
		type: ['Team', 'Fullstack', 'AI'],
		period: 'Mar 2026 – Jun 2026',
		role: 'Full-Stack Developer · AI Engineer · DevOps',
		team: 'Team of 4',
	},
	{
		id: 'chatly',
		title: 'Chatly Messaging Platform',
		description:
			'Real-time messaging platform with AI assistant (LangGraph + Qdrant + MCP), RAG workflows, cross-platform React web and React Native mobile, deployed on AWS EC2.',
		techStack: ['Spring Boot', 'FastAPI', 'LangGraph', 'Qdrant', 'MongoDB', 'PostgreSQL', 'Redis', 'React', 'React Native', 'AWS'],
		githubUrl: 'https://github.com/NguyenNguyen0',
		demoUrl: 'https://nguyennguyen0.id.vn',
		type: ['Team', 'Fullstack', 'AI'],
		period: 'Feb 2026 – May 2026',
		role: 'AI & Full-Stack Developer',
		team: 'Team of 4',
	},
	{
		id: 'aurora',
		title: 'Aurora Hotel Management System',
		description:
			'Hotel management system with AI-powered RAG chatbot (LangChain4j + Gemini + pgvector), TipTap-based content management, and full-stack deployment on Railway via Docker.',
		techStack: ['Spring Boot', 'LangChain4j', 'Gemini API', 'pgvector', 'React', 'PostgreSQL', 'Docker'],
		githubUrl: 'https://github.com/NguyenNguyen0',
		demoUrl: 'https://nguyennguyen0.id.vn',
		type: ['Team', 'Fullstack', 'AI'],
		period: 'Sep 2025 – Dec 2025',
		role: 'Full-Stack Developer · DevOps · AI Integration',
		team: 'Team of 4',
	},
	{
		id: 'portfolio-website',
		title: 'Personal Portfolio Website',
		description:
			'Responsive portfolio built with Next.js, TypeScript, and TailwindCSS. 95+ Lighthouse score, deployed on Vercel with GitHub CI/CD.',
		techStack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Vercel'],
		image: '/thumbnail.png',
		demoUrl: 'https://nguyennguyen0.id.vn',
		githubUrl: 'https://github.com/NguyenNguyen0/my-portfolio',
		type: ['Personal', 'Frontend'],
		period: 'Aug 2025 – Present',
		role: 'Frontend Developer',
	},
];

export const projectTypes = [
	'All',
	'Personal',
	'Team',
	'Frontend',
	'Backend',
	'Fullstack',
	'AI',
];
