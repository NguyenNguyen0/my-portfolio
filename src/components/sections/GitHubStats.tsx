'use client';

import Image from 'next/image';
import GitHubCalendar from 'react-github-calendar';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Octokit } from '@octokit/rest';
import { Calendar, ExternalLink } from 'lucide-react';
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

const GITHUB_USERNAME = 'NguyenNguyen0';

export function GitHubStats() {
	const { theme } = useTheme();
	const [user, setUser] = useState<GitHubUser | null>(null);
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

			// Calculate language statistics
			const languageCount: { [key: string]: number } = {};
			reposResponse.data.forEach((repo) => {
				if (repo.language) {
					languageCount[repo.language] =
						(languageCount[repo.language] || 0) + 1;
				}
			});
		} catch (err) {
			setError('Failed to fetch GitHub data');
			console.error('GitHub API error:', err);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<section className="py-20 bg-white dark:bg-gray-900">
				<div className="container mx-auto px-4 max-w-6xl">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
						<p className="mt-4 text-gray-600 dark:text-gray-300">
							Loading GitHub stats...
						</p>
					</div>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className="py-20 bg-white dark:bg-gray-900">
				<div className="container mx-auto px-4 max-w-6xl">
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
		<section
			id="github"
			className="py-20 bg-gradient-to-b from-gray-50/40 to-white/40 dark:from-gray-800/40 dark:to-gray-900/40"
		>
			<div className="container mx-auto px-4 max-w-6xl">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
						GitHub Statistics
					</h2>
					<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
					<p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Here&apos;s an overview of my coding activity,
						contributions, and projects
					</p>
				</div>

				{/* GitHub Profile Overview */}
				{user && (
					<div className="bg-white/60 dark:bg-gray-800/60 rounded-2xl shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
						<div className="flex flex-col md:flex-row items-center gap-8">
							<div className="flex-shrink-0">
								<Image
									src={user.avatar_url}
									alt={user.name || user.login}
									width={196}
									height={196}
									className="w-32 h-32 rounded-full border-4 border-blue-500 dark:border-blue-400"
								/>
							</div>
							<div className="flex-1 text-center md:text-left">
								<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
									{user.name || user.login}
								</h3>
								<p className="text-gray-600 dark:text-gray-300 mb-4">
									@{user.login}
								</p>
								{user.bio && (
									<p className="text-gray-700 dark:text-gray-300 mb-4">
										{user.bio}
									</p>
								)}
								<a
									href={user.html_url}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
								>
									<Github className="text-xl" />
									View GitHub Profile
									<ExternalLink className="text-sm" />
								</a>
							</div>
							<div className="grid grid-cols-3 gap-4 text-center">
								<div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
									<div className="text-2xl font-bold text-gray-900 dark:text-white">
										{user.public_repos}
									</div>
									<div className="text-sm text-gray-600 dark:text-gray-300">
										Repos
									</div>
								</div>
								<div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
									<div className="text-2xl font-bold text-gray-900 dark:text-white">
										{user.followers}
									</div>
									<div className="text-sm text-gray-600 dark:text-gray-300">
										Followers
									</div>
								</div>
								<div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
									<div className="text-2xl font-bold text-gray-900 dark:text-white">
										{user.following}
									</div>
									<div className="text-sm text-gray-600 dark:text-gray-300">
										Following
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* GitHub Contribution Calendar */}
				<div className="bg-white/60 dark:bg-gray-800/60 rounded-2xl shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
					<div className="flex items-center gap-3 mb-6">
						<Calendar className="text-2xl text-blue-500 dark:text-blue-400" />
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
							Contribution Activity
						</h3>
					</div>
					<div className="overflow-x-auto">
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
