// @flow

import '../../helpers/global'
import definitions from '../../../src/client/helpers/mqDefinitions'
import setupPlugins, { shouldTrackOutboundLink } from
  '../../../src/client/methods/setupPlugins'
import url from 'url'

const maxScrollTracker = {
  increaseThreshold: 10,
  maxScrollMetricIndex: 5,
  sessionTimeout: 1,
  timeZone: 'CST',
}

const outboundLinkTracker = {
  events: [
    'click',
    'contextmenu',
  ],
  shouldTrackOutboundLink,
}

const cleanUrlTracker = {
  queryDimensionIndex: 9,
  stripQuery: true,
  trailingSlash: 'remove',
}

const pageVisibilityTracker = {
  fieldsObj: {
    dimension7: 'pageVisibilityTracker',
  },
  sessionTimeout: 1,
  timeZone: 'CST',
  visibleMetricIndex: 4,
}

const mediaQueryTracker = {
  definitions,
}

describe('setupPlugins', () => {
  it('initializes all the plugins', () => {
    setupPlugins({ sessionTimeout: 1, timeZone: 'CST' })

    expect(global.ga).toHaveBeenCalledTimes(5)
    expect(global.ga.mock.calls).toEqual([
      [ 'require', 'maxScrollTracker', maxScrollTracker ],
      [ 'require', 'outboundLinkTracker', outboundLinkTracker ],
      [ 'require', 'cleanUrlTracker', cleanUrlTracker ],
      [ 'require', 'pageVisibilityTracker', pageVisibilityTracker ],
      [ 'require', 'mediaQueryTracker', mediaQueryTracker ],
    ])
  })

  describe('shouldTrackOutboundLink', () => {
    it('identifies external links', () => {
      const link = {
        getAttribute: jest.fn(() => 'https://neilkistner.com'),
      }

      expect(shouldTrackOutboundLink(link, url.parse)).toBeTruthy()
    })

    it('identifies svg links', () => {
      const link = {
        getAttribute: jest.fn(attribute =>
          attribute === 'href' ? '' : 'https://neilkistner.com',
        ),
      }

      expect(shouldTrackOutboundLink(link, url.parse)).toBeTruthy()
    })

    it('works with local pdfs', () => {
      const link = {
        getAttribute: jest.fn(() => 'http://localhost.com'),
      }

      global.window.location.pathname = 'a.pdf'

      expect(shouldTrackOutboundLink(link, url.parse)).toBeTruthy()
    })
  })
})
