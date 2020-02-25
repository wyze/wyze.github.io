import { renderToSheetList } from 'fela-dom'
import { renderer } from '../fela'
import { IRenderer } from 'fela'
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import { AppProps } from 'next/app'
import { PropsWithChildren } from 'react'
import { NextRouter } from 'next/router'
import {
  AppContextType,
  AppInitialProps,
  AppPropsType,
  Enhancer,
  NextComponentType,
} from 'next/dist/next-server/lib/utils'

type AppWithRenderer = NextComponentType<
  AppContextType<NextRouter>,
  AppInitialProps,
  AppPropsType<NextRouter, {}> & { renderer?: IRenderer }
>

type SheetList = ReturnType<typeof renderToSheetList> extends Array<infer U>
  ? (U & { rehydration: number })[]
  : never

export default class extends Document<{ sheetList: SheetList }> {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: AppWithRenderer) => (props) => (
          <App {...props} renderer={renderer} />
        ),
      })

    const initialProps = await Document.getInitialProps(ctx)
    const sheetList = renderToSheetList(renderer)

    return {
      ...initialProps,
      sheetList,
    }
  }

  render() {
    const styleNodes = this.props.sheetList.map(
      ({ type, rehydration, support, media, css }) => (
        <style
          dangerouslySetInnerHTML={{ __html: css }}
          data-fela-id=""
          data-fela-rehydration={rehydration}
          data-fela-support={support}
          data-fela-type={type}
          key={`${type}-${media}`}
          media={media}
        />
      )
    )

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
          {styleNodes}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
