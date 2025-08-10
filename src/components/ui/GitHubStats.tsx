'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Octokit } from '@octokit/rest';
import GitHubCalendar from 'react-github-calendar';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { HiStar, HiCode, HiEye, HiCalendar, HiChartPie, HiFolder, HiExternalLink } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';

interface GitHubUser {
	login: string;
	name: string | null;
	bio: string | null;
	public_repos: number;
	followers: number;
	following: number;
	avatar_url: string;
	html_url: string;
}

interface Repository {
	id: number;
	name: string;
	description: string | null;
	html_url: string;
	language: string | null;
	stargazers_count: number;
	watchers_count: number;
	forks_count: number;
	updated_at: string;
	topics: string[];
}

interface LanguageStats {
	name: string;
	value: number;
	color: string;
}

const GITHUB_USERNAME = 'NguyenNguyen0';

// Language colors based on GitHub's language colors
const LANGUAGE_COLORS: { [key: string]: string } = {
	JavaScript: '#f7df1e',
	TypeScript: '#3178c6',
	Python: '#3776ab',
	Java: '#f89820',
	HTML: '#e34c26',
	CSS: '#1572b6',
	React: '#61dafb',
	'C++': '#00599c',
	C: '#555555',
	Shell: '#89e051',
	Vue: '#4fc08d',
	PHP: '#777bb4',
	Go: '#00add8',
	Rust: '#dea584',
	Swift: '#fa7343',
	Kotlin: '#7f52ff',
	Dart: '#0175c2',
	Ruby: '#cc342d',
	Scala: '#c22d40',
	'C#': '#239120',
};

