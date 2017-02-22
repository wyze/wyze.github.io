// @flow

import type { Style, VNode } from '../../types'
import { css } from 'glamor'
import preact from 'preact'

type Props = {
  children?: VNode,
  styles?: Style,
}

const h1: Style = css({
  fontSize: '2em',
})

const H1 = ({ children, styles }: Props): VNode => (
  <h1 {...css(h1, styles)}>{children}</h1>
)

H1.defaultProps = {
  children: null,
  styles: {},
}

export default H1
