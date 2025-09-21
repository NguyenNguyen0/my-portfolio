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
		formats: ['image/avif', 'image/webp'],
		minimumCacheTTL: 60,
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},
	experimental: {
		optimizeCss: true,
	},
	poweredByHeader: false,
	reactStrictMode: true,
	compress: true,
	output: 'standalone',
	distDir: '.next',
	productionBrowserSourceMaps: false,
	staticPageGenerationTimeout: 120,
	eslint: {
		ignoreDuringBuilds: false,
	},
	typescript: {
		ignoreBuildErrors: false,
	},
};

export default nextConfig;
