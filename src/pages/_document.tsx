import {
  AppContextType,
  AppInitialProps,
  AppPropsType,
  NextComponentType,
} from 'next/dist/next-server/lib/utils'
import { IRenderer } from 'fela'
import { NextRouter } from 'next/router'
import { renderToSheetList } from 'fela-dom'
import { renderer } from '../fela'
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

type AppWithRenderer = NextComponentType<
  AppContextType<NextRouter>,
  AppInitialProps,
  AppPropsType<NextRouter, Record<string, unknown>> & { renderer?: IRenderer }
>

type SheetList = ReturnType<typeof renderToSheetList> extends Array<infer U>
  ? Array<U & { rehydration: number }>
  : never

export default class extends Document<{ sheetList: SheetList }> {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: AppWithRenderer) =>
          function EnhanceApp(props) {
            return <App {...props} renderer={renderer} />
          },
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
