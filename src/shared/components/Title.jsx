// @flow

import type { Style, VNode } from '../../types'
import { css } from 'glamor'
import H1 from './H1'
import makeRGBA from '../helpers/makeRGBA'
import preact from 'preact'

type Props = {
  title: string,
}

const h1: Style = css({
  boxShadow: `0 2px 2px -2px ${makeRGBA(0.25)}`,
  color: makeRGBA(0.75),
  fontWeight: 300,
  marginBottom: '.5em',
  paddingBottom: '.25em',
  title: 'title',
})

const Title = ({ title }: Props): VNode => (
  <H1 styles={h1}>{title}</H1>
)

export default Title
