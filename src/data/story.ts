export interface StoryEntry {
	year: string;
	label: string;
	title: string;
	body: string;
}

export const storyEntries: StoryEntry[] = [
	{
		year: '2019',
		label: 'GAME START',
		title: 'First Contact',
		body: 'First encounter with Python. print("Hello World") ran on screen — didn\'t understand why, but loved it. The feeling of making the machine do exactly what you want, impossible to explain.',
	},
	{
		year: '2022',
		label: 'LEVEL 1',
		title: 'University Unlocked',
		body: 'Started at IUH studying Software Engineering. Java, OOP, algorithms, software architecture — first time understanding that code is structured thinking. Began self-learning web dev and APIs outside class.',
	},
	{
		year: '2023',
		label: 'LEVEL 2',
		title: 'Backend Clicked',
		body: 'RESTful APIs, databases, Docker. Built a server from scratch for the first time — request comes in, response returns exactly as intended. Realized this was what I wanted to do seriously. React and Next.js followed.',
	},
	{
		year: '2024',
		label: 'LEVEL 3',
		title: 'Full Stack Expansion',
		body: 'FastAPI, Spring Boot, PostgreSQL, MongoDB, Redis. Stack expanded in both directions. Started caring about API design, system architecture, and writing code that scales.',
	},
	{
		year: '2025',
		label: 'LEVEL 4',
		title: 'AI Integration Era',
		body: 'Aurora Hotel System — RAG chatbot with LangChain4j, Gemini API, pgvector. First time shipping AI to production. Microservices, DevOps, and team workflows became everyday language.',
	},
	{
		year: '2026',
		label: 'LEVEL 5',
		title: 'Distributed Systems & AI Agents',
		body: 'NexaTech & Chatly — polyglot microservices, LangGraph multi-agent, MCP Orchestrator, Kafka event pipelines, Terraform IaC. Built an AI ecosystem from architecture to production on AWS.',
	},
	{
		year: 'NOW',
		label: 'NOW LOADING...',
		title: "What's Next",
		body: 'Looking for opportunities to build something with real impact. Open to full-time roles, collaboration, or any interesting problem that needs distributed systems and AI.',
	},
];
