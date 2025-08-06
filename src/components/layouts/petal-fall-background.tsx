'use client';

import { useRef, useEffect } from 'react';

interface Petal {
	x: number;
	y: number;
	size: number;
	speedX: number;
	speedY: number;
	rotation: number;
	rotationSpeed: number;
	color: string;
	opacity: number;
}

interface PetalFallBackgroundProps {
	children: React.ReactNode;
}

export function PetalFallBackground({ children }: PetalFallBackgroundProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationFrameRef = useRef<number | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const petals: Petal[] = [];
		const numPetals = 50;
		const colors = [
			'#FFB6C1', // Light pink
			'#FFC0CB', // Pink
			'#FFE4E1', // Misty rose
			'#F0E68C', // Khaki
			'#E6E6FA', // Lavender
			'#98FB98', // Pale green
		];

		// Initialize petals
		for (let i = 0; i < numPetals; i++) {
			petals.push({
				x: Math.random() * window.innerWidth,
				y:
					Math.random() * window.innerHeight -
					window.innerHeight,
				size: Math.random() * 8 + 4,
				speedX: Math.random() * 1 - 1,
				speedY: Math.random() * 2 + 1,
				rotation: Math.random() * Math.PI * 2,
				rotationSpeed: Math.random() * 0.04 - 0.02,
				color: colors[
					Math.floor(
						Math.random() * colors.length
					)
				],
				opacity: Math.random() * 0.7 + 0.3,
			});
		}

		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		const drawPetal = (petal: Petal) => {
			ctx.save();
			ctx.translate(petal.x, petal.y);
			ctx.rotate(petal.rotation);
			ctx.globalAlpha = petal.opacity;

			// Draw petal shape
			ctx.fillStyle = petal.color;
			ctx.beginPath();
			// Petal shape using bezier curves
			ctx.moveTo(0, -petal.size);
			ctx.bezierCurveTo(
				petal.size / 2,
				-petal.size,
				petal.size / 2,
				petal.size / 2,
				0,
				petal.size
			);
			ctx.bezierCurveTo(
				-petal.size / 2,
				petal.size / 2,
				-petal.size / 2,
				-petal.size,
				0,
				-petal.size
			);
			ctx.fill();

			// Add subtle shadow
			ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
			ctx.shadowBlur = 2;
			ctx.shadowOffsetX = 1;
			ctx.shadowOffsetY = 1;

			ctx.restore();
		};

		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Update and draw petals
			petals.forEach(petal => {
				// Update position
				petal.x += petal.speedX;
				petal.y += petal.speedY;
				petal.rotation += petal.rotationSpeed;

				// Reset petal when it goes off screen
				if (petal.y > canvas.height + petal.size) {
					petal.y = -petal.size;
					petal.x = Math.random() * canvas.width;
				}
				if (petal.x > canvas.width + petal.size) {
					petal.x = -petal.size;
				} else if (petal.x < -petal.size) {
					petal.x = canvas.width + petal.size;
				}

				drawPetal(petal);
			});

			animationFrameRef.current = requestAnimationFrame(draw);
		};

		resizeCanvas();
		draw();

		const handleResize = () => {
			resizeCanvas();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className='relative h-full w-full transition-colors bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100'>
			{/* Petal canvas */}
			<canvas
				ref={canvasRef}
				className='fixed inset-0 h-full w-full'
				style={{ zIndex: 1 }}
			/>

			{/* Content */}
			<div className='relative z-10'>{children}</div>
		</div>
	);
}
