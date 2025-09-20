'use client';

export const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<footer className="border-t border-border/50 py-12 mt-16 backdrop-blur-sm">
			<div className="max-w-7xl mx-auto text-center">
				<p className="text-muted-foreground">
					© {currentYear} Nguyễn Trung Nguyên. Built with Next.js,
					Tailwind CSS, and Framer Motion.
				</p>
				<div className="flex justify-center gap-6 mt-4">
					<a
						href="#about"
						className="text-muted-foreground hover:text-foreground transition-colors"
					>
						About
					</a>
					<a
						href="#projects"
						className="text-muted-foreground hover:text-foreground transition-colors"
					>
						Projects
					</a>
					<a
						href="#contact"
						className="text-muted-foreground hover:text-foreground transition-colors"
					>
						Contact
					</a>
				</div>
			</div>
		</footer>
	);
};
