// D:\opal-spa-website\next.config.mjs

// Import withPWA for .mjs configuration
import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['http://192.168.100.13:3000', 'http://localhost:3000'],
  // You can add other Next.js specific configurations here if you have any
  // For example:
  // images: {
  //   domains: ['example.com'], // If you use external images
  // },
};

// Wrap the nextConfig with withPWA
const pwaConfig = withPWA({
  dest: 'public', // Output directory for the service worker and manifest
  register: true, // Register the service worker
  skipWaiting: true, // Activate the service worker immediately
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development mode
})(nextConfig); // Apply withPWA to your existing config

export default pwaConfig;