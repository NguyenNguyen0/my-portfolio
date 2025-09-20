'use client';
import Image from 'next/image';
import { TextReveal } from '@/components/ui/text-reveal';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { motion } from 'framer-motion';
import { personalInfo, technicalSkills, softSkills } from '@/data/personalInfo';
import { techIcons } from '@/data/techIcons';

export const AboutSection = () => {
	return (
		<section className="py-20 px-4 max-w-7xl mx-auto" id="about">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}
				className="text-center mb-16"
			>
				<h2 className="text-4xl md:text-5xl font-bold mb-8">
					About Me
				</h2>
			</motion.div>

			<div className="grid md:grid-cols-2 gap-12 items-start">
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="space-y-8"
				>
					<SpotlightCard className="h-80 flex-col items-center justify-center">
						<Image
							width={256}
							height={256}
							src="/avatar.jpg"
							alt="Developer Portrait"
							className="w-64 h-64 rounded-full object-cover m-auto"
						/>
					</SpotlightCard>

					<div className="space-y-6">
						<TextReveal
							text="I'm a passionate full-stack developer with experience creating digital solutions that make a difference. I love turning complex problems into simple, beautiful, and intuitive designs."
							className="text-lg leading-relaxed text-muted-foreground"
						/>

						<div className="grid gap-4">
							{personalInfo.map((info, index) => (
								<motion.div
									key={info.label}
									initial={{ opacity: 0, y: 10 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.5,
										delay: index * 0.1,
									}}
									viewport={{ once: true }}
									className="flex items-start gap-3 p-3 rounded-lg border bg-card/50"
								>
									<div className="shrink-0 rounded-full p-2 bg-primary/10 text-primary">
										{info.icon}
									</div>
									<div>
										<h4 className="font-medium">
											{info.label}
										</h4>
										<p className="text-sm text-muted-foreground">
											{info.value}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 20 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="space-y-8"
				>
					<h3 className="text-2xl font-semibold">Technical Skills</h3>

					{technicalSkills.map((category, catIndex) => (
						<motion.div
							key={category.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.5,
								delay: catIndex * 0.15,
							}}
							viewport={{ once: true }}
							className="space-y-3"
						>
							<h4 className="text-lg font-medium">
								{category.title}
							</h4>
							<div className="flex flex-wrap gap-3">
								{category.skills.map((skill, index) => {
									const techIcon = techIcons[skill];
									return (
										<motion.div
											key={skill}
											initial={{ opacity: 0, scale: 0.8 }}
											whileInView={{
												opacity: 1,
												scale: 1,
											}}
											transition={{
												duration: 0.5,
												delay:
													index * 0.05 +
													catIndex * 0.1,
											}}
											viewport={{ once: true }}
											className={`px-3 py-2 rounded-full text-sm font-medium border flex items-center gap-2 ${techIcon?.borderColor || 'border-primary/20'} ${techIcon?.bgColor || 'bg-primary/5'}`}
											whileHover={{ scale: 1.05 }}
										>
											{techIcon && (
												<Image
													src={techIcon.iconPath}
													alt={skill}
													width={16}
													height={16}
													className="w-4 h-4"
												/>
											)}
											<span>{skill}</span>
										</motion.div>
									);
								})}
							</div>
						</motion.div>
					))}

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.6 }}
						viewport={{ once: true }}
					>
						<h3 className="text-2xl font-semibold mb-4">
							Soft Skills
						</h3>
						{softSkills.map((category) => (
							<div
								key={category.title}
								className="space-y-3 mb-4"
							>
								<h4 className="text-lg font-medium">
									{category.title}
								</h4>
								<div className="space-y-2">
									{category.skills.map((skill, index) => (
										<motion.div
											key={skill}
											initial={{ opacity: 0, x: -10 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{
												duration: 0.5,
												delay: index * 0.1,
											}}
											viewport={{ once: true }}
											className="flex items-center gap-2"
										>
											<div className="w-2 h-2 rounded-full bg-primary"></div>
											<span className="text-muted-foreground">
												{skill}
											</span>
										</motion.div>
									))}
								</div>
							</div>
						))}
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};
