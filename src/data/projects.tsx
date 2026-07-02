export interface Project {
	id: string;
	title: string;
	description: string;
	techStack: string[];
	image?: string;
	images?: string[];
	demoUrl?: string;
	githubUrl?: string;
	gitlabUrl?: string;
	type: string[];
	period: string;
	role: string;
	responsibilities: string[];
	team?: string;
}

export const projects: Project[] = [
	{
		id: 'nexatech',
		title: 'NexaTech E-Commerce Platform',
		description:
			'Distributed e-commerce platform with polyglot microservices, LangGraph-based multi-agent AI ecosystem, MCP Orchestrator, hybrid recommendation engine, and automated cloud deployment.',
		techStack: [
			'Java',
			'Spring Cloud',
			'FastAPI',
			'Kafka',
			'MongoDB',
			'Redis',
			'React',
			'Next.js',
			'LangGraph',
			'Terraform',
			'AWS',
		],
		gitlabUrl: 'https://gitlab.com/software-architecture264301',
		images: [
			'/nexatech/nexatech1.png',
			'/nexatech/nexatech2.png',
			'/nexatech/nexatech3.png',
			'/nexatech/nexatech4.png',
			'/nexatech/nexatech5.png',
			'/nexatech/nexatech6.png',
		],
		type: ['Team', 'Fullstack', 'AI'],
		period: 'Mar 2026 – Jun 2026',
		role: 'Full-Stack Developer · AI Engineer · DevOps',
		responsibilities: [
			'Owned the Product domain (catalog, category, brand, review, wishlist) using CQRS, MongoDB, and Redis',
			'Designed a distributed system combining Event-Driven, Space-Based, and Pipeline Architectures across 10+ microservices',
			"Built the platform's AI layer: LangGraph multi-agent system, MCP Orchestrator, and domain-specific MCP servers",
			'Built a real-time user-behavior pipeline with Kafka and Redis feeding a FastAPI/MongoDB recommendation service',
			'Automated infrastructure and deployment via GitLab CI/CD, Terraform, Ansible, and AWS EC2',
		],
		team: 'Team of 4',
	},
	{
		id: 'chatly',
		title: 'Chatly Messaging Platform',
		description:
			'Real-time messaging platform with AI assistant (LangGraph + Qdrant + MCP), RAG workflows, cross-platform React web and React Native mobile, deployed on AWS EC2.',
		techStack: [
			'Spring Boot',
			'FastAPI',
			'LangGraph',
			'Qdrant',
			'MongoDB',
			'PostgreSQL',
			'Redis',
			'React',
			'React Native',
			'AWS',
		],
		githubUrl: 'https://github.com/giasinguyen/chatly-messaging-platform',
		demoUrl: 'https://www.chatly.io.vn/',
		images: [
			'/chatly/chatly1.png',
			'/chatly/chatly2.png',
			'/chatly/chatly3.png',
		],
		type: ['Team', 'Fullstack', 'AI'],
		period: 'Feb 2026 – May 2026',
		role: 'AI & Full-Stack Developer',
		responsibilities: [
			'Built an AI assistant with LangGraph, Groq LLM, Qdrant, and MCP — mentions, summarization, reminders, polls, Q&A',
			'Implemented RAG workflows with FastAPI: session persistence, streaming responses, contextual retrieval over Qdrant',
			'Developed real-time messaging with WebSocket (JWT auth, group chat, GIFs, stickers, voice messages)',
			'Delivered cross-platform parity across React web and React Native mobile',
			'Set up CI/CD with GitHub Actions and Docker Compose, with LangSmith tracing and EAS Build for Android',
		],
		team: 'Team of 4',
	},
	{
		id: 'aurora',
		title: 'Aurora Hotel Management System',
		description:
			'Hotel management system with AI-powered RAG chatbot (LangChain4j + Gemini + pgvector), TipTap-based content management, and full-stack deployment on Railway via Docker.',
		techStack: [
			'Spring Boot',
			'LangChain4j',
			'Gemini API',
			'pgvector',
			'React',
			'PostgreSQL',
			'Docker',
		],
		githubUrl:
			'https://github.com/giasinguyen/aurora-hotel-management-system',
		demoUrl: 'https://www.aurorahotel.io.vn/',
		images: ['/aurora/aurora1.png', '/aurora/aurora2.png'],
		type: ['Team', 'Fullstack', 'AI'],
		period: 'Sep 2025 – Dec 2025',
		role: 'Full-Stack Developer · DevOps · AI Integration',
		responsibilities: [
			'Built a RAG chatbot with LangChain4j, Gemini API, and pgvector, streaming answers over WebSocket',
			"Developed a Document Management module feeding the chatbot's RAG knowledge base",
			'Built a News Management module with a TipTap rich-text editor, decoupled from the RAG pipeline',
			'Deployed the full stack to Railway using Docker multi-stage builds',
		],
		team: 'Team of 4',
	},
	{
		id: 'portfolio-website',
		title: 'Personal Portfolio Website',
		description:
			'Responsive portfolio built with Next.js, TypeScript, and TailwindCSS. 95+ Lighthouse score, deployed on Vercel with GitHub CI/CD.',
		techStack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Vercel'],
		images: ['/portfolio/portfolio.png'],
		demoUrl: 'https://nguyennguyen0.id.vn',
		githubUrl: 'https://github.com/NguyenNguyen0/my-portfolio',
		type: ['Personal', 'Frontend'],
		period: 'Aug 2025 – Present',
		role: 'Frontend Developer',
		responsibilities: [
			'Designed a retro/pixel-art UI system with a Pac-Man-inspired visual language',
			'Integrated an AI Q&A assistant (Groq via Vercel AI SDK v7) with AG-UI-style tool calling',
			'Wired up the contact form (Nodemailer/Gmail), Vercel Speed Insights, and Framer Motion animations',
			'Reached 95+ Lighthouse scores; deployed to Vercel with automated GitHub CI/CD',
		],
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
