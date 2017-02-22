const isProd = process.env.NODE_ENV === 'production'
const prefix = isProd ? 'dist/' : ''

module.exports = {
  cacheId: 'neilkistner.com-v1',
  directoryIndex: false,
  runtimeCaching: [{
    default: 'networkFirst',
  }],
  staticFileGlobs: [
    `${prefix}static/**/*.{js,json,pdf,png,woff,woff2}`,
  ],
  stripPrefix: `${prefix}static/`,
  swFilePath: `${prefix}static/sw.js`,
  verbose: true,
}
