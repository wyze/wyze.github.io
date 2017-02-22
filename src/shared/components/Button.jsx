// @flow

import type { Style, VNode } from '../../types'
import { css, hover } from 'glamor'
import H2 from './H2'
import preact from 'preact'

type Props = {
  text: string,
}

const color: Style = '#f4f6ff'
const button: Style = css(
  {
    backgroundColor: 'transparent',
    borderRadius: 5,
    border: `1px solid ${color}`,
    color,
    cursor: 'pointer',
    outline: 'none',
    marginTop: '2em',
    padding: '1em 3em',
    transitionDuration: '.5s',
  },
  hover({
    borderColor: '#8bc34a',
    color: '#8bc34a',
  }),
)

// Can safely link to `/` here because there is only one page.
const Button = ({ text }: Props): VNode => (
  <a href="/">
    <button {...button} type="button">
      <H2>{text}</H2>
    </button>
  </a>
)

export default Button
