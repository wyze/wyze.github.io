import * as felaConfig from '../fela'
import { AppProps } from 'next/app'
import { IRenderer } from 'fela'
import { RendererProvider } from 'react-fela'
import Head from 'next/head'

export default function App({
  Component,
  pageProps,
  renderer = felaConfig.renderer,
}: AppProps & { renderer?: IRenderer }) {
  return (
    <>
      <Head>
        <title>Neil Kistner | St. Louis Software Engineer</title>{' '}
        {typeof window === 'undefined' ? null : (
          <script
            async
            defer
            data-domain="neilkistner.com"
            src="https://plausible.neilkistner.com/js/plausible.outbound-links.js"
          ></script>
        )}
      </Head>
      <RendererProvider renderer={renderer}>
        <Component {...pageProps} />
      </RendererProvider>
    </>
  )
}
