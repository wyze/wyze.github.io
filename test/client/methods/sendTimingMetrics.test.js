// @flow

import '../../helpers/global'
import sendTimingMetrics from '../../../src/client/methods/sendTimingMetrics'

const window = {
  ...global.window,
  document: {
    ...global.window.document,
  },
}

describe('sendTimingMetrics', () => {
  afterEach(() => {
    global.window = { ...window, document: { ...window.document } }
  })

  it('returns when browser has no support for performance metrics', () => {
    delete global.window.performance

    sendTimingMetrics()

    expect(global.ga).not.toHaveBeenCalledTimes(1)
  })

  it('sets window load listener when window is not loaded', () => {
    delete global.window.document.readyState

    sendTimingMetrics()

    expect(global.ga).not.toHaveBeenCalledTimes(1)
    expect(global.window.addEventListener).toHaveBeenCalledTimes(1)
    expect(global.window.addEventListener).toHaveBeenCalledWith(
      'load',
      sendTimingMetrics,
    )
  })

  it('sends event with metrics', () => {
    sendTimingMetrics()

    expect(global.ga).toHaveBeenCalledTimes(1)
    expect(global.ga).toHaveBeenCalledWith(
      'send',
      'event',
      {
        eventAction: 'track',
        eventCategory: 'Navigation Timing',
        metric1: 3,
        metric2: 1,
        metric3: 2,
        nonInteraction: true,
      },
    )
  })
})
