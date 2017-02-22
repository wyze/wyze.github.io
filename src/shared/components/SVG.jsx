// @flow

import type { VNode } from '../../types'
import preact from 'preact'

type Props = {
  children?: VNode,
  height: number,
  width: number,
}

const SVG = ({ children, height, width }: Props): VNode => (
  <svg
    height="100%"
    viewBox={`0 0 ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
)

SVG.defaultProps = {
  children: null,
}

export default SVG
