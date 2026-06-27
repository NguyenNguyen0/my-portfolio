'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

const navItems = [
	{ name: 'HOME', href: '#hero' },
	{ name: 'ABOUT', href: '#about' },
	{ name: 'STORY', href: '#story' },
	{ name: 'PROJECTS', href: '#projects-section' },
	{ name: 'CONTACT', href: '#contact-section' },
];

export function ResizableNavbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const shouldReduce = useReducedMotion();

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<motion.nav
			initial={shouldReduce ? false : { y: -80 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.4, ease: 'easeOut' }}
			className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 border-b border-dotted border-border ${
				scrolled ? 'bg-background/90 backdrop-blur-md' : 'bg-transparent'
			}`}
			aria-label="Main navigation"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<a href="#hero" aria-label="Back to top" className="flex-shrink-0">
						<div className="w-10 h-10 bg-transparent dark:bg-white flex items-center justify-center overflow-hidden">
							<Image
								src="/dev-icon.png"
								height={40}
								width={40}
								alt="NguyenNguyen0 logo"
								className="w-full h-full object-cover"
							/>
						</div>
					</a>

					{/* Desktop nav */}
					<div className="hidden md:flex items-center gap-6 lg:gap-8">
						{navItems.map((item) => (
							<a
								key={item.name}
								href={item.href}
								className="font-pixel text-[9px] text-muted-foreground tracking-widest transition-colors duration-150 hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:underline"
							>
								{item.name}
							</a>
						))}
						<ThemeToggle />
					</div>

					{/* Mobile controls */}
					<div className="md:hidden flex items-center gap-3">
						<ThemeToggle />
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="text-muted-foreground hover:text-foreground p-2 focus-visible:outline-2 focus-visible:outline-dotted focus-visible:outline-ring"
							aria-label={isOpen ? 'Close menu' : 'Open menu'}
							aria-expanded={isOpen}
						>
							{isOpen ? <X size={20} /> : <Menu size={20} />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile dropdown */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={shouldReduce ? false : { opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2, ease: 'easeOut' }}
						className="md:hidden bg-background/95 backdrop-blur-md border-t border-dotted border-border overflow-hidden"
					>
						<nav className="px-6 py-6 space-y-5" aria-label="Mobile navigation">
							{navItems.map((item) => (
								<a
									key={item.name}
									href={item.href}
									onClick={() => setIsOpen(false)}
									className="flex items-center gap-3 font-pixel text-[10px] text-muted-foreground tracking-widest hover:text-primary transition-colors"
								>
									<span className="text-primary text-[8px]">▶</span>
									{item.name}
								</a>
							))}
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.nav>
	);
}
