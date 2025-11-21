/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // For mobile app, we'll use server mode with Capacitor server
  images: {
    unoptimized: true,
  },
}
module.exports = nextConfig
