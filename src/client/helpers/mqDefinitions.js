import { dimensions } from './mappings'
import getDefinitionIndex from './getDefinitionIndex'

export default [
  {
    name: 'Breakpoint',
    dimensionIndex: getDefinitionIndex(dimensions.MQ_BREAKPOINT),
    items: [
      { name: 'sm', media: 'all' },
      { name: 'md', media: '(min-width: 53.125em)' },
      { name: 'lg', media: '(min-width: 78.75em)' },
    ],
  },
  {
    name: 'Pixel Density',
    dimensionIndex: getDefinitionIndex(dimensions.MQ_PIXEL_DENSITY),
    items: [
      { name: '1x', media: 'all' },
      { name: '1.5x', media: '(min-resolution: 144dpi)' },
      { name: '2x', media: '(min-resolution: 192dpi)' },
    ],
  },
  {
    name: 'Orientation',
    dimensionIndex: getDefinitionIndex(dimensions.MQ_ORIENTATION),
    items: [
      { name: 'landscape', media: '(orientation: landscape)' },
      { name: 'portrait', media: '(orientation: portrait)' },
    ],
  },
]
