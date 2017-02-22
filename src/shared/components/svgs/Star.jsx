// @flow

import type { Style, VNode } from '../../../types'
import { css } from 'glamor'
import preact from 'preact'

const svg: Style = css({ marginRight: '.2em' })

const d: Array<string> = [
  'M14',
  '6l-4.9-.64L7',
  '1',
  '4.9',
  '5.36',
  '0',
  '6l3.6',
  '3.26L2.67',
  '14',
  '7',
  '11.67',
  '11.33',
  '14l-.93-4.74z',
]

const Star = (): VNode => (
  <svg
    {...svg}
    aria-hidden="true"
    height="16"
    version="1.1"
    viewBox="0 0 14 16"
    width="14"
  >
    <path d={d.join(' ')} fillRule="evenodd" />
  </svg>
)

export default Star
