// @flow
/* global window ga */

import { dimensions, metrics } from '../helpers/mappings'
import { getDefinitionIndex, mqDefinitions } from '../helpers'

type Element = {
  getAttribute: string => string,
}

type Options = {
  timeZone: string,
  sessionTimeout: number,
}

type Url = {
  protocol?: string,
  slashes?: boolean,
  auth?: string,
  host?: string,
  port?: string,
  hostname?: string,
  hash?: string,
  search?: string,
  query?: ?string | ?{ [ key: string]: mixed },
  pathname?: string,
  path?: string,
  href: string,
}

type ParseUrlFn = string => Url

export const shouldTrackOutboundLink =
  ( link: Element, parseUrl: ParseUrlFn ): boolean => {
    const { location } = window
    const href = link.getAttribute('href') || link.getAttribute('xlink:href')
    const url = parseUrl(href)
    const isExternal = (
      url.hostname !== location.hostname &&
      url.protocol && url.protocol.slice(0, 4) === 'http'
    ) || /* istanbul ignore next: coercion to boolean */ false
    const isPDF = location.pathname.endsWith('.pdf')

    return isPDF || isExternal
  }

/**
 * Requires select autotrack plugins and initializes each one with its
 * respective configuration options.
 */
const setupPlugins = ( options: Options ) => {
  ga('require', 'maxScrollTracker', {
    ...options,
    increaseThreshold: 10,
    maxScrollMetricIndex: getDefinitionIndex(metrics.MAX_SCROLL_PERCENTAGE),
  })
  ga('require', 'outboundLinkTracker', {
    events: [ 'click', 'contextmenu' ],
    shouldTrackOutboundLink,
  })
  ga('require', 'cleanUrlTracker', {
    stripQuery: true,
    queryDimensionIndex: getDefinitionIndex(dimensions.URL_QUERY_PARAMS),
    trailingSlash: 'remove',
  })
  ga('require', 'pageVisibilityTracker', {
    ...options,
    visibleMetricIndex: getDefinitionIndex(metrics.PAGE_VISIBLE),
    fieldsObj: {
      [dimensions.HIT_SOURCE]: 'pageVisibilityTracker',
    },
  })
  ga('require', 'mediaQueryTracker', {
    definitions: mqDefinitions,
  })
}

export default setupPlugins
