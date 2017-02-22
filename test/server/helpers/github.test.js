// @flow

import '../../helpers/nock'
import github from '../../../src/server/helpers/github'

describe('github', () => {
  it('returns empty array as a last resort', async () => {
    const result = await github('bad', {})

    expect(result.length).toBe(0)
  })
})
