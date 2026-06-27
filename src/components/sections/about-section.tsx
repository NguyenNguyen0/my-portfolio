'use client';

import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { personalInfo, technicalSkills } from '@/data/personalInfo';
import { techIcons } from '@/data/techIcons';

const fadeUp: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stagger: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.07 } },
};

const skillVariantMap: Record<string, string> = {
	primary: 'border-secondary/60 bg-secondary/10 text-secondary-foreground',
	secondary: 'border-primary/60 bg-primary/10 text-primary-foreground',
	accent: 'border-accent/60 bg-accent/10 text-accent-foreground',
};

export const AboutSection = () => {
	const shouldReduce = useReducedMotion();

	return (
		<section className="py-16 sm:py-24 px-4 max-w-7xl mx-auto" id="about">
			{/* Heading */}
			<motion.div
				variants={fadeUp}
				initial={shouldReduce ? false : 'hidden'}
				whileInView="visible"
				viewport={{ once: true }}
				className="mb-12 sm:mb-16"
			>
				<p className="font-pixel text-[10px] text-primary mb-3 tracking-widest">
					ABOUT
				</p>
				<h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground leading-relaxed">
					WHO AM I
				</h2>
			</motion.div>

			<div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
				{/* Left: Avatar + Bio */}
				<motion.div
					variants={fadeUp}
					initial={shouldReduce ? false : 'hidden'}
					whileInView="visible"
					viewport={{ once: true }}
					className="space-y-8"
				>
					{/* Avatar */}
					<div className="pixel-card p-6 flex items-center gap-6">
						<div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-dotted border-primary">
							<Image
								width={96}
								height={96}
								src="/avatar.jpg"
								alt="Nguyễn Trung Nguyên — Backend Developer"
								className="w-full h-full object-cover"
								priority
								quality={90}
							/>
						</div>
						<div>
							<p className="font-[family-name:var(--font-be-vietnam-pro)] text-base font-semibold text-foreground mb-1">
								Nguyễn Trung Nguyên
							</p>
							<p className="font-pixel text-[9px] text-primary tracking-wide">
								BACKEND DEVELOPER
							</p>
						</div>
					</div>

					{/* Bio */}
					<p className="font-mono-custom text-sm text-muted-foreground leading-relaxed">
						Tôi là một developer đam mê xây dựng các giải pháp kỹ
						thuật sạch và hiệu quả. Từ thiết kế RESTful APIs đến
						tích hợp AI, mục tiêu luôn là code dễ bảo trì và
						trải nghiệm người dùng mượt mà.
					</p>

					{/* Info rows */}
					<motion.div
						variants={stagger}
						initial={shouldReduce ? false : 'hidden'}
						whileInView="visible"
						viewport={{ once: true }}
						className="space-y-3"
					>
						{personalInfo.map((info) => (
							<motion.div
								key={info.label}
								variants={fadeUp}
								className="pixel-card flex items-start gap-3 p-4"
							>
								<div className="flex-shrink-0 text-primary mt-0.5">
									{info.icon}
								</div>
								<div>
									<p className="font-pixel text-[9px] text-muted-foreground mb-1 tracking-wide">
										{info.label.toUpperCase()}
									</p>
									<p className="font-mono-custom text-sm text-foreground leading-relaxed">
										{info.value}
									</p>
								</div>
							</motion.div>
						))}
					</motion.div>
				</motion.div>

				{/* Right: Skills */}
				<motion.div
					variants={stagger}
					initial={shouldReduce ? false : 'hidden'}
					whileInView="visible"
					viewport={{ once: true }}
					className="space-y-8"
				>
					{technicalSkills.map((category) => (
						<motion.div
							key={category.title}
							variants={fadeUp}
							className="space-y-3"
						>
							<p className="font-pixel text-[10px] text-muted-foreground tracking-widest">
								{category.title.toUpperCase()}
							</p>
							<div className="flex flex-wrap gap-2">
								{category.skills.map((skill) => {
									const icon = techIcons[skill];
									const variantClass =
										skillVariantMap[category.variant] ||
										'border-border bg-muted text-muted-foreground';

									return (
										<div
											key={skill}
											className={`flex items-center gap-1.5 px-3 py-1.5 border border-dotted text-xs font-mono-custom transition-all duration-150 hover:-translate-y-0.5 hover:border-solid cursor-default ${variantClass}`}
										>
											{icon && (
												<Image
													src={icon.iconPath}
													alt={skill}
													width={14}
													height={14}
													className="object-contain flex-shrink-0"
												/>
											)}
											{skill}
										</div>
									);
								})}
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};
