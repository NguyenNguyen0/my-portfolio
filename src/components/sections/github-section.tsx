'use client';

import { motion } from 'framer-motion';
import {
	Github,
	Star,
	GitFork,
	Calendar,
	MapPin,
	LinkIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function GitHubSection() {
	// Mock GitHub data - replace with real API calls
	const githubProfile = {
		name: 'John Developer',
		username: 'johndeveloper',
		bio: 'Full-stack developer passionate about creating amazing web experiences',
		location: 'San Francisco, CA',
		website: 'https://johndeveloper.dev',
		followers: 1234,
		following: 567,
		publicRepos: 89,
		totalStars: 2456,
		totalForks: 678,
		joinedDate: '2019-03-15',
	};

	const topRepos = [
		{
			name: 'awesome-portfolio',
			description:
				'A modern portfolio template built with Next.js and Tailwind CSS',
			language: 'TypeScript',
			stars: 245,
			forks: 67,
			color: '#3178c6',
		},
		{
			name: 'react-components-lib',
			description:
				'A collection of reusable React components with TypeScript support',
			language: 'JavaScript',
			stars: 189,
			forks: 34,
			color: '#f1e05a',
		},
		{
			name: 'api-gateway-service',
			description:
				'Microservices API gateway built with Node.js and Express',
			language: 'JavaScript',
			stars: 156,
			forks: 28,
			color: '#f1e05a',
		},
		{
			name: 'ml-data-pipeline',
			description:
				'Machine learning data processing pipeline with Python',
			language: 'Python',
			stars: 134,
			forks: 45,
			color: '#3572A5',
		},
	];

	// Mock contribution data - replace with real GitHub API
	const contributionData = Array.from({ length: 365 }, (_, i) => ({
		date: new Date(Date.now() - (364 - i) * 24 * 60 * 60 * 1000),
		count: Math.floor(Math.random() * 5),
	}));

	const getContributionColor = (count: number) => {
		if (count === 0) return 'bg-muted';
		if (count === 1) return 'bg-green-200 dark:bg-green-900';
		if (count === 2) return 'bg-green-300 dark:bg-green-700';
		if (count === 3) return 'bg-green-400 dark:bg-green-600';
		return 'bg-green-500 dark:bg-green-500';
	};

	return (
		<section id="github" className="py-20 px-4">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						GitHub Activity
					</h2>
					<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
						Check out my open source contributions and projects on
						GitHub
					</p>
				</motion.div>

				<div className="grid lg:grid-cols-3 gap-8">
					{/* GitHub Profile Card */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="lg:col-span-1"
					>
						<Card className="p-6 h-fit">
							<CardContent className="p-0">
								<div className="flex items-center gap-4 mb-6">
									<div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
										<Github className="w-8 h-8 text-white" />
									</div>
									<div>
										<h3 className="font-bold text-xl">
											{githubProfile.name}
										</h3>
										<p className="text-muted-foreground">
											@{githubProfile.username}
										</p>
									</div>
								</div>

								<p className="text-sm text-muted-foreground mb-4">
									{githubProfile.bio}
								</p>

								<div className="space-y-2 mb-6">
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<MapPin size={14} />
										{githubProfile.location}
									</div>
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<LinkIcon size={14} />
										<a
											href={githubProfile.website}
											className="hover:text-foreground transition-colors"
										>
											{githubProfile.website}
										</a>
									</div>
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<Calendar size={14} />
										Joined{' '}
										{new Date(
											githubProfile.joinedDate,
										).toLocaleDateString('en-US', {
											month: 'long',
											year: 'numeric',
										})}
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4 text-center">
									<div>
										<div className="font-bold text-lg">
											{githubProfile.followers}
										</div>
										<div className="text-sm text-muted-foreground">
											Followers
										</div>
									</div>
									<div>
										<div className="font-bold text-lg">
											{githubProfile.following}
										</div>
										<div className="text-sm text-muted-foreground">
											Following
										</div>
									</div>
									<div>
										<div className="font-bold text-lg">
											{githubProfile.publicRepos}
										</div>
										<div className="text-sm text-muted-foreground">
											Repositories
										</div>
									</div>
									<div>
										<div className="font-bold text-lg">
											{githubProfile.totalStars}
										</div>
										<div className="text-sm text-muted-foreground">
											Stars
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>

					{/* Top Repositories and Contribution Calendar */}
					<div className="lg:col-span-2 space-y-8">
						{/* Top Repositories */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
						>
							<h3 className="text-2xl font-bold mb-6">
								Top Repositories
							</h3>
							<div className="grid md:grid-cols-2 gap-4">
								{topRepos.map((repo, index) => (
									<motion.div
										key={repo.name}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: index * 0.1 }}
									>
										<Card className="p-4 h-full hover:shadow-lg transition-shadow">
											<CardContent className="p-0">
												<div className="flex items-start justify-between mb-3">
													<h4 className="font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
														{repo.name}
													</h4>
													<Github
														size={16}
														className="text-muted-foreground"
													/>
												</div>
												<p className="text-sm text-muted-foreground mb-4 line-clamp-2">
													{repo.description}
												</p>
												<div className="flex items-center justify-between text-sm">
													<div className="flex items-center gap-2">
														<div
															className="w-3 h-3 rounded-full"
															style={{
																backgroundColor:
																	repo.color,
															}}
														/>
														{repo.language}
													</div>
													<div className="flex items-center gap-4">
														<div className="flex items-center gap-1">
															<Star size={14} />
															{repo.stars}
														</div>
														<div className="flex items-center gap-1">
															<GitFork
																size={14}
															/>
															{repo.forks}
														</div>
													</div>
												</div>
											</CardContent>
										</Card>
									</motion.div>
								))}
							</div>
						</motion.div>

						{/* Contribution Calendar */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
						>
							<h3 className="text-2xl font-bold mb-6">
								Contribution Activity
							</h3>
							<Card className="p-6">
								<CardContent className="p-0">
									<div className="mb-4">
										<p className="text-sm text-muted-foreground">
											{
												contributionData.filter(
													(d) => d.count > 0,
												).length
											}{' '}
											contributions in the last year
										</p>
									</div>
									<div className="overflow-x-auto">
										<div className="grid grid-cols-53 gap-1 min-w-[800px]">
											{contributionData.map(
												(day, index) => (
													<div
														key={index}
														className={`w-3 h-3 rounded-sm ${getContributionColor(day.count)}`}
														title={`${day.count} contributions on ${day.date.toDateString()}`}
													/>
												),
											)}
										</div>
									</div>
									<div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
										<span>Less</span>
										<div className="flex items-center gap-1">
											<div className="w-3 h-3 rounded-sm bg-muted" />
											<div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900" />
											<div className="w-3 h-3 rounded-sm bg-green-300 dark:bg-green-700" />
											<div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-600" />
											<div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-500" />
										</div>
										<span>More</span>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
