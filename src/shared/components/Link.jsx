// @flow

import type { Style, VNode } from '../../types'
import { css, hover } from 'glamor'
import preact from 'preact'

type Props = {
  children?: VNode,
  styles?: Style,
  to: string,
}

const link: Style = css(
  {
    color: '#db0a5b',
    textDecoration: 'none',
    transitionDuration: '.5s',
  },
  hover({
    color: '#8a2be2',
  }),
)

const Link = ({ children, styles, to }: Props): VNode => (
  <a
    {...css(link, styles)}
    href={to}
    rel="noopener noreferrer"
    target="_blank"
  >
    {children}
  </a>
)

Link.defaultProps = {
  children: null,
  styles: {},
}

export default Link
