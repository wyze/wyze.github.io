// @flow

import type { Style, VNode } from '../../types'
import { after, before, css, media, nthChild } from 'glamor'
import { large, small } from '../styles/breakpoints'
import { level } from '../styles'
import H2 from './H2'
import H3 from './H3'
import Section from './Section'
import Strong from './Strong'
import preact from 'preact'

type Props = {
  end?: string,
  name: string,
  start: string,
}

const section: Style = css(
  {
    paddingBottom: '1em',
    width: '100%',
  },
  media(small, {
    paddingBottom: '.5em',
  }),
  media(large, css(
    {
      width: '50%',
    },
    nthChild('even', {
      paddingLeft: '.5em',
    }),
    nthChild('odd', {
      paddingRight: '.5em',
    }),
  )),
)
const child: Style = css(
  {
    display: 'block',
  },
  media(small, {
    alignItems: 'center',
    display: 'flex',
    flex: '0 0 50%',
    justifyContent: 'space-between',
  }),
)
const h3: Style = css(
  {
    fontWeight: 300,
  },
  media(small,
    after({
      content: '")"',
    }),
    before({
      content: '"("',
    }),
  ),
)

const Employer = ({ end, name, start }: Props): VNode => (
  <Section styles={section}>
    <div {...css(level, child)}>
      <H2><Strong text={name} /></H2>
      <H3 styles={h3}>{start} &mdash; {end}</H3>
    </div>
  </Section>
)

Employer.defaultProps = {
  end: 'Present',
}

export default Employer
