'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function HeroSection() {
	const [showTyping, setShowTyping] = useState(true);

	useEffect(() => {
		// Remove typing animation after it completes
		const timer = setTimeout(() => {
			setShowTyping(false);
		}, 4500); // Animation duration + buffer

		return () => clearTimeout(timer);
	}, []);

	return (
		<section className='relative flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8'>
			<div className='text-center max-w-6xl mx-auto'>
				{/* Main Name with Custom Fonts and Animations */}
				<motion.h1
					className='text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9rem] font-black leading-tight'
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
					<div className='hover-float cursor-pointer transition-all duration-300'>
						{/* Surname - Anton */}
						<span className='block font-anton text-gray-800 dark:text-gray-100 font-normal tracking-wide mb-2 sm:mb-4'>
							<span
								className={
									showTyping
										? 'typing-animation'
										: ''
								}
							>
								Nguyễn Trung
							</span>
						</span>

						{/* Given Name - Dancing Script with Gradient */}
						<span className='scale-110 block font-dancing-script bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent font-bold tracking-wider transform hover:scale-120 transition-transform duration-300'>
							<span
								className={
									showTyping
										? 'typing-animation'
										: ''
								}
								style={{
									animationDelay:
										'1.5s',
								}}
							>
								Nguyên
							</span>
						</span>
					</div>
				</motion.h1>

				{/* Title */}
				<motion.p
					className='mt-12 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gray-700 dark:text-gray-300 font-montserrat'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.8,
						delay: 0.8,
					}}
				>
					A Backend developer with a flair of
					Frontend
				</motion.p>

				{/* Subtitle */}
				<motion.p
					className='mt-6 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-montserrat'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.8,
						delay: 1.0,
					}}
				>
					Crafting robust server architectures
					while creating beautiful user
					experiences
				</motion.p>

				{/* Action Buttons */}
				<motion.div
					className='mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.8,
						delay: 1.2,
					}}
				>
					<motion.a
						href='#'
						className='group relative inline-flex items-center justify-center px-10 py-5 text-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 font-montserrat'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={e => {
							e.preventDefault();
							// For now, just show an alert. Later you can add actual CV download
							alert(
								'CV download functionality will be added soon!'
							);
						}}
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
						href='/contact'
						className='group relative inline-flex items-center justify-center px-10 py-5 text-xl font-semibold text-gray-700 dark:text-gray-300 bg-white/20 dark:bg-gray-800/60 border-2 border-gray-300 dark:border-gray-600 rounded-full hover:bg-white/30 dark:hover:bg-gray-700/60 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 backdrop-blur-lg transform hover:-translate-y-2 font-montserrat'
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

				{/* Scroll Indicator */}
				<motion.div
					className='absolute bottom-8 left-1/2 transform -translate-x-1/2'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.8,
						delay: 1.5,
					}}
				>
					<motion.div
						className='w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center'
						animate={{ y: [0, 10, 0] }}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					>
						<motion.div
							className='w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2'
							animate={{
								y: [0, 6, 0],
							}}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
						/>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}