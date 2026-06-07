/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

// Extract repo name for GitHub Pages basePath
// Format of GITHUB_REPOSITORY is "username/repo-name"
const repo = process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` : '';

const nextConfig = {
  output: 'export',
  // Only apply basePath/assetPrefix in production and if we're on GitHub Actions
  basePath: isProd && process.env.GITHUB_ACTIONS ? repo : '',
  assetPrefix: isProd && process.env.GITHUB_ACTIONS ? repo : '',
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes for static export compatibility with GitHub Pages
  trailingSlash: true,
};

export default nextConfig;
