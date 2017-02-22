// @flow

import type { GitHubResponse } from '../types'
import { github } from './helpers'

const projects = async (): GitHubResponse =>
  // eslint-disable-next-line no-return-await
  await github('search/repositories', { user: 'wyze' })

export default projects
