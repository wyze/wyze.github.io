// @flow

import type { Profile, Profiles, Style, VNode } from '../../types'
import { css, media } from 'glamor'
import { small } from '../styles/breakpoints'
import Box from '../components/Box'
import Link from '../components/Link'
import Section from '../components/Section'
import preact from 'preact'

type Props = {
  profiles: Profiles,
}

const link: Style = css({
  display: 'inline-block',
  height: '5.7em',
  minWidth: '5.7em',
})

const social: Style = css(
  {
    flex: '0 0 50%',
    paddingTop: '.4em',
    margin: '.5em 0',
  },
  media(small, {
    flexBasis: '25%',
    margin: 0,
  }),
)

const Social = ({ profiles }: Props): VNode => (
  <Box wrap title="Me Around The Internet">
    {profiles.map(({ component: Component, to }: Profile): VNode => (
      <Section key={to} styles={social}>
        <Link styles={link} to={to}>
          <Component />
        </Link>
      </Section>
    ))}
  </Box>
)

export default Social
