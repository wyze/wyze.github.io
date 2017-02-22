// @flow

import { fontFace, insertGlobal, insertRule } from 'glamor'

type Rule = [ string, { [ key: string ]: string | number } ]

type Font = {
  desc: string,
  suffix: string,
  weight: number,
}

const fonts = [
  { desc: 'Light', suffix: '300', weight: 300 },
  { desc: 'Regular', suffix: 'regular', weight: 400 },
]

const makeFontUrl = ( format: string, suffix: string ): string =>
  `url('/fonts/lato-v11-latin-${suffix}.${format}') format('${format}')`

fonts.forEach(( { desc, suffix, weight }: Font ): void =>
  fontFace({
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: weight,
    src: `local('Lato ${desc}'), local('Lato-${desc}'),
          ${makeFontUrl('woff2', suffix)},
          ${makeFontUrl('woff', suffix)}`,
  }),
)

// Do the styles
const rules: Array<Rule> = [
  /* Resets */
  // Blocks
  [ 'html,body,p,h1,h2,h3', { margin: 0, padding: 0 }],

  // Headings
  [ 'h1,h2,h3', { fontSize: '100%', fontWeight: 'normal' }],

  // Box sizing
  [ 'html', { boxSizing: 'border-box' }],
  [ '*,*:after,*:before', { boxSizing: 'inherit' }],

  // Media
  [ 'img', { height: 'auto', maxWidth: '100%' }],

  /* Global Styles */
  [ ':root', { fontSize: '.75em' }],
  [ 'html,body', { height: '100%' }],
  [ 'html', {
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
    WebkitOverflowScrolling: 'touch',
    lineHeight: 1.45,
    overflowX: 'hidden',
    textRendering: 'optimizeLegibility',
  }],
  [ 'body', {
    background: '#4b79a1',
    backgroundImage: 'linear-gradient(to left, #4b79a1 , #283e51)',
    color: '#242424',
    fontFamily: 'Lato, san-serif',
  }],
]

rules.forEach(( rule: Rule ): void => insertGlobal(...rule))

// Media queries for fluid font sizes
const medias: Array<string> = [
  `@media only screen and (min-width: 25em) and (max-width: 93.75em) {
    :root {
      font-size: calc(.75em + (18 - 12) * ((100vw - 25em) / (1500 - 400)))
    }
  }`,
  `@media only screen and (min-width: 93.75em) {
    :root { font-size: 1.125em }
  }`,
]

medias.forEach(( media: string ): void => insertRule(media))
