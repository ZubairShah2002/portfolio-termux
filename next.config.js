/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },

  swcMinify: false, // 🔥 penting untuk Termux
}

module.exports = nextConfig

