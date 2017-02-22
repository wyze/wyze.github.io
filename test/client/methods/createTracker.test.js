// @flow

import '../../helpers/global'
import createTracker from '../../../src/client/methods/createTracker'

describe('createTracker', () => {
  it('sets up tracker with passed in tracker id', () => {
    createTracker('UA-1')

    expect(global.ga).toHaveBeenCalledTimes(2)
    expect(global.ga.mock.calls).toEqual([
      [ 'create', 'UA-1', 'auto' ],
      [ 'set', 'transport', 'beacon' ],
    ])
  })
})
