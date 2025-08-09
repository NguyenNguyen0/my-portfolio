'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggleButton } from './ThemeToggleButton';
import { HiMenu, HiX } from 'react-icons/hi';

export function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			setIsScrolled(scrollTop > 50);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const navItems = [
		{ href: '#about', label: 'About' },
		{ href: '#github', label: 'GitHub' },
		{ href: '#contact', label: 'Contact' },
	];

	return (
		<motion.header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg'
					: 'bg-transparent'
			}`}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div
					className={`flex items-center justify-between transition-all duration-300 ${
						isScrolled ? 'py-2' : 'py-4'
					}`}
				>
					{/* Logo/Name */}
					<motion.div
						className='flex-shrink-0'
						whileHover={{ scale: 1.05 }}
						transition={{
							type: 'spring',
							stiffness: 400,
							damping: 10,
						}}
					>
						<Link
							href='#hero'
							className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white'
						>
							Trung Nguyen
						</Link>
					</motion.div>

					{/* Desktop Navigation */}
					<nav className='hidden md:flex items-center space-x-8'>
						{navItems.map(item => (
							<motion.div
								key={item.href}
								whileHover={{
									scale: 1.05,
								}}
								transition={{
									type: 'spring',
									stiffness: 400,
									damping: 10,
								}}
							>
								<Link
									href={item.href}
									className='text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-medium'
								>
									{item.label}
								</Link>
							</motion.div>
						))}
						<ThemeToggleButton />
					</nav>

					{/* Mobile menu button */}
					<div className='md:hidden flex items-center space-x-4'>
						<ThemeToggleButton />
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className='p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors'
							aria-label='Toggle mobile menu'
						>
							{isMobileMenuOpen ? (
								<HiX className='h-6 w-6' />
							) : (
								<HiMenu className='h-6 w-6' />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				<AnimatePresence>
					{isMobileMenuOpen && (
						<motion.div
							className='md:hidden'
							initial={{
								opacity: 0,
								height: 0,
							}}
							animate={{
								opacity: 1,
								height: 'auto',
							}}
							exit={{
								opacity: 0,
								height: 0,
							}}
							transition={{
								duration: 0.3,
							}}
						>
							<div className='px-2 pt-2 pb-3 space-y-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-lg mt-2'>
								{navItems.map(item => (
									<Link
										key={item.href}
										href={item.href}
										className='block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors'
										onClick={() =>
											setIsMobileMenuOpen(false)
										}
									>
										{item.label}
									</Link>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.header>
	);
}
