const NextWorkboxPlugin = require('next-workbox-webpack-plugin')

const buildId = '1'

module.exports = {
  webpack: (config, { isServer, dev, buildId, config: { distDir } }) => {
    if (!isServer && !dev) {
      config.plugins.push(
        new NextWorkboxPlugin({
          buildId,
          distDir,
          importWorkboxFrom: 'cdn',
          swDest: 'service-worker.js',
          swDestRoot: `.next/static/${buildId}/pages`,
          swURLRoot: `_next/static/${buildId}/pages`,
        })
      )
    }
    return config
  },
  generateBuildId: async () => buildId,
}
