// @flow

import type { Style, VNode } from '../../types'
import { css } from 'glamor'
import preact from 'preact'

type Props = {
  text: string,
}

const strong: Style = css({
  fontWeight: 400,
})

const Strong = ({ text }: Props): VNode => (
  <strong {...strong}>{text}</strong>
)

export default Strong
