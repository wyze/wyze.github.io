import '../global.css'

import { AppProps } from 'next/app'
import { hydrate, setup } from 'otion'

import Head from 'next/head'

const dev = process.env.NODE_ENV !== 'production'

if (typeof window !== 'undefined') {
  setup({})
  hydrate()
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Neil Kistner | St. Louis Software Engineer</title>{' '}
        {typeof window === 'undefined' || dev ? null : (
          <script
            async
            defer
            data-domain="neilkistner.com"
            src="https://plausible.neilkistner.com/js/plausible.outbound-links.js"
          ></script>
        )}
      </Head>
      <Component {...pageProps} />
    </>
  )
}
