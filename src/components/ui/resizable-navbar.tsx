'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Github, Mail } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function ResizableNavbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const navItems = [
		{ name: 'Home', href: '#hero', icon: Home },
		{ name: 'About', href: '#about', icon: User },
		{ name: 'Projects', href: '#projects', icon: Briefcase },
		{ name: 'GitHub', href: '#github', icon: Github },
		{ name: 'Contact', href: '#contact', icon: Mail },
	];

	return (
		<motion.nav
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled
					? 'bg-background/80 backdrop-blur-md border-b border-border/50'
					: 'bg-transparent'
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<motion.div
						whileHover={{ scale: 1.05 }}
						className="w-12 h-12 bg-transparent dark:bg-white rounded-full flex items-center justify-center"
					>
						<Image
							className="w-full h-full object-cover mb-0.5"
							src={'/dev-icon.png'}
							height={52}
							width={52}
							alt="logo icon"
						/>
					</motion.div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						{navItems.map((item) => (
							<motion.a
								key={item.name}
								href={item.href}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2"
							>
								<item.icon size={16} />
								{item.name}
							</motion.a>
						))}
						<ThemeToggle />
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden flex items-center gap-4">
						<ThemeToggle />
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="text-muted-foreground hover:text-foreground"
						>
							{isOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/50"
					>
						<div className="px-4 py-4 space-y-4">
							{navItems.map((item) => (
								<motion.a
									key={item.name}
									href={item.href}
									onClick={() => setIsOpen(false)}
									whileHover={{ x: 10 }}
									className="flex text-muted-foreground hover:text-foreground transition-colors duration-200 items-center gap-3"
								>
									<item.icon size={18} />
									{item.name}
								</motion.a>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.nav>
	);
}
