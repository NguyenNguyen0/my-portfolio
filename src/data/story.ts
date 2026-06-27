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
		body: 'Gặp Python lần đầu. print("Hello World") chạy ra màn hình — không hiểu tại sao nhưng thích. Cái cảm giác máy làm theo ý mình lần đầu tiên.',
	},
	{
		year: '2021',
		label: 'LEVEL 1',
		title: 'University Unlocked',
		body: 'Vào IUH ngành Kỹ thuật phần mềm. Java, OOP, thuật toán — lần đầu hiểu code là tư duy, không chỉ là gõ phím. Bắt đầu tự học thêm ngoài giờ học.',
	},
	{
		year: '2022',
		label: 'LEVEL 2',
		title: 'Backend Clicked',
		body: 'RESTful APIs với Node.js. Lần đầu build server từ 0, thấy request đi vào và response trả về đúng ý — nghiện. Hiểu ra đây là thứ mình muốn làm.',
	},
	{
		year: '2023',
		label: 'LEVEL 3',
		title: 'Full Stack Expansion',
		body: 'React, Next.js, FastAPI, Docker. Hệ sinh thái mở rộng. Nhận ra backend mạnh hơn khi hiểu cả frontend. Bắt đầu build các project cá nhân thực sự.',
	},
	{
		year: '2024',
		label: 'LEVEL 4',
		title: 'AI & Design Thinking',
		body: 'Tích hợp AI vào projects, học API Design nghiêm túc, bắt đầu quan tâm đến UI/UX như một kỹ năng kỹ thuật chứ không chỉ là thẩm mỹ.',
	},
	{
		year: 'NOW',
		label: 'NOW LOADING...',
		title: "What's Next",
		body: 'Tìm kiếm cơ hội để xây dựng thứ gì đó có ý nghĩa thực sự. Mở với các collaboration, freelance, hay full-time opportunity.',
	},
];
