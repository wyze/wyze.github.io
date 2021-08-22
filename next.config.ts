import withOffline from 'next-offline'

module.exports = withOffline({
  pageExtensions:
    process.env.NODE_ENV === 'production' ? ['tsx)(?<!test\\.tsx'] : undefined,
  rewrites: () => [
    { source: '/introduction', destination: '/' },
    { source: '/social', destination: '/' },
    { source: '/core-team', destination: '/' },
    { source: '/employment', destination: '/' },
    { source: '/contributions', destination: '/' },
    { source: '/projects', destination: '/' },
    { source: '/conclusion', destination: '/' },
  ],
  target: 'serverless',
  transformManifest: (manifest: string[]) => ['/'].concat(manifest),
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
})
