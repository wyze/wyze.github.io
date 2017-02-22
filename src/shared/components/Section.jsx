// @flow

import type { Style, VNode } from '../../types'
import { css } from 'glamor'
import preact from 'preact'

type Props = {
  center?: boolean,
  children?: VNode,
  styles?: Style,
}

const centered: Style = css({
  textAlign: 'center',
})

const Section = ({ center, children, styles }: Props): VNode => (
  <div {...css(center && centered, styles)}>
    {children}
  </div>
)

Section.defaultProps = {
  center: true,
  children: null,
  styles: {},
}

export default Section
