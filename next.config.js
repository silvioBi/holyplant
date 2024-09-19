/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // Remove these lines if you're using a custom domain
    assetPrefix: process.env.NODE_ENV === 'production' ? '/holyplant' : '',
    basePath: process.env.NODE_ENV === 'production' ? '/holyplant' : '',
}

module.exports = nextConfig