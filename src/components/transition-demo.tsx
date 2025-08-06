'use client';

import { motion } from 'framer-motion';

export function TransitionDemo() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: 'spring' as const,
				stiffness: 100,
			},
		},
	};

	const circleVariants = {
		hover: {
			scale: 1.1,
			rotate: 360,
			transition: {
				type: 'spring' as const,
				stiffness: 300,
				damping: 10,
			},
		},
	};

	return (
		<motion.div
			className='mt-8 space-y-4'
			initial='hidden'
			animate='visible'
			variants={containerVariants}
		>
			<motion.h3
				className='text-lg font-semibold text-gray-900 dark:text-white'
				initial={{ x: -50, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{
					delay: 0.1,
					type: 'spring',
					stiffness: 100,
				}}
			>
				Transition Demo
			</motion.h3>
			<motion.div
				className='grid gap-4 md:grid-cols-3'
				variants={containerVariants}
			>
				<motion.div
					className='rounded-lg bg-blue-100 p-4 dark:bg-blue-900 cursor-pointer'
					variants={itemVariants}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<motion.div
						className='h-16 w-16 rounded-full bg-blue-500 dark:bg-blue-400'
						variants={circleVariants}
						whileHover='hover'
					></motion.div>
					<motion.p
						className='mt-2 text-blue-800 dark:text-blue-200'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8 }}
					>
						Blue Element
					</motion.p>
				</motion.div>
				<motion.div
					className='rounded-lg bg-green-100 p-4 dark:bg-green-900 cursor-pointer'
					variants={itemVariants}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<motion.div
						className='h-16 w-16 rounded-full bg-green-500 dark:bg-green-400'
						variants={circleVariants}
						whileHover='hover'
					></motion.div>
					<motion.p
						className='mt-2 text-green-800 dark:text-green-200'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1.0 }}
					>
						Green Element
					</motion.p>
				</motion.div>
				<motion.div
					className='rounded-lg bg-purple-100 p-4 dark:bg-purple-900 cursor-pointer'
					variants={itemVariants}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<motion.div
						className='h-16 w-16 rounded-full bg-purple-500 dark:bg-purple-400'
						variants={circleVariants}
						whileHover='hover'
					></motion.div>
					<motion.p
						className='mt-2 text-purple-800 dark:text-purple-200'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1.2 }}
					>
						Purple Element
					</motion.p>
				</motion.div>
			</motion.div>
		</motion.div>
	);
}
