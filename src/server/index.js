// @flow

import type { Context, KoaApp } from '../types'
import { join } from 'path'
import { memoizer, renderer, state } from './helpers'
import Koa from 'koa'
import compress from 'koa-compress'
import contributions from './contributions'
import favicon from 'koa-favicon'
import onerror from './middleware/onerror'
import projects from './projects'
import serve from '@wyze/koa-file-server'

const app: KoaApp = new Koa()
const port: number | string = process.env.PORT || 3000

const getContributions = memoizer(contributions)
const getProjects = memoizer(projects)

// Warm our memoized functions
getContributions()
getProjects()
renderer({ state })

/* istanbul ignore next */
const dots = [ '..', process.env.NODE_ENV === 'development' ? '..' : '' ]

// Setup middlewares
app.use(onerror())
app.use(compress())
app.use(favicon(
  join(__dirname, ...dots, 'static', 'favicons', 'favicon.ico'),
))
app.use(serve({
  manifest: join(__dirname, 'data', 'push_manifest.json'),
  maxage: 365 * 24 * 60 * 60 * 1000, // 1 year, * 1000 to convert from ms
  link: process.env.NODE_ENV !== 'development',
  root: 'static',
}))

// Grab our data
app.use(async ( ctx: Context, next: () => void ): Promise<void> => {
  if ( ctx.path !== '/' ) {
    return
  }

  // eslint-disable-next-line no-param-reassign
  ctx.state = {
    ...state,
    contributions: await getContributions(),
    projects: await getProjects(),
  }

  next()
})

// Render the app
app.use(( ctx: Context ) => {
  // eslint-disable-next-line no-param-reassign
  ctx.body = renderer(ctx)
})

/* istanbul ignore next */
if ( process.env.NODE_ENV !== 'test' ) {
  const server = app.listen(port, (): mixed =>
    // eslint-disable-next-line no-console
    console.log(
      `Listening at http://${server.address().host || 'localhost'}:${port}`,
    ),
  )
}

export default app
