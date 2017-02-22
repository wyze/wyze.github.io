// @flow

import '../../helpers/global'
import { dimensions } from '../../../src/client/helpers/mappings'
import trackCustomDimensions from
  '../../../src/client/methods/trackCustomDimensions'

describe('trackCustomDimensions', () => {
  it('sets default values and what not', () => {
    const dimensionsSetup = Object.values(dimensions)
      .map(dimension => ([
        'set',
        dimension,
        'null',
      ]))

    trackCustomDimensions('null', '1')

    expect(global.ga).toHaveBeenCalledTimes(14)
    expect(global.ga.mock.calls.slice(0, 12)).toEqual(dimensionsSetup)
  })

  it('sets page load time correctly', () => {
    const tracker = {
      get: jest.fn(() => '2'),
      set: jest.fn(),
    }

    trackCustomDimensions('null', '1')

    const [ pageLoadTime ] =
      global.ga.mock.calls.slice(-2).map(args => args.pop())

    pageLoadTime(tracker)

    const { dimension3 } = tracker.set.mock.calls[0][0]

    expect(tracker.set).toHaveBeenCalledTimes(1)
    expect(tracker.set).toHaveBeenCalledWith({
      dimension1: '1',
      dimension2: '2',
      dimension3,
    })

    expect(tracker.get).toHaveBeenCalledTimes(1)
    expect(tracker.get).toHaveBeenCalledWith('clientId')
  })

  it('sets up the build hit task properly', () => {
    const model = {
      get: jest.fn(() => '3'),
      set: jest.fn(),
    }
    const tracker = {
      get: jest.fn(() => jest.fn()),
      set: jest.fn(),
    }

    trackCustomDimensions('null', '1')

    const [ trackingRecord ] =
      global.ga.mock.calls.slice(-1).map(args => args.pop())

    trackingRecord(tracker)

    expect(tracker.get).toHaveBeenCalledTimes(1)
    expect(tracker.get).toHaveBeenCalledWith('buildHitTask')

    const [ buildHitTask ] = tracker.set.mock.calls[0].slice(-1)

    expect(tracker.set).toHaveBeenCalledTimes(1)
    expect(tracker.set).toHaveBeenCalledWith(
      'buildHitTask',
      buildHitTask,
    )

    buildHitTask(model)

    expect(model.get).toHaveBeenCalledTimes(1)
    expect(model.get).toHaveBeenCalledWith('hitType')

    const [ , uuid ] = model.set.mock.calls[0]
    const [ , time ] = model.set.mock.calls[1]

    expect(model.set).toHaveBeenCalledTimes(4)
    expect(model.set.mock.calls).toEqual([
      [ 'dimension4', uuid, true ],
      [ 'dimension5', time, true ],
      [ 'dimension6', '3', true ],
      [ 'dimension8', 'visible', true ],
    ])
  })
})
