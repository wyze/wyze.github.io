import fontStyles from '@fontsource/lato/latin.css'
import type { LinksFunction, MetaFunction } from '@remix-run/cloudflare'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from '@remix-run/react'

import { FourOhFourPage } from './components/404'
import styles from './styles/tailwind.css'

export const links: LinksFunction = () =>
  [styles, fontStyles].map((href) => ({ rel: 'stylesheet', href }))

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Neil Kistner | St. Louis Software Engineer',
  viewport: 'width=device-width,initial-scale=1',
})

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-gradient-to-r from-sky-900 to-sky-600">
        {caught.status === 404 ? (
          <FourOhFourPage />
        ) : (
          <h1>
            {caught.status} {caught.statusText}
          </h1>
        )}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-gradient-to-r from-sky-900 to-sky-600">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
