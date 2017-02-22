// @flow

type Props = {
  css: string,
  html: string,
}

const minify = ( text: string ): string =>
  text.replace('\n', '').replace(/\s\s+/g, ' ').replace(/> </g, '><')
const isProd = process.env.NODE_ENV === 'production'
const description = minify(`Neil Kistner is a self taught software engineer
  focused mainly on web applications. He loves open source and contributes to
  projects like Yarn and Tessel.`)
const url = 'https://neilkistner.com'
const image = `${url}/img/me-large.png`
const title = 'Neil Kistner | St. Louis Software Engineer'
/* istanbul ignore next */
const script = `analytics${isProd ? '' : '_debug'}`

/* eslint-disable max-len */
const template = ({ css, html }: Props): string => minify(`
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <title>${title}</title>

      <meta name="description" content="${description}">
      <meta name="author" content="Neil Kistner">

      <link href="https://twitter.com/wyze" rel="author">
      <link href="${url}" rel="canonical">

      <link href="manifest.json" rel="manifest">
      <link href="/favicons/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180">
      <link href="/favicons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32">
      <link href="/favicons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16">
      <link href="/favicons/safari-pinned-tab.svg" rel="mask-icon" color="#4b79a1">
      <meta name="theme-color" content="#4b79a1">

      <!-- Facebook -->
      <meta property="fb:app_id" content="1311149718937877">
      <meta property="og:description" content="${description}">
      <meta property="og:image" content="${image}">
      <meta property="og:title" content="${title}">
      <meta property="og:url" content="${url}">

      <!-- Twitter -->
      <meta name="twitter:card" content="summary">
      <meta name="twitter:description" content="${description}">
      <meta name="twitter:image" content="${image}">
      <meta name="twitter:site" content="@wyze">
      <meta name="twitter:title" content="${title}">

      <!-- Google+ -->
      <link href="https://plus.google.com/112662872265561195218" rel="publisher">
      <meta itemprop="description" content="${description}">
      <meta itemprop="image" content="${image}">
      <meta itemprop="name" content="${title}">

      <style>${css}</style>
    </head>
    <body>
      ${html}
      <script>(function(){${String(isProd)} && navigator.onLine && 'serviceWorker' in navigator && navigator.serviceWorker.register('/sw.js')})()</script>
      <script>(function(G,o,O,g,l){G.GoogleAnalyticsObject=O;G[O]||(G[O]=function(){(G[O].q=G[O].q||[]).push(arguments)});G[O].l=+new Date;g=o.createElement('script'),l=o.scripts[0];g.src='https://www.google-analytics.com/${script}.js';window.addEventListener('scroll',function(){l.parentNode.insertBefore(g,l)})}(this,document,'ga'))</script>
      <script defer src="/js/js.js"></script>
    </body>
  </html>`)
/* eslint-enable */

export default template
