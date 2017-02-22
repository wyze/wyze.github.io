// @flow

import type { Context } from '../../types'
import { renderStatic } from 'glamor/server'
import App from '../../shared/App'
import memoizee from 'memoizee'
import preact from 'preact'
import render from 'preact-render-to-string'
import template from './template'

const renderer = memoizee(
  ({ state }: Context): string =>
    template(
      // eslint-disable-next-line react/jsx-filename-extension
      renderStatic((): mixed => render(<App {...state} />)),
    ),
)

export default renderer
