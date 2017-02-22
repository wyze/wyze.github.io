// @flow

import '../helpers/global'
import '../../src/client/analytics'

jest.mock('../../static/js/autotrack', () => {}, { virtual: true })

describe('analytics', () => {
  it('sets up init function and push queue', () => {
    expect(global.window.ga).toBeDefined()
    expect(global.window.ga).toBeInstanceOf(Function)
  })
})
