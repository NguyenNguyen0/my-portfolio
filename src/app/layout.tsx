import './globals.css';
import { ThemeProvider } from '@/components/common';
import { AppLayout } from '@/components/common';
import { Montserrat, Anton, Dancing_Script } from 'next/font/google';

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
