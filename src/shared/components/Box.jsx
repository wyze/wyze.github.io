// @flow

import type { Style, VNode } from '../../types'
import { css, media, select } from 'glamor'
import { flexGrow, level } from '../styles'
import { large } from '../styles/breakpoints'
import Title from './Title'
import makeRGBA from '../helpers/makeRGBA'
import preact from 'preact'

type Props = {
  children?: VNode,
  title?: string,
  wrap?: boolean,
  childStyle?: Style,
}

const shadow: string = makeRGBA(0.1)
const box: Style = css(
  {
    backgroundColor: '#fff',
    borderRadius: 5,
    boxShadow: `0 2px 3px ${shadow}, 0 0 0 1px ${shadow}`,
    display: 'block',
    padding: '1em',
  },
  select('& + &', {
    marginTop: '2em',
  }),
  media(large, select('& + &', {
    marginTop: '4em',
  })),
)
const flexWrap: Style = css({ flexWrap: 'wrap' })

const Box = ({ children, title, wrap, childStyle }: Props): VNode => (
  <div {...box}>
    {title ? <Title title={title} /> : <span />}
    <div {...css(level, flexGrow, wrap && flexWrap, childStyle)}>
      {children}
    </div>
  </div>
)

Box.defaultProps = {
  childStyle: {},
  children: null,
  title: null,
  wrap: false,
}

export default Box
