import './globals.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from 'next-themes';
import { Be_Vietnam_Pro } from 'next/font/google';

// Configure Be Vietnam Pro font with weights
const beVietnamPro = Be_Vietnam_Pro({
	weight: ['400', '500', '600', '700'],
	subsets: ['vietnamese', 'latin'],
	display: 'swap',
	variable: '--font-be-vietnam-pro',
});

export const metadata: Metadata = {
	title: 'Portfolio - NguyenNguyen0',
	description:
		"NguyenNguyen0's Portfolio - Backend Developer, loving API Design, AI and UI/UX.",
	keywords: ['NguyenNguyen0', 'Portfolio', 'Next.js', 'Vietnamese'],
	authors: [{ name: 'NguyenNguyen0' }],
	metadataBase: new URL('https://nguyennguyen0.id.vn'),
	alternates: {
		languages: {
			'en-US': '/en',
			vi: '/',
		},
	},
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
		<html lang="vi" suppressHydrationWarning>
			<body
				className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${beVietnamPro.variable} antialiased`}
				style={{
					fontFamily: "'Be Vietnam Pro', 'Geist Sans', sans-serif",
				}}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
