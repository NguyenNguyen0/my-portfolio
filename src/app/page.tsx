// import { ThemeToggle } from '@/components/theme-toggle';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { TransitionDemo } from '@/components/transition-demo';

export default function Home() {
	return (
		<div className='min-h-screen bg-white p-8 transition-colors dark:bg-gray-900'>
			<div className='mx-auto max-w-4xl'>
				<header className='mb-8'>
					<div className='flex items-center justify-between'>
						<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
							My Portfolio
						</h1>
						<ThemeToggleButton />
					</div>
				</header>

				<main className='space-y-8'>
					<section className='rounded-lg bg-gray-50 p-6 dark:bg-gray-800'>
						<h2 className='mb-4 text-2xl font-semibold text-gray-900 dark:text-white'>
							Welcome
						</h2>
						<p className='text-gray-700 dark:text-gray-300'>
							This is a demo of
							next-themes with
							Tailwind CSS v4. The
							theme system supports
							light, dark, and system
							preference modes with
							smooth transitions.
						</p>
					</section>

					<section className='grid gap-6 md:grid-cols-2'>
						<div className='rounded-lg border border-gray-200 p-6 dark:border-gray-700'>
							<h3 className='mb-2 text-xl font-medium text-gray-900 dark:text-white'>
								Light Mode
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								Clean and bright
								interface for
								daytime use.
							</p>
						</div>
						<div className='rounded-lg border border-gray-200 p-6 dark:border-gray-700'>
							<h3 className='mb-2 text-xl font-medium text-gray-900 dark:text-white'>
								Dark Mode
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								Easy on the eyes
								for low-light
								environments.
							</p>
						</div>
					</section>

					<TransitionDemo />
				</main>
			</div>
		</div>
	);
}
