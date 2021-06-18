import {
  VirtualInjector,
  filterOutUnusedRules,
  getStyleElement,
} from 'react-otion/server'
import { setup } from 'otion'

import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

export default class extends Document {
  static async getInitialProps({ renderPage }: DocumentContext) {
    const injector = VirtualInjector()

    setup({ injector })

    const page = await renderPage()

    return {
      ...page,
      styles: getStyleElement(filterOutUnusedRules(injector, page.html)),
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="Neil Kistner is a self taught software engineer focused mainly on web applications. He loves open source and contributes to projects like Yarn and Tessel."
          />
          <meta name="theme-color" content="#ffffff" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
