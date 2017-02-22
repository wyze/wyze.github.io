// @flow

import type { Style, VNode } from '../../types'
import { css } from 'glamor'
import preact from 'preact'

export type Props = {
  alt?: string,
  circle?: boolean,
  ext: string,
  name: string,
  width?: number,
}

const maxHeight: Style = css({
  maxHeight: 100,
})
const round: Style = css({
  borderRadius: '50%',
})

const Image = ({ alt, circle, ext, name, width }: Props): VNode => (
  <img
    {...css(maxHeight, circle && round)}
    alt={alt || name}
    height="100"
    src={`img/${name}.${ext}`}
    width={width}
  />
)

Image.defaultProps = {
  alt: '',
  circle: false,
  width: 100,
}

export default Image
