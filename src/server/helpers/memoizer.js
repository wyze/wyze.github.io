// @flow

import type { GitHubResults, Thunk } from '../../types'
import formatResult from './formatResult'
import memoizee from 'memoizee'

const memoizer = ( getData: () => GitHubResults ): Thunk => memoizee(
  async (): GitHubResults => (await getData()).map(formatResult),
  {
    maxAge: 6 * 60 * 60 * 1000, // 6 hours
    preFetch: true,
  },
)

export default memoizer
