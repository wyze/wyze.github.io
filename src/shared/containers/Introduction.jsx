// @flow

import type { Style, VNode } from '../../types'
import { css, media } from 'glamor'
import { small } from '../styles/breakpoints'
import { thin } from '../styles'
import Box from '../components/Box'
import H1 from '../components/H1'
import Image from '../components/Image'
import Section from '../components/Section'
import Strong from '../components/Strong'
import preact from 'preact'

const image: Style = css(
  {
    flexBasis: '100%',
    paddingBottom: '1em',
    textAlign: 'center',
  },
  media(small, {
    flexBasis: 'auto',
    paddingBottom: 0,
    textAlign: 'inherit',
  }),
)
const section: Style = media(small, {
  flex: '1 1 75%',
})
const width: Style = css({
  width: '100%',
})

const Introduction = (): VNode => (
  <Box wrap>
    <Section center={false} styles={image}>
      <Image circle alt="Neil Kistner" ext="png" name="me" />
    </Section>
    <Section styles={css(section, width)}>
      <H1 styles={thin}>
        Hello, I&apos;m <Strong text="Neil Kistner" />,
        a software engineer in <Strong text="St. Louis" />.
      </H1>
    </Section>
  </Box>
)

export default Introduction
