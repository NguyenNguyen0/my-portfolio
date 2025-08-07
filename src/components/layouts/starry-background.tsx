'use client';

import { useRef, useEffect } from 'react';

interface Star {
	x: number;
	y: number;
	radius: number;
	speedX: number;
	speedY: number;
	opacity: number;
	twinkleSpeed: number;
}

interface StarryBackgroundProps {
	children: React.ReactNode;
}

export function StarryBackground({ children }: StarryBackgroundProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationFrameRef = useRef<number | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const stars: Star[] = [];
		const numStars = 150;

		// Initialize stars randomly
		for (let i = 0; i < numStars; i++) {
			stars.push({
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				radius: Math.random() * 2 + 0.5,
				speedX: Math.random() * 0.3 - 0.15,
				speedY: Math.random() * 0.3 - 0.15,
				opacity: Math.random() * 0.8 + 0.2,
				twinkleSpeed: Math.random() * 0.02 + 0.005,
			});
		}

		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Draw stars
			stars.forEach(star => {
				// Twinkling effect
				star.opacity += star.twinkleSpeed;
				if (star.opacity >= 1 || star.opacity <= 0.2) {
					star.twinkleSpeed *= -1;
				}

				ctx.save();
				ctx.globalAlpha = star.opacity;
				ctx.fillStyle = 'white';
				ctx.shadowColor = 'white';
				ctx.shadowBlur = star.radius * 2;
				ctx.beginPath();
				ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
				ctx.fill();
				ctx.restore();

				// Update star position
				star.x += star.speedX;
				star.y += star.speedY;

				// Wrap around edges
				if (star.x < 0) star.x = canvas.width;
				if (star.x > canvas.width) star.x = 0;
				if (star.y < 0) star.y = canvas.height;
				if (star.y > canvas.height) star.y = 0;
			});

			// Draw connecting lines between nearby stars
			ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
			ctx.lineWidth = 0.5;
			for (let i = 0; i < numStars; i++) {
				for (let j = i + 1; j < numStars; j++) {
					const dx = stars[i].x - stars[j].x;
					const dy = stars[i].y - stars[j].y;
					const distance = Math.sqrt(dx * dx + dy * dy);
					if (distance < 120) {
						const opacity = ((120 - distance) / 120) * 0.3;
						ctx.save();
						ctx.globalAlpha = opacity;
						ctx.beginPath();
						ctx.moveTo(stars[i].x, stars[i].y);
						ctx.lineTo(stars[j].x, stars[j].y);
						ctx.stroke();
						ctx.restore();
					}
				}
			}

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
		<div className='relative h-full w-full transition-colors bg-gradient-to-br from-gray-900 via-blue-900 to-black'>
			{/* Starry canvas */}
			<canvas ref={canvasRef} className='fixed inset-0 h-full w-full' style={{ zIndex: 1 }} />

			{/* Content */}
			<div className='relative z-10'>{children}</div>
		</div>
	);
}
