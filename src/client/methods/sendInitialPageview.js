// @flow
/* global ga */

import { dimensions } from '../helpers/mappings'

/**
 * Sends the initial pageview to Google Analytics.
 */
const sendInitialPageview = () => {
  ga('send', 'pageview', { [dimensions.HIT_SOURCE]: 'pageload' })
}

export default sendInitialPageview
