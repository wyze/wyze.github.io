// @flow

import type { Style, VNode } from '../../../types'
import { css, keyframes } from 'glamor'
import preact from 'preact'

const shrink: Style = keyframes({
  '0%': { margin: '0 5%', width: '90%' },
  '50%': { margin: '0 18%', width: '60%' },
  '100%': { margin: '0 5%', width: '90%' },
})

const shadow: Style = css({
  animation: `${shrink} 3s ease-out infinite`,
  marginTop: '1em',
  transformOrigin: 'center center',
  ellipse: {
    transformOrigin: 'center center',
  },
})

const Shadow = (): VNode => (
  <svg
    {...shadow}
    enableBackground="new 0 0 122.436 39.744"
    height="39.744px"
    viewBox="0 0 122.436 39.744"
    width="122.436px"
    x="61px"
    xmlns="http://www.w3.org/2000/svg"
    y="20px"
  >
    <ellipse cx="61.128" cy="19.872" fill="#406789" rx="49.25" ry="8.916" />
  </svg>
)

export default Shadow
