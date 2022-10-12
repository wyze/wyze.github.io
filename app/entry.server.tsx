import type { EntryContext } from '@remix-run/cloudflare'
import { RemixServer } from '@remix-run/react'
import { setup } from 'otion'
import { renderToString } from 'react-dom/server'
import {
  VirtualInjector,
  filterOutUnusedRules,
  getStyleElement,
} from 'react-otion/server'

const injector = VirtualInjector()

setup({ injector })

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  )

  const element = getStyleElement(filterOutUnusedRules(injector, markup))

  responseHeaders.set('Content-Type', 'text/html')

  return new Response(
    '<!doctype html>' + markup.replace('__STYLES__', renderToString(element)),
    {
      status: responseStatusCode,
      headers: responseHeaders,
    }
  )
}
