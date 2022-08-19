/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/u',
        destination: '/u/dashboard',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
