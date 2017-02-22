// @flow

import './styles/global'
import {
  Conclusion,
  CoreTeam,
  Employment,
  GitHubList,
  Introduction,
  Social,
} from './containers'
import type {
  GitHubResults,
  Jobs,
  Profiles,
  Style,
  Teams,
  VNode,
} from '../types'
import { css, media } from 'glamor'
import { large } from './styles/breakpoints'
import preact from 'preact'

type Props = {
  contributions: GitHubResults,
  jobs: Jobs,
  profiles: Profiles,
  projects: GitHubResults,
  teams: Teams,
}

const main: Style = css(
  {
    padding: '2em',
  },
  media(large, {
    padding: '4em 6em',
  }),
)

const App = ({
  contributions,
  jobs,
  profiles,
  projects,
  teams,
}: Props): VNode => (
  <main {...main}>
    <Introduction />
    <Social profiles={profiles} />
    <Employment jobs={jobs} />
    <CoreTeam teams={teams} />
    <GitHubList content={contributions} title="Contributions Made" />
    <GitHubList content={projects} title="Open Source Projects" />
    <Conclusion />
  </main>
)

export default App
