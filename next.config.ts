import offline from 'next-offline'
import withOptimizedImages from 'next-optimized-images'
import withPlugins from 'next-compose-plugins'

const offlineConfig = {
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
}

module.exports = withPlugins([[offline, offlineConfig], withOptimizedImages], {
  pageExtensions: ['tsx)(?<!test\\.tsx'],
  target: 'serverless',
  webpack: (config: Record<string, any>) => {
    config.module.rules.push({
      test: /\.pdf$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            context: '',
            outputPath: 'static',
            publicPath: '_next/static',
            name: '[path][name].[hash].[ext]',
          },
        },
      ],
    })

    return config
  },
})
