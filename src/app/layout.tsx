import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from 'next-themes';
import { Be_Vietnam_Pro } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

const beVietnamPro = Be_Vietnam_Pro({
	weight: ['400', '500', '600', '700'],
	subsets: ['vietnamese', 'latin'],
	display: 'swap',
	variable: '--font-be-vietnam-pro',
	preload: true,
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
			vi: '/',
		},
		canonical: 'https://nguyennguyen0.id.vn',
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
	robots: {
		index: true,
		follow: true,
		nocache: false,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="vi" suppressHydrationWarning>
			<head>
				<link rel="canonical" href="https://nguyennguyen0.id.vn" />
				<meta
					name="robots"
					content="index, follow, max-image-preview:large"
				/>
			</head>
			<body
				className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${beVietnamPro.variable} antialiased`}
				style={{
					fontFamily: "'Be Vietnam Pro', 'Geist Sans', sans-serif",
				}}
			>
				<Script
					id="ld-json"
					type="application/ld+json"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'Person',
							name: 'Nguyễn Trung Nguyên',
							url: 'https://nguyennguyen0.id.vn',
							jobTitle: 'Backend Developer',
							image: 'https://nguyennguyen0.id.vn/avatar.jpg',
							description:
								'Backend Developer, loving API Design, AI and UI/UX.',
							knowsAbout: [
								'Backend Development',
								'API Design',
								'AI',
								'UI/UX',
							],
							sameAs: [
								'https://github.com/NguyenNguyen0',
								'https://www.linkedin.com/in/nguyennguyen0/',
							],
						}),
					}}
				/>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<SpeedInsights />
				</ThemeProvider>
			</body>
		</html>
	);
}
