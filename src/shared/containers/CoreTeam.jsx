// @flow

import type { Style, Team, Teams, VNode } from '../../types'
import { css, media, select } from 'glamor'
import { small } from '../styles/breakpoints'
import Box from '../components/Box'
import Link from '../components/Link'
import Section from '../components/Section'
import preact from 'preact'

type Props = {
  teams: Teams,
}

const core: Style = css(
  {
    paddingTop: '.4em',
    width: '100%',
  },
  select('& + &', { paddingTop: '1em' }),
  media(small, css(
    {
      width: '50%',
    },
    select('& + &', { paddingTop: 0 }),
  )),
)

const link: Style = css({
  display: 'inline-block',
  height: '5.7em',
  minWidth: '5.7em',
})

const CoreTeam = ({ teams }: Props): VNode => (
  <Box wrap title="Core Team Member">
    {teams.map(({ component: Component, to }: Team): VNode => (
      <Section key={to} styles={core}>
        <Link styles={link} to={to}>
          <Component />
        </Link>
      </Section>
    ))}
  </Box>
)

export default CoreTeam
