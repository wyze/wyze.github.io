// @flow
/* global ga */

/**
 * Creates the trackers and sets the default transport and tracking
 * version fields. In non-production environments it also logs hits.
 */
const createTracker = ( trackerId: string ) => {
  ga('create', trackerId, 'auto')

  // Ensures all hits are sent via `navigator.sendBeacon()`.
  ga('set', 'transport', 'beacon')
}

export default createTracker
