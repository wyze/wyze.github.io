// @flow

import type { Style, VNode } from '../../types'
import { css } from 'glamor'
import { thin } from '../styles'
import Box from '../components/Box'
import H2 from '../components/H2'
import Link from '../components/Link'
import Section from '../components/Section'
import preact from 'preact'

const conclusion: Style = css({
  width: '100%',
})

const Conclusion = (): VNode => (
  <Box>
    <Section styles={conclusion}>
      <H2 styles={thin}>
        Download{' '}
        <Link to="/resume.pdf">résumé</Link>.
        {' '}View{' '}
        <Link to="//github.com/wyze/wyze.github.io">source</Link>.
      </H2>
    </Section>
  </Box>
)

export default Conclusion
