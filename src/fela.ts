import { createRenderer } from 'fela'
import devPreset from 'fela-preset-dev'
import typescript from 'fela-plugin-typescript'
import webPreset from 'fela-preset-web'

const dev = process.env.NODE_ENV !== 'production'

export const renderer = createRenderer({
  plugins: [typescript(), ...webPreset, ...(dev ? devPreset : [])],
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
