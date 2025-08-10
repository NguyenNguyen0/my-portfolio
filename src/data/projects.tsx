export interface Project {
	id: string;
	title: string;
	description: string;
	techStack: string[];
	image?: string;
	demoUrl?: string;
	githubUrl: string;
	type: string[];
}

export const projects: Project[] = [
	{
		id: 'backend-chatbot-api',
		title: 'Backend Chatbot API',
		description: 'A RESTful API and Websocket Chatbot Backend using Ollama, FastAPI and MongoDB.',
		techStack: ['Ollama', 'FastAPI', 'MongoDB', 'Websocket'],
		githubUrl: 'https://github.com/NguyenNguyen0/chatbot-be',
		type: ['Personal', 'Backend'],
	},
	{
		id: 'portfolio-website',
		title: 'My Portfolio website',
		description:
			'A modern, responsive portfolio website built with Next.js and TailwindCSS. Features dark/light mode, smooth animations, and dynamic backgrounds.',
		techStack: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Vercel'],
		image: '/projects/portfolio.png',
		demoUrl: 'https://my-portfolio-demo.vercel.app',
		githubUrl: 'https://github.com/NguyenNguyen0/my-portfolio',
		type: ['Personal', 'Frontend'],
	},
	{
		id: 'frontend-chatbot',
		title: 'Frontend Chatbot Website',
		description:
			'A Modern UI website built with React, TailwindCSS and state management with Redux Toolkit.',
		techStack: ['React', 'Tailwind CSS', 'Redux Toolkit'],
		image: '/projects/N.aidemo2.gif',
		githubUrl: 'https://github.com/NguyenNguyen0/chatbot-be',
		type: ['Personal', 'Frontend'],
	},
	{
		id: 'cli-app',
		title: 'Calculating Bills CLI App',
		description: 'Modern CLI app for calculating Electricity & Water bills.',
		techStack: ['Python', 'Rich', 'Typer', 'Pyfiglet'],
		image: '/projects/calculating-cli.gif',
		githubUrl: 'https://github.com/NguyenNguyen0/bill-calculator',
		type: ['Personal', 'CLI'],
	},
];

export const projectTypes = ['All', 'Personal', 'CLI', 'Frontend', 'Backend', 'Fullstack'];
