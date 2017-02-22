// @flow

global.ga = jest.fn()
global.window = {
  addEventListener: jest.fn(),
  document: {
    readyState: 'complete',
    visibilityState: 'visible',
  },
  location: {
    hostname: 'localhost',
    pathname: '',
  },
  performance: {
    timing: {
      domContentLoadedEventStart: 1,
      loadEventStart: 2,
      navigationStart: 0,
      responseEnd: 3,
    },
  },
}
