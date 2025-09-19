'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Octokit } from '@octokit/rest';
import GitHubCalendar from 'react-github-calendar';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Star, Code, Eye, Calendar, PieChart as PieChartIcon, Folder, ExternalLink } from 'lucide-react';
import { Github } from 'lucide-react';

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
			className='py-20 bg-gradient-to-b from-gray-50/40 to-white/40 dark:from-gray-800/40 dark:to-gray-900/40'
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
					<div className='bg-white/60 dark:bg-gray-800/60 rounded-2xl shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700'>
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
									<Github className='text-xl' />
									View GitHub Profile
									<ExternalLink className='text-sm' />
								</a>
							</div>
							<div className='grid grid-cols-3 gap-4 text-center'>
								<div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-3'>
									<div className='text-2xl font-bold text-gray-900 dark:text-white'>
										{user.public_repos}
									</div>
									<div className='text-sm text-gray-600 dark:text-gray-300'>
										Repos
									</div>
								</div>
								<div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-3'>
									<div className='text-2xl font-bold text-gray-900 dark:text-white'>
										{user.followers}
									</div>
									<div className='text-sm text-gray-600 dark:text-gray-300'>
										Followers
									</div>
								</div>
								<div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-3'>
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
				<div className='bg-white/60 dark:bg-gray-800/60 rounded-2xl shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700'>
					<div className='flex items-center gap-3 mb-6'>
						<Calendar className='text-2xl text-blue-500 dark:text-blue-400' />
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
			</div>
		</section>
	);
}
