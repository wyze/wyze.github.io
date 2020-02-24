import Head from 'next/head'
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Neil Kistner | St. Louis Software Engineer</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
