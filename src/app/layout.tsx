import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { SmartBackground } from '@/components/layouts';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className='preload'>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
				>
					<SmartBackground>
						{children}
					</SmartBackground>
				</ThemeProvider>
			</body>
		</html>
	);
}
