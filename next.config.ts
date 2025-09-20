import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
				pathname: '/u/**',
			},
			{
				protocol: 'https',
				hostname: 'github.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'github.githubassets.com',
				port: '',
				pathname: '/**',
			},
		],
	},
	experimental: {
		optimizeCss: true,
	},
};

export default nextConfig;
