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
import GitHubCalendar from 'react-github-calendar';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Octokit } from '@octokit/rest';
import Image from 'next/image';

interface GitHubUser {
	login: string;
	name: string | null;
	bio: string | null;
	public_repos: number;
	followers: number;
	following: number;
	avatar_url: string;
	html_url: string;
	location?: string | null;
	blog?: string | null;
	created_at: string;
}

interface GitHubRepo {
	name: string;
	description: string | null;
	language: string | null;
	stargazers_count: number;
	forks_count: number;
	html_url: string;
}

// Language colors map
const languageColors: { [key: string]: string } = {
	TypeScript: '#3178c6',
	JavaScript: '#f1e05a',
	Python: '#3572A5',
	Java: '#b07219',
	HTML: '#e34c26',
	CSS: '#563d7c',
	Go: '#00ADD8',
	'C#': '#178600',
	PHP: '#4F5D95',
	Ruby: '#701516',
	Swift: '#ffac45',
	Kotlin: '#A97BFF',
	Rust: '#dea584',
	Dart: '#00B4AB',
};

const GITHUB_USERNAME = 'NguyenNguyen0';

export function GitHubSection() {
	const { theme } = useTheme();
	const [user, setUser] = useState<GitHubUser | null>(null);
	const [topRepos, setTopRepos] = useState<GitHubRepo[]>([]);
	const [totalStars, setTotalStars] = useState(0);
	const [totalForks, setTotalForks] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchGitHubData();
	}, []);

	const fetchGitHubData = async () => {
		try {
			const octokit = new Octokit();

			// Fetch user data
			const userResponse = await octokit.rest.users.getByUsername({
				username: GITHUB_USERNAME,
			});

			setUser(userResponse.data as GitHubUser);

			// Fetch repositories
			const reposResponse = await octokit.rest.repos.listForUser({
				username: GITHUB_USERNAME,
				sort: 'updated',
				per_page: 100,
			});

			// Calculate total stars and forks
			let stars = 0;
			let forks = 0;

			reposResponse.data.forEach((repo) => {
				stars += repo.stargazers_count || 0;
				forks += repo.forks_count || 0;
			});

			setTotalStars(stars);
			setTotalForks(forks);

			// Get top repos by stars
			const sortedRepos = [...reposResponse.data]
				.sort(
					(a, b) =>
						(b.stargazers_count || 0) - (a.stargazers_count || 0),
				)
				.slice(0, 4);

			setTopRepos(sortedRepos as GitHubRepo[]);
		} catch (err) {
			setError('Failed to fetch GitHub data');
			console.error('GitHub API error:', err);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<section id="github" className="py-20 px-4">
				<div className="max-w-7xl mx-auto">
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
						<p className="ml-4 text-muted-foreground">
							Loading GitHub data...
						</p>
					</div>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section id="github" className="py-20 px-4">
				<div className="max-w-7xl mx-auto">
					<div className="text-center">
						<p className="text-red-500 dark:text-red-400">
							{error}
						</p>
					</div>
				</div>
			</section>
		);
	}

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

				{user && (
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
										<div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
											<Image
												src={user.avatar_url}
												alt={user.name || user.login}
												width={64}
												height={64}
												className="w-full h-full object-cover"
											/>
										</div>
										<div>
											<h3 className="font-bold text-xl">
												{user.name || user.login}
											</h3>
											<p className="text-muted-foreground">
												@{user.login}
											</p>
										</div>
									</div>

									<p className="text-sm text-muted-foreground mb-4">
										{user.bio}
									</p>

									<div className="space-y-2 mb-6">
										{user.location && (
											<div className="flex items-center gap-2 text-sm text-muted-foreground">
												<MapPin size={14} />
												{user.location}
											</div>
										)}
										{user.blog && (
											<div className="flex items-center gap-2 text-sm text-muted-foreground">
												<LinkIcon size={14} />
												<a
													href={
														user.blog.startsWith(
															'http',
														)
															? user.blog
															: `https://${user.blog}`
													}
													target="_blank"
													rel="noopener noreferrer"
													className="hover:text-foreground transition-colors"
												>
													{user.blog}
												</a>
											</div>
										)}
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<Calendar size={14} />
											Joined{' '}
											{new Date(
												user.created_at,
											).toLocaleDateString('en-US', {
												month: 'long',
												year: 'numeric',
											})}
										</div>
									</div>

									<div className="grid grid-cols-2 gap-4 text-center">
										<div>
											<div className="font-bold text-lg">
												{user.followers}
											</div>
											<div className="text-sm text-muted-foreground">
												Followers
											</div>
										</div>
										<div>
											<div className="font-bold text-lg">
												{user.following}
											</div>
											<div className="text-sm text-muted-foreground">
												Following
											</div>
										</div>
										<div>
											<div className="font-bold text-lg">
												{user.public_repos}
											</div>
											<div className="text-sm text-muted-foreground">
												Repositories
											</div>
										</div>
										<div>
											<div className="font-bold text-lg">
												{totalStars}
											</div>
											<div className="text-sm text-muted-foreground">
												Stars
											</div>
										</div>
										<div className="col-span-2">
											<div className="font-bold text-lg">
												{totalForks}
											</div>
											<div className="text-sm text-muted-foreground">
												Forks
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
														<a
															href={repo.html_url}
															target="_blank"
															rel="noopener noreferrer"
															className="font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
														>
															{repo.name}
														</a>
														<Github
															size={16}
															className="text-muted-foreground"
														/>
													</div>
													<p className="text-sm text-muted-foreground mb-4 line-clamp-2">
														{repo.description ||
															'No description available'}
													</p>
													<div className="flex items-center justify-between text-sm">
														{repo.language && (
															<div className="flex items-center gap-2">
																<div
																	className="w-3 h-3 rounded-full"
																	style={{
																		backgroundColor:
																			languageColors[
																				repo
																					.language
																			] ||
																			'#858585',
																	}}
																/>
																{repo.language}
															</div>
														)}
														<div className="flex items-center gap-4">
															<div className="flex items-center gap-1">
																<Star
																	size={14}
																/>
																{
																	repo.stargazers_count
																}
															</div>
															<div className="flex items-center gap-1">
																<GitFork
																	size={14}
																/>
																{
																	repo.forks_count
																}
															</div>
														</div>
													</div>
												</CardContent>
											</Card>
										</motion.div>
									))}
								</div>
							</motion.div>

							{/* GitHub Contribution Calendar */}
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
										<div className="overflow-x-auto">
											<GitHubCalendar
												username={GITHUB_USERNAME}
												colorScheme={
													theme === 'dark'
														? 'dark'
														: 'light'
												}
												fontSize={12}
												blockSize={12}
												blockMargin={2}
												theme={{
													light: [
														'#ebedf0',
														'#9be9a8',
														'#40c463',
														'#30a14e',
														'#216e39',
													],
													dark: [
														'#161b22',
														'#0e4429',
														'#006d32',
														'#26a641',
														'#39d353',
													],
												}}
											/>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
