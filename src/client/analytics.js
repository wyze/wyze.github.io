// @flow
/* global ga window ga */

// Import Google Analytics plugins
import '../../static/js/autotrack' // eslint-disable-line
import {
  createTracker,
  sendInitialPageview,
  sendTimingMetrics,
  setupPlugins,
  trackCustomDimensions,
} from './methods'

/**
 * The tracking ID for your Google Analytics property.
 * https://support.google.com/analytics/answer/1032385
 */
const TRACKING_ID = 'UA-4907572-6'

/**
 * Bump this when making backwards incompatible changes to the tracking
 * implementation. This allows you to create a segment or view filter
 * that isolates only data captured with the most recent tracking changes.
 */
const TRACKING_VERSION = '1'

/**
 * A default value for dimensions so unset values always are reported as
 * something. This is needed since Google Analytics will drop empty dimension
 * values in reports.
 */
const NULL_VALUE = '(not set)'

// Setup some misc options
const options = {
  timeZone: 'America/Chicago',
  sessionTimeout: 30,
}

/**
 * Initializes all the analytics setup. Creates trackers and sets initial
 * values on the trackers.
 */
const init = () => {
  // Initialize the command queue in case analytics.js hasn't loaded yet.
  window.ga = window.ga || (
    /* istanbul ignore next */
    ( ...args: mixed ): number => (ga.q = ga.q || []).push(args)
  )

  createTracker(TRACKING_ID)
  trackCustomDimensions(NULL_VALUE, TRACKING_VERSION)
  setupPlugins(options)
  sendInitialPageview()
  sendTimingMetrics()
}

init()
