'use client';

interface QuoteProps {
	quote: string;
	ctaText?: string;
	ctaAction?: () => void;
}

export function Quote({ quote, ctaText, ctaAction }: QuoteProps) {
	return (
		<div className='text-center space-y-6 p-8 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-200 dark:border-blue-800'>
			<blockquote className='text-lg md:text-xl text-gray-700 dark:text-gray-300 italic font-medium leading-relaxed'>
				&ldquo;{quote}&rdquo;
			</blockquote>
			{ctaText && (
				<button
					onClick={ctaAction}
					className='inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900'
				>
					{ctaText}
					<svg
						className='ml-2 w-4 h-4'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M17 8l4 4m0 0l-4 4m4-4H3'
						/>
					</svg>
				</button>
			)}
		</div>
	);
}
