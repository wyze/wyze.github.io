import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="Neil Kistner is a self taught software engineer focused mainly on web applications. He loves open source and contributes to projects like Yarn and Tessel."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
