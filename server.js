import * as build from '@remix-run/dev/server-build'
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages'

const handleRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context) => context.env,
})

export function onRequest(context) {
  return handleRequest(context)
}
