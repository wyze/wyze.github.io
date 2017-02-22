// @flow

import type { Context, Middleware } from '../../types'
import { NotFound, ServerError } from '../../shared/pages'
import { renderStatic } from 'glamor/server'
import preact from 'preact'
import render from 'preact-render-to-string'
import template from '../helpers/template'

const onerror = (): Middleware =>
  async ( ctx: Context, next: () => void ): Promise<void> => {
    try {
      await next()

      if ( ctx.status === 404 ) {
        ctx.throw(404)
      }
    } catch ( error ) {
      // eslint-disable-next-line no-param-reassign
      ctx.status = error.status || 500

      const { status } = ctx

      ctx.app.emit('error', error, ctx)

      /* istanbul ignore else */
      if ( status === 500 || status === 404 ) {
        // eslint-disable-next-line no-param-reassign
        ctx.body = template(
          renderStatic((): mixed =>
            // eslint-disable-next-line react/jsx-filename-extension
            render(status === 404 ? <NotFound /> : <ServerError />),
          ),
        )
      }
    }
  }

export default onerror
