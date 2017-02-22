// @flow
/* global ga window */

import { dimensions } from '../helpers/mappings'
import { uuid } from '../helpers'

type WeakObject = {
  [ key: string ]: mixed,
}

type Callback = ( Model ) => void // eslint-disable-line

type Model = {
  get: ( name: string ) => string,
  set: (
    name: string | WeakObject,
    value?: string | Callback,
    temporary?: boolean,
  ) => void,
}

type Tracker = {
  get: <TOutput: string | Callback>( name: string ) => TOutput,
  set: (
    name: string | WeakObject,
    value?: string | Callback,
  ) => void,
}

/**
 * Sets a default dimension value for all custom dimensions on all trackers.
 */
const trackCustomDimensions = ( nullValue: string, trackerVersion: string ) => {
  const { document } = window

  // Sets a default dimension value for all custom dimensions to ensure
  // that every dimension in every hit has *some* value. This is necessary
  // because Google Analytics will drop rows with empty dimension values
  // in your reports.
  Object.keys(dimensions).forEach(( key: string ) => {
    ga('set', dimensions[key], nullValue)
  })

  // Adds tracking of dimensions known at page load time.
  ga(( tracker: Tracker ) => {
    tracker.set({
      [dimensions.TRACKING_VERSION]: trackerVersion,
      [dimensions.CLIENT_ID]: tracker.get('clientId'),
      [dimensions.WINDOW_ID]: uuid(),
    })
  })

  // Adds tracking to record each the type, time, uuid, and visibility state
  // of each hit immediately before it's sent.
  ga(( tracker: Tracker ) => {
    const originalBuildHitTask: Callback = tracker.get('buildHitTask')

    tracker.set('buildHitTask', ( model: Model ) => {
      model.set(dimensions.HIT_ID, uuid(), true)
      model.set(dimensions.HIT_TIME, String(+new Date()), true)
      model.set(dimensions.HIT_TYPE, model.get('hitType'), true)
      model.set(dimensions.VISIBILITY_STATE, document.visibilityState, true)

      originalBuildHitTask(model)
    })
  })
}

export default trackCustomDimensions
