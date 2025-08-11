'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

export function HeroSection() {
	return (
		<section
			id='hero'
			className={clsx(
				'relative flex min-h-screen',
				'items-center justify-center',
				'px-4 sm:px-6 lg:px-8 pb-10'
			)}
		>
			<div className='text-center max-w-6xl mx-auto'>
				{/* Main Name with Custom Fonts and Animations */}
				<motion.h1
					className={clsx(
						'text-7xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9rem]',
						'font-black leading-tight'
					)}
					initial={{
						opacity: 0,
						y: 50,
						scale: 0.8,
					}}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{
						duration: 1.5,
						ease: 'easeOut',
					}}
				>
					<div
						className={clsx(
							'hover-float cursor-default',
							'transition-all duration-300'
						)}
					>
						{/* Surname - Anton */}
						<span
							className={clsx(
								'block font-anton',
								'text-gray-800 dark:text-gray-100',
								'font-normal tracking-wide',
								'mb-2 sm:mb-4'
							)}
						>
							<span>Nguyễn Trung</span>
						</span>

						{/* Given Name - Dancing Script with Gradient Border */}
						<span
							className={clsx(
								'scale-140 block font-dancing-script',
								'relative',
								'font-bold tracking-wider',
								'transform transition-transform duration-300'
							)}
						>
							<span
								className={clsx(
									'relative z-10',
									'text-transparent',
									'font-dancing-script font-bold tracking-wider'
								)}
								style={{
									animationDelay: '1.5s',
									WebkitTextStroke: '2px',
									WebkitTextStrokeColor: 'transparent',
									backgroundImage:
										'linear-gradient(45deg, #9333ea, #ec4899, #2563eb)',
									WebkitBackgroundClip: 'text',
									backgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
								}}
							>
								Nguyên
							</span>
						</span>
					</div>
				</motion.h1>

				{/* Title */}
				<motion.p
					className={clsx(
						'mt-18',
						'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
						'font-medium',
						'text-gray-700 dark:text-gray-300',
						'font-montserrat'
					)}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.8,
						delay: 0.8,
					}}
				>
					A Backend developer with a flair of Frontend
				</motion.p>

				{/* Subtitle */}
				<motion.p
					className={clsx(
						'mt-6',
						'text-sm sm:text-lg md:text-xl',
						'text-gray-600 dark:text-gray-400',
						'max-w-3xl mx-auto',
						'font-montserrat'
					)}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.8,
						delay: 1.0,
					}}
				>
					Crafting robust server architectures while creating beautiful user experiences
				</motion.p>

				{/* Action Buttons */}
				<motion.div
					className={clsx(
						'mt-12',
						'flex flex-col sm:flex-row',
						'gap-6 justify-center items-center'
					)}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.8,
						delay: 1.2,
					}}
				>
					<motion.a
						href='https://www.topcv.vn/xem-cv/VA8HAANcCA5UDlcKVwwFBFQDCwMODgdSCABSAQ9a6b'
						target='_blank'
						className={clsx(
							'group relative inline-flex items-center justify-center',
							'px-10 py-5',
							'text-lg font-semibold text-white',
							'bg-gradient-to-r from-purple-600 to-blue-600',
							'hover:from-purple-700 hover:to-blue-700',
							'rounded-full',
							'transition-all duration-300',
							'shadow-xl hover:shadow-2xl',
							'transform hover:-translate-y-2',
							'font-montserrat'
						)}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<svg
							className='w-6 h-6 mr-3'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
							/>
						</svg>
						Download CV
					</motion.a>

					<motion.a
						href='#contact'
						className={clsx(
							'group relative inline-flex items-center justify-center',
							'px-10 py-5',
							'text-lg font-semibold',
							'text-gray-700 dark:text-gray-300',
							'bg-white/20 dark:bg-gray-800/60',
							'border-2 border-gray-300 dark:border-gray-600',
							'hover:bg-white/30 dark:hover:bg-gray-700/60',
							'hover:border-purple-500 dark:hover:border-purple-400',
							'rounded-full',
							'transition-all duration-300',
							'backdrop-blur-lg',
							'transform hover:-translate-y-2',
							'font-montserrat'
						)}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<svg
							className='w-6 h-6 mr-3'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
							/>
						</svg>
						Talk with me
					</motion.a>
				</motion.div>
			</div>
		</section>
	);
}
