// @flow

import '../../helpers/global'
import sendInitialPageview from
  '../../../src/client/methods/sendInitialPageview'

describe('sendInitialPageview', () => {
  it('sends a pageview', () => {
    sendInitialPageview()

    expect(global.ga).toHaveBeenCalledTimes(1)
    expect(global.ga).toHaveBeenCalledWith(
      'send',
      'pageview',
      { dimension7: 'pageload' },
    )
  })
})
