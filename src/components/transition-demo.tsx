'use client';

export function TransitionDemo() {
	return (
		<div className='mt-8 space-y-4'>
			<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
				Transition Demo
			</h3>
			<div className='grid gap-4 md:grid-cols-3'>
				<div className='rounded-lg bg-blue-100 p-4 dark:bg-blue-900'>
					<div className='h-16 w-16 rounded-full bg-blue-500 dark:bg-blue-400'></div>
					<p className='mt-2 text-blue-800 dark:text-blue-200'>
						Blue Element
					</p>
				</div>
				<div className='rounded-lg bg-green-100 p-4 dark:bg-green-900'>
					<div className='h-16 w-16 rounded-full bg-green-500 dark:bg-green-400'></div>
					<p className='mt-2 text-green-800 dark:text-green-200'>
						Green Element
					</p>
				</div>
				<div className='rounded-lg bg-purple-100 p-4 dark:bg-purple-900'>
					<div className='h-16 w-16 rounded-full bg-purple-500 dark:bg-purple-400'></div>
					<p className='mt-2 text-purple-800 dark:text-purple-200'>
						Purple Element
					</p>
				</div>
			</div>
		</div>
	);
}
