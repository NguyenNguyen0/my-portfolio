import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GridBackgroundProps {
	children: ReactNode;
	className?: string;
}

export function GridBackground({ children, className }: GridBackgroundProps) {
	return (
		<div className={cn('relative min-h-screen bg-background maze-bg', className)}>
			<div className="relative z-10">{children}</div>
		</div>
	);
}
