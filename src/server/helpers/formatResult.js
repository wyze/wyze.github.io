// @flow

import type { GitHubResult } from '../../types'

const formatResult = ( result: GitHubResult ): GitHubResult => ({
  ...result,
  description: result.description && result.description.length > 100 ?
    `${result.description.slice(0, 101)}…` :
    result.description,
  stars: result.stars.toLocaleString(),
})

export default formatResult
