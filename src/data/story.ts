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
		body: 'Gặp Python lần đầu. print("Hello World") chạy ra màn hình — không hiểu tại sao nhưng thích. Cái cảm giác máy làm theo ý mình, không thể giải thích được.',
	},
	{
		year: '2022',
		label: 'LEVEL 1',
		title: 'University Unlocked',
		body: 'Vào IUH ngành Kỹ thuật phần mềm. Java, OOP, thuật toán, kiến trúc phần mềm — lần đầu hiểu code là tư duy có hệ thống. Bắt đầu tự học Web, APIs ngoài giờ học.',
	},
	{
		year: '2023',
		label: 'LEVEL 2',
		title: 'Backend Clicked',
		body: 'RESTful APIs, databases, Docker. Lần đầu build server từ 0 — request đi vào, response trả về đúng ý. Hiểu ra đây là thứ mình muốn làm nghiêm túc. React và Next.js theo sau.',
	},
	{
		year: '2024',
		label: 'LEVEL 3',
		title: 'Full Stack Expansion',
		body: 'FastAPI, Spring Boot, PostgreSQL, MongoDB, Redis. Stack mở rộng hai chiều. Bắt đầu quan tâm đến API Design, kiến trúc hệ thống, và cách viết code scale được.',
	},
	{
		year: '2025',
		label: 'LEVEL 4',
		title: 'AI Integration Era',
		body: 'Aurora Hotel System — RAG chatbot với LangChain4j, Gemini API, pgvector. Lần đầu đưa AI vào production. Microservices, DevOps, và team workflow trở thành ngôn ngữ hàng ngày.',
	},
	{
		year: '2026',
		label: 'LEVEL 5',
		title: 'Distributed Systems & AI Agents',
		body: 'NexaTech & Chatly — polyglot microservices, LangGraph multi-agent, MCP Orchestrator, Kafka event pipelines, Terraform IaC. Build AI ecosystem từ kiến trúc đến production trên AWS.',
	},
	{
		year: 'NOW',
		label: 'NOW LOADING...',
		title: "What's Next",
		body: 'Tìm kiếm cơ hội để xây dựng thứ gì đó có tác động thực sự. Mở với full-time roles, collaboration, hoặc bất kỳ problem thú vị nào cần distributed systems và AI.',
	},
];
