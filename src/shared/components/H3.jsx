// @flow

import type { Style, VNode } from '../../types'
import { css } from 'glamor'
import preact from 'preact'

type Props = {
  children?: VNode,
  styles?: Style,
}

const h3: Style = css({
  fontSize: '1.15em',
})

const H3 = ({ children, styles }: Props): VNode => (
  <h3 {...css(h3, styles)}>{children}</h3>
)

H3.defaultProps = {
  children: null,
  styles: {},
}

export default H3
