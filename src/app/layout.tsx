import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from 'next-themes';
import {
	Be_Vietnam_Pro,
	Press_Start_2P,
	Space_Mono,
	VT323,
} from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ChatWidget } from '@/components/ui/chat-widget';
import { PortfolioActionsProvider } from '@/context/portfolio-actions';

const beVietnamPro = Be_Vietnam_Pro({
	weight: ['400', '500', '600', '700'],
	subsets: ['vietnamese', 'latin'],
	display: 'swap',
	variable: '--font-be-vietnam-pro',
	preload: true,
});

const pressStart2P = Press_Start_2P({
	weight: ['400'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-press-start',
	preload: false,
});

const spaceMono = Space_Mono({
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-space-mono',
	preload: false,
});

const vt323 = VT323({
	weight: ['400'],
	subsets: ['latin', 'vietnamese'],
	display: 'swap',
	variable: '--font-vt323',
	preload: true,
});

export const metadata: Metadata = {
	title: 'Nguyễn Trung Nguyên — Full-Stack Developer · AI Integration',
	description:
		'Full-Stack Developer with hands-on experience building distributed systems, AI-powered applications, and cloud-native deployments. Skilled in LangGraph, MCP, RAG, Spring Boot, FastAPI, and Next.js.',
	keywords: [
		'Nguyễn Trung Nguyên',
		'NguyenNguyen0',
		'Full-Stack Developer',
		'Backend Developer',
		'AI Integration',
		'LangGraph',
		'MCP',
		'RAG',
		'LangChain4j',
		'Gemini API',
		'Spring Boot',
		'FastAPI',
		'NestJS',
		'Next.js',
		'React',
		'React Native',
		'Microservices',
		'Distributed Systems',
		'Qdrant',
		'Portfolio',
		'Vietnam Developer',
	],
	authors: [
		{ name: 'Nguyễn Trung Nguyên', url: 'https://nguyennguyen0.id.vn' },
	],
	metadataBase: new URL('https://nguyennguyen0.id.vn'),
	alternates: {
		languages: { vi: '/' },
		canonical: 'https://nguyennguyen0.id.vn',
	},
	openGraph: {
		title: 'Nguyễn Trung Nguyên — Full-Stack Developer · AI Integration',
		description:
			'Building distributed systems and AI-powered applications. LangGraph · MCP · RAG · Spring Boot · FastAPI · Next.js.',
		images: [
			{
				url: '/thumbnail.png',
				width: 1200,
				height: 630,
				alt: 'Nguyễn Trung Nguyên Portfolio',
			},
		],
		url: 'https://nguyennguyen0.id.vn',
		type: 'website',
		siteName: 'Nguyễn Trung Nguyên Portfolio',
		locale: 'vi_VN',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Nguyễn Trung Nguyên — Full-Stack Developer · AI Integration',
		description:
			'Building distributed systems and AI-powered applications. LangGraph · MCP · RAG · Spring Boot · FastAPI · Next.js.',
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
		googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="canonical" href="https://nguyennguyen0.id.vn" />
				<meta
					name="robots"
					content="index, follow, max-image-preview:large"
				/>
			</head>
			<body
				className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${beVietnamPro.variable} ${pressStart2P.variable} ${spaceMono.variable} ${vt323.variable} antialiased`}
				style={{
					fontFamily:
						"'Be Vietnam Pro', 'Space Mono', 'Geist Sans', sans-serif",
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
							jobTitle: 'Full-Stack Developer',
							image: 'https://nguyennguyen0.id.vn/avatar.jpg',
							email: 'nguyentrungnguyen.dev@gmail.com',
							telephone: '+84394757329',
							alumniOf: {
								'@type': 'CollegeOrUniversity',
								name: 'Industrial University of Ho Chi Minh City',
							},
							address: {
								'@type': 'PostalAddress',
								addressLocality: 'Go Vap, Ho Chi Minh City',
								addressCountry: 'VN',
							},
							description:
								'Full-Stack Developer with experience building distributed systems, AI-powered applications, and cloud-native deployments.',
							knowsAbout: [
								'Full-Stack Development',
								'Distributed Systems',
								'Microservices',
								'AI Integration',
								'LangGraph',
								'MCP',
								'RAG',
								'LangChain4j',
								'Gemini API',
								'Spring Boot',
								'FastAPI',
								'NestJS',
								'React',
								'Next.js',
								'React Native',
								'Kafka',
								'Qdrant',
								'Docker',
								'Terraform',
								'Ansible',
								'AWS',
								'API Design',
							],
							sameAs: [
								'https://github.com/NguyenNguyen0',
								'https://gitlab.com/nguyennguyen0',
								'https://www.linkedin.com/in/nguyennguyen0/',
							],
						}),
					}}
				/>
				<PortfolioActionsProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
					>
						{children}
						<SpeedInsights />
						<ChatWidget />
					</ThemeProvider>
				</PortfolioActionsProvider>
			</body>
		</html>
	);
}
