// @flow

import type { Style, VNode } from '../../types'
import { css } from 'glamor'
import preact from 'preact'

type Props = {
  children?: VNode,
  styles?: Style,
}

const h2: Style = css({
  fontSize: '1.5em',
})

const H2 = ({ children, styles }: Props): VNode => (
  <h2 {...css(h2, styles)}>{children}</h2>
)

H2.defaultProps = {
  children: null,
  styles: {},
}

export default H2
