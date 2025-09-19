import './globals.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export const metadata: Metadata = {
	title: 'Portfolio - NguyenNguyen0',
	description:
		"NguyenNguyen0's Portfolio - Backend Developer, loving API Design, AI and UI/UX.",
	keywords: [
		'NguyenNguyen0',
		'Portfolio',
		'Next.js',
	],
	authors: [{ name: 'NguyenNguyen0' }],
	openGraph: {
		title: 'Portfolio - Nguyễn Trung Nguyên',
		description: 'Backend Developer, loving API Design, AI and UI/UX.',
		images: ['/thumbnail.png'],
		url: 'https://nguyennguyen0.id.vn',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Portfolio - Nguyễn Trung Nguyên',
		description: 'Backend Developer, loving API Design, AI and UI/UX.',
		images: ['/thumbnail.png'],
	},
	icons: {
		icon: '/dev-icon.png',
		shortcut: '/dev-icon.png',
		apple: '/dev-icon.png',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning className="bg-black scroll-smooth">
			<body
				className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased bg-black`}
			>
				{children}
			</body>
		</html>
	);
}
