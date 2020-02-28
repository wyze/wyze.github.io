import { createRenderer } from 'fela'
import { createWebPreset } from 'fela-preset-web'
import devPreset from 'fela-preset-dev'
import namedKeys from 'fela-plugin-named-keys'
import sortMediaQueryMobileFirst from 'fela-sort-media-query-mobile-first'
import typescript from 'fela-plugin-typescript'

const dev = process.env.NODE_ENV !== 'production'

export const renderer = createRenderer({
  enhancers: [sortMediaQueryMobileFirst()],
  plugins: [
    typescript(),
    namedKeys({
      large: '@media only screen and (min-width: 1200px)',
      small: '@media only screen and (min-width: 768px)',
    }),
    ...createWebPreset({
      unit: [
        'em',
        {
          borderRadius: 'px',
          flexBasis: '%',
          gridGap: 'px',
          gridTemplateColumns: 'fr',
        },
      ],
    }),
    ...(dev ? devPreset : []),
  ],
  devMode: process.env.NODE_ENV !== 'production',
})

renderer.renderFont(
  'Lato',
  ['fonts/lato-v11-latin-300.woff', 'fonts/lato-v11-latin-300.woff2'],
  { fontDisplay: 'swap', fontWeight: 300 }
)

renderer.renderFont(
  'Lato',
  ['fonts/lato-v11-latin-regular.woff', 'fonts/lato-v11-latin-regular.woff2'],
  { fontDisplay: 'swap', fontWeight: 'regular' }
)

/* Resets */
renderer.renderStatic({ margin: 0, padding: 0 }, 'html, body, p, h1, h2, h3')
renderer.renderStatic({ fontSize: '100%', fontWeight: 400 }, 'h1, h2, h3')
renderer.renderStatic({ boxSizing: 'border-box' }, 'html')
renderer.renderStatic({ boxSizing: 'inherit' }, '*, *:after, *:before')
renderer.renderStatic({ height: 'auto', maxWidth: '100%' }, 'img')

/* Globals */
renderer.renderStatic({ height: '100%' }, 'html, body')
renderer.renderStatic(
  '-moz-osx-font-smoothing: grayscale; -webkit-font-smoothing: antialiased',
  'html'
)
renderer.renderStatic(
  {
    WebkitOverflowScrolling: 'touch',
    lineHeight: 1.45,
    overflowX: 'hidden',
    textRendering: 'optimizeLegibility',
  },
  'html'
)
renderer.renderStatic(
  {
    backgroundColor: '#4b79a1',
    backgroundImage: 'linear-gradient(-90deg, #4b79a1 0%, #283e51 100%)',
    color: 'hsl(200, 16%, 16%)',
    fontSize: 'calc(16px + 0.4vw)',
    fontFamily: 'Lato, san-serif',
  },
  'body'
)
