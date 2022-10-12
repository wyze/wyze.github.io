import fontStyles from '@fontsource/lato/latin.css'
import type { LinksFunction, MetaFunction } from '@remix-run/cloudflare'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import styles from './styles/global.css'

export const links: LinksFunction = () =>
  [styles, fontStyles].map((href) => ({ rel: 'stylesheet', href }))

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Neil Kistner | St. Louis Software Engineer',
  viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
