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
})
