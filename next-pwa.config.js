/** @type {import('next-pwa').PWAConfig} */
module.exports = {
  dest: 'public', // Service worker and precache files will go here
  register: true, // Auto-register service worker
  skipWaiting: true, // Immediately activate new SW
  disable: process.env.NODE_ENV === 'development', // Disable in dev
  maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB for large images
  buildExcludes: [/middleware-manifest.json$/], // Exclude unnecessary files
  runtimeCaching: [
    {
      urlPattern: /^https?.*\.(png|jpg|jpeg|gif|svg|webp|avif|mp4)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-v1',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    {
      urlPattern: /^https?.*\.(js|css|json|woff2?)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-resources-v1',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
  ],
};
