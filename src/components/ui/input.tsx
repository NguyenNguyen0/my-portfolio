'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const inputVariants = cva(
	'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
	{
		variants: {
			variant: {
				default: '',
				filled: 'bg-muted/50 border-transparent hover:bg-muted/80 focus:bg-background',
				outline: 'border-2',
				ghost: 'border-transparent bg-transparent hover:bg-muted/20',
				underlined:
					'rounded-none border-0 border-b-2 px-0 focus-visible:border-primary',
			},
			size: {
				default: 'h-10',
				sm: 'h-8 text-xs px-2 py-1',
				lg: 'h-12 text-base px-4',
				xl: 'h-14 text-lg px-6 py-3',
			},
			radius: {
				default: 'rounded-md',
				sm: 'rounded',
				lg: 'rounded-lg',
				full: 'rounded-full',
				none: 'rounded-none',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
			radius: 'default',
		},
	},
);

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
		VariantProps<typeof inputVariants> {
	error?: boolean;
	icon?: React.ReactNode;
	iconPosition?: 'left' | 'right';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			variant,
			size,
			radius,
			error,
			icon,
			iconPosition = 'left',
			type,
			...props
		},
		ref,
	) => {
		return (
			<div className="relative">
				{icon && iconPosition === 'left' && (
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
						{icon}
					</div>
				)}
				<input
					type={type}
					className={cn(
						inputVariants({ variant, size, radius }),
						error &&
							'border-destructive focus-visible:ring-destructive',
						icon && iconPosition === 'left' && 'pl-10',
						icon && iconPosition === 'right' && 'pr-10',
						className,
					)}
					ref={ref}
					{...props}
				/>
				{icon && iconPosition === 'right' && (
					<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
						{icon}
					</div>
				)}
			</div>
		);
	},
);
Input.displayName = 'Input';

export { Input, inputVariants };