export function GitHubStats() {
	const { theme } = useTheme();
	const [user, setUser] = useState<GitHubUser | null>(null);
	const [repos, setRepos] = useState<Repository[]>([]);
	const [languageStats, setLanguageStats] = useState<LanguageStats[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [showAllLanguages, setShowAllLanguages] = useState(false);
	const [showAllRepos, setShowAllRepos] = useState(false);

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
			setRepos(reposResponse.data as Repository[]);

			// Calculate language statistics
			const languageCount: { [key: string]: number } = {};
			reposResponse.data.forEach(repo => {
				if (repo.language) {
					languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
				}
			});

			const languageData = Object.entries(languageCount)
				.map(([name, value]) => ({
					name,
					value,
					color: LANGUAGE_COLORS[name] || '#8b5cf6',
				}))
				.sort((a, b) => b.value - a.value);

			setLanguageStats(languageData);
		} catch (err) {
			setError('Failed to fetch GitHub data');
			console.error('GitHub API error:', err);
		} finally {
			setLoading(false);
		}
	};

	const displayedLanguages = showAllLanguages ? languageStats : languageStats.slice(0, 6);
	const displayedRepos = showAllRepos ? repos : repos.slice(0, 3);

	// Custom tooltip for pie chart
	const CustomTooltip = ({
		active,
		payload,
	}: {
		active?: boolean;
		payload?: Array<{
			name: string;
			value: number;
		}>;
	}) => {
		if (active && payload && payload.length) {
			return (
				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-2 shadow-lg'>
					<p className='text-gray-900 dark:text-white font-medium'>{payload[0].name}</p>
					<p className='text-gray-600 dark:text-gray-300'>
						Repositories: {payload[0].value}
					</p>
				</div>
			);
		}
		return null;
	};

	if (loading) {
		return (
			<section className='py-20 bg-white dark:bg-gray-900'>
				<div className='container mx-auto px-4 max-w-6xl'>
					<div className='text-center'>
						<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto'></div>
						<p className='mt-4 text-gray-600 dark:text-gray-300'>
							Loading GitHub stats...
						</p>
					</div>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className='py-20 bg-white dark:bg-gray-900'>
				<div className='container mx-auto px-4 max-w-6xl'>
					<div className='text-center'>
						<p className='text-red-500 dark:text-red-400'>{error}</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section
			id='github'
			className='py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900'
		>
			<div className='container mx-auto px-4 max-w-6xl'>
				{/* Header */}
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
						GitHub Statistics
					</h2>
					<div className='w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full'></div>
					<p className='mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
						Here&apos;s an overview of my coding activity, contributions, and
						projects
					</p>
				</div>

				{/* GitHub Profile Overview */}
				{user && (
					<div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700'>
						<div className='flex flex-col md:flex-row items-center gap-8'>
							<div className='flex-shrink-0'>
								<Image
									src={user.avatar_url}
									alt={user.name || user.login}
									width={196}
									height={196}
									className='w-32 h-32 rounded-full border-4 border-blue-500 dark:border-blue-400'
								/>
							</div>
							<div className='flex-1 text-center md:text-left'>
								<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
									{user.name || user.login}
								</h3>
								<p className='text-gray-600 dark:text-gray-300 mb-4'>
									@{user.login}
								</p>
								{user.bio && (
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										{user.bio}
									</p>
								)}
								<a
									href={user.html_url}
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors'
								>
									<FaGithub className='text-xl' />
									View GitHub Profile
									<HiExternalLink className='text-sm' />
								</a>
							</div>
							<div className='grid grid-cols-3 gap-6 text-center'>
								<div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4'>
									<div className='text-2xl font-bold text-gray-900 dark:text-white'>
										{user.public_repos}
									</div>
									<div className='text-sm text-gray-600 dark:text-gray-300'>
										Repositories
									</div>
								</div>
								<div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4'>
									<div className='text-2xl font-bold text-gray-900 dark:text-white'>
										{user.followers}
									</div>
									<div className='text-sm text-gray-600 dark:text-gray-300'>
										Followers
									</div>
								</div>
								<div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4'>
									<div className='text-2xl font-bold text-gray-900 dark:text-white'>
										{user.following}
									</div>
									<div className='text-sm text-gray-600 dark:text-gray-300'>
										Following
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* GitHub Contribution Calendar */}
				<div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700'>
					<div className='flex items-center gap-3 mb-6'>
						<HiCalendar className='text-2xl text-blue-500 dark:text-blue-400' />
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
							Contribution Activity
						</h3>
					</div>
					<div className='overflow-x-auto'>
						<GitHubCalendar
							username={GITHUB_USERNAME}
							colorScheme={theme === 'dark' ? 'dark' : 'light'}
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
				</div>

				<div className='grid lg:grid-cols-2 gap-12 mb-12'>
					{/* Language Statistics */}
					<div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center gap-3 mb-6'>
							<HiChartPie className='text-2xl text-purple-500 dark:text-purple-400' />
							<h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
								Language Statistics
							</h3>
						</div>
						{languageStats.length > 0 ? (
							<div className='space-y-6'>
								<div className='h-64'>
									<ResponsiveContainer width='100%' height='100%'>
										<PieChart>
											<Pie
												data={
													displayedLanguages
												}
												cx='50%'
												cy='50%'
												outerRadius={80}
												dataKey='value'
											>
												{displayedLanguages.map(
													(
														entry,
														index
													) => (
														<Cell
															key={`cell-${index}`}
															fill={
																entry.color
															}
														/>
													)
												)}
											</Pie>
											<Tooltip
												content={
													<CustomTooltip />
												}
											/>
										</PieChart>
									</ResponsiveContainer>
								</div>
								<div className='grid grid-cols-2 gap-2'>
									{displayedLanguages.map((lang, index) => (
										<div
											key={index}
											className='flex items-center gap-2'
										>
											<div
												className='w-3 h-3 rounded-full'
												style={{
													backgroundColor:
														lang.color,
												}}
											></div>
											<span className='text-sm text-gray-600 dark:text-gray-300'>
												{lang.name} (
												{lang.value})
											</span>
										</div>
									))}
								</div>
								{languageStats.length > 6 && (
									<button
										onClick={() =>
											setShowAllLanguages(
												!showAllLanguages
											)
										}
										className='w-full mt-4 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors'
									>
										{showAllLanguages
											? 'Show Less'
											: `Show More (${languageStats.length - 6} more)`}
									</button>
								)}
							</div>
						) : (
							<p className='text-gray-600 dark:text-gray-300'>
								No language data available
							</p>
						)}
					</div>

					{/* Activity Overview */}
					<div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center gap-3 mb-6'>
							<HiCode className='text-2xl text-green-500 dark:text-green-400' />
							<h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
								Activity Overview
							</h3>
						</div>
						<div className='space-y-4'>
							<div className='flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
								<div className='flex items-center gap-3'>
									<HiFolder className='text-xl text-blue-500 dark:text-blue-400' />
									<span className='text-gray-700 dark:text-gray-300'>
										Total Repositories
									</span>
								</div>
								<span className='text-xl font-semibold text-gray-900 dark:text-white'>
									{repos.length}
								</span>
							</div>
							<div className='flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
								<div className='flex items-center gap-3'>
									<HiStar className='text-xl text-yellow-500 dark:text-yellow-400' />
									<span className='text-gray-700 dark:text-gray-300'>
										Total Stars
									</span>
								</div>
								<span className='text-xl font-semibold text-gray-900 dark:text-white'>
									{repos.reduce(
										(acc, repo) =>
											acc + repo.stargazers_count,
										0
									)}
								</span>
							</div>
							<div className='flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
								<div className='flex items-center gap-3'>
									<HiEye className='text-xl text-purple-500 dark:text-purple-400' />
									<span className='text-gray-700 dark:text-gray-300'>
										Total Watchers
									</span>
								</div>
								<span className='text-xl font-semibold text-gray-900 dark:text-white'>
									{repos.reduce(
										(acc, repo) =>
											acc + repo.watchers_count,
										0
									)}
								</span>
							</div>
							<div className='flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
								<div className='flex items-center gap-3'>
									<HiCode className='text-xl text-green-500 dark:text-green-400' />
									<span className='text-gray-700 dark:text-gray-300'>
										Languages Used
									</span>
								</div>
								<span className='text-xl font-semibold text-gray-900 dark:text-white'>
									{languageStats.length}
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* GitHub Repositories */}
				<div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700'>
					<div className='flex items-center gap-3 mb-6'>
						<HiFolder className='text-2xl text-blue-500 dark:text-blue-400' />
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
							Recent Repositories
						</h3>
					</div>
					<div className='grid md:grid-cols-2 xl:grid-cols-3 gap-6'>
						{displayedRepos.map(repo => (
							<div
								key={repo.id}
								className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow'
							>
								<div className='flex items-start justify-between mb-3'>
									<h4 className='font-semibold text-gray-900 dark:text-white truncate'>
										{repo.name}
									</h4>
									<a
										href={repo.html_url}
										target='_blank'
										rel='noopener noreferrer'
										className='text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors'
									>
										<HiExternalLink className='text-lg' />
									</a>
								</div>
								<p className='text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3'>
									{repo.description || 'No description available'}
								</p>
								<div className='flex items-center justify-between text-sm'>
									<div className='flex items-center gap-4'>
										{repo.language && (
											<div className='flex items-center gap-1'>
												<div
													className='w-3 h-3 rounded-full'
													style={{
														backgroundColor:
															LANGUAGE_COLORS[
																repo
																	.language
															] ||
															'#8b5cf6',
													}}
												></div>
												<span className='text-gray-600 dark:text-gray-300'>
													{repo.language}
												</span>
											</div>
										)}
										<div className='flex items-center gap-1 text-gray-500 dark:text-gray-400'>
											<HiStar className='text-xs' />
											<span>
												{repo.stargazers_count}
											</span>
										</div>
									</div>
									<div className='text-gray-500 dark:text-gray-400'>
										{new Date(
											repo.updated_at
										).toLocaleDateString()}
									</div>
								</div>
								{repo.topics.length > 0 && (
									<div className='flex flex-wrap gap-1 mt-3'>
										{repo.topics.slice(0, 3).map(topic => (
											<span
												key={topic}
												className='px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full'
											>
												{topic}
											</span>
										))}
										{repo.topics.length > 3 && (
											<span className='px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs rounded-full'>
												+
												{repo.topics.length - 3}
											</span>
										)}
									</div>
								)}
							</div>
						))}
					</div>
					{repos.length > 3 && (
						<div className='text-center mt-8'>
							<button
								onClick={() => setShowAllRepos(!showAllRepos)}
								className='px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors'
							>
								{showAllRepos
									? 'Show Less'
									: `Show More (${repos.length - 3} more repositories)`}
							</button>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
