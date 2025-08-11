import './globals.css';
import { ThemeProvider } from '@/components/common';
import { AppLayout } from '@/components/common';
import { Montserrat, Anton, Dancing_Script } from 'next/font/google';
import type { Metadata } from 'next';

const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-montserrat',
});

const anton = Anton({
	subsets: ['latin'],
	weight: ['400'],
	variable: '--font-anton',
});

const dancingScript = Dancing_Script({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-dancing-script',
});

export const metadata: Metadata = {
	title: 'Portfolio - NguyenNguyen0',
	description: "NguyenNguyen0's Portfolio - Backend Developer, loving API Design, AI and UI/UX.",
	keywords: ['NguyenNguyen0', 'Portfolio', 'Next.js', 'Backend Developer', 'API Design', 'AI', 'UI/UX'],
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
		<html lang='en' suppressHydrationWarning>
			<body
				className={`preload overflow-x-hidden ${montserrat.variable} ${anton.variable} ${dancingScript.variable}`}
			>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					<AppLayout>{children}</AppLayout>
				</ThemeProvider>
			</body>
		</html>
	);
}
