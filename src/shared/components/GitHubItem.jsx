// @flow

import type { GitHubResult, Style, VNode } from '../../types'
import { Star } from './svgs'
import { css, media, nthChild } from 'glamor'
import { large, small } from '../styles/breakpoints'
import { level } from '../styles'
import Link from './Link'
import Section from './Section'
import makeRGBA from '../helpers/makeRGBA'
import preact from 'preact'

type Props = GitHubResult

const backgroundColor: string = '#f8f8f8'
const shadow: string = makeRGBA(0.175)
const box: Style = css(
  {
    justifyContent: 'flex-start',
    backgroundColor,
    borderRadius: 5,
    boxShadow: `0 2px 3px ${shadow}, 0 0 0 1px ${shadow}`,
    flexBasis: '100%',
    height: '8em',
    margin: '.2em 0',
    padding: '1em',
  },
  media(small, css(
    {
      flexBasis: '49.5%',
      margin: '.2em',
    },
    nthChild('odd', {
      marginLeft: 0,
    }),
    nthChild('even', {
      marginRight: 0,
    }),
  )),
  media(large, css(
    {
      flexBasis: '32.8%',
    },
    nthChild('odd', {
      marginLeft: '.2em',
    }),
    nthChild('even', {
      marginRight: '.2em',
    }),
    nthChild('3n+1', {
      marginLeft: 0,
    }),
    nthChild('3n+3', {
      marginRight: 0,
    }),
  )),
)
const desc: Style = css({
  paddingTop: '.25em',
})
const star: Style = css({
  display: 'flex',
  fontSize: '.8em',
  fontStyle: 'italic',
})
const link: Style = css({
  fontSize: '1.2em',
})

const GitHubItem = ({ description, name, stars, url }: Props): VNode => (
  <Section center={false} styles={box}>
    <Section center={false} styles={level}>
      <div><Link styles={link} to={url}>{name}</Link></div>
      <div {...css(level, star)}><Star />{stars}</div>
    </Section>
    <Section center={false} styles={desc}>
      {description}
    </Section>
  </Section>
)

export default GitHubItem
