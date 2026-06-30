export const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<footer className="border-t border-dotted border-border py-10 mt-8">
			<div className="max-w-7xl mx-auto px-4 text-center space-y-3">
				<p className="font-pixel text-[9px] text-muted-foreground tracking-widest">
					HIGH SCORE
				</p>
				<p className="font-pixel text-[11px] sm:text-xs text-primary tracking-wide">
					1ST &nbsp; NGUYENNGUYEN0 &nbsp; ∞ PTS
				</p>
				<p className="font-mono-custom text-xs text-muted-foreground">
					© {currentYear} · Built with Next.js, Tailwind CSS &amp;
					Framer Motion
				</p>
			</div>
		</footer>
	);
};
