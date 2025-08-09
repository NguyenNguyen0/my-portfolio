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
		id: 'smart-background',
		title: 'Smart Background App',
		description:
			'A frontend experiment with dynamic background effects based on theme. Features multiple animated backgrounds including starry night, petal fall, and geometric patterns.',
		techStack: ['Next.js', 'TailwindCSS', 'Framer Motion', 'TypeScript'],
		image: '/projects/smart-bg.png',
		demoUrl: 'https://smart-bg-demo.vercel.app',
		githubUrl: 'https://github.com/NguyenNguyen0/smart-background',
		type: ['Personal', 'Frontend'],
	},
	{
		id: 'portfolio-website',
		title: 'Portfolio Website',
		description:
			'A modern, responsive portfolio website built with Next.js and TailwindCSS. Features dark/light mode, smooth animations, and dynamic backgrounds.',
		techStack: ['Next.js', 'TailwindCSS', 'TypeScript', 'Vercel'],
		image: '/projects/portfolio.png',
		demoUrl: 'https://my-portfolio-demo.vercel.app',
		githubUrl: 'https://github.com/NguyenNguyen0/my-portfolio',
		type: ['Personal', 'Frontend'],
	},
	{
		id: 'task-management-api',
		title: 'Task Management API',
		description:
			'A RESTful API for task management with user authentication, CRUD operations, and real-time notifications. Built with FastAPI and PostgreSQL.',
		techStack: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Python'],
		githubUrl: 'https://github.com/NguyenNguyen0/task-api',
		type: ['Personal', 'Backend'],
	},
	{
		id: 'ecommerce-dashboard',
		title: 'E-commerce Dashboard',
		description:
			'A comprehensive dashboard for e-commerce management with analytics, inventory tracking, and order management. Features real-time charts and data visualization.',
		techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
		image: '/projects/ecommerce-dashboard.png',
		demoUrl: 'https://ecommerce-dashboard-demo.vercel.app',
		githubUrl: 'https://github.com/NguyenNguyen0/ecommerce-dashboard',
		type: ['Work', 'Fullstack'],
	},
	{
		id: 'chat-application',
		title: 'Real-time Chat Application',
		description:
			'A modern chat application with real-time messaging, file sharing, and group conversations. Features emoji reactions and message encryption.',
		techStack: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Express'],
		image: '/projects/chat-app.png',
		demoUrl: 'https://chat-app-demo.vercel.app',
		githubUrl: 'https://github.com/NguyenNguyen0/chat-app',
		type: ['Personal', 'Fullstack'],
	},
	{
		id: 'weather-app',
		title: 'Weather Forecast App',
		description:
			'A beautiful weather application with 7-day forecasts, location-based weather, and interactive maps. Features weather alerts and historical data.',
		techStack: ['React', 'TypeScript', 'OpenWeather API', 'Leaflet'],
		image: '/projects/weather-app.png',
		demoUrl: 'https://weather-app-demo.vercel.app',
		githubUrl: 'https://github.com/NguyenNguyen0/weather-app',
		type: ['Personal', 'Frontend'],
	},
];

export const projectTypes = ['All', 'Personal', 'Work', 'Frontend', 'Backend', 'Fullstack'];
