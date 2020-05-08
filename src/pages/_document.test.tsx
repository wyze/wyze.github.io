import { render } from '../test-utils'
import Document from './_document'

jest.mock('next/document', () => {
  const React = jest.requireActual('react')

  return {
    __esModule: true,
    Head() {
      return null
    },
    Html() {
      return null
    },
    Main() {
      return null
    },
    NextScript() {
      return null
    },
    default: class Doc extends React.Component {
      static async getInitialProps() {
        return { aProp: true }
      }
    },
  }
})

describe('<Document />', () => {
  it('should render correctly', () => {
    render(
      <Document
        html=""
        __NEXT_DATA__={{ props: {}, page: '', query: {}, buildId: '' }}
        dangerousAsPath=""
        ampPath=""
        inAmpMode={false}
        hybridAmp={false}
        staticMarkup={false}
        isDevelopment={false}
        devFiles={[]}
        files={[]}
        lowPriorityFiles={[]}
        polyfillFiles={[]}
        dynamicImports={[]}
        assetPrefix=""
        canonicalBase=""
        htmlProps={{}}
        bodyTags={[]}
        headTags={[]}
        sheetList={[{ css: '', rehydration: 1, type: 'STATIC' } as const]}
      />
    )

    expect(
      document.querySelector('[data-fela-type="STATIC"]')
    ).toBeInTheDocument()
  })

  it('should call getInitialProps and return correctly', async () => {
    const renderPage = jest.fn(() => ({ html: '' }))
    const context = {
      AppTree() {
        return null
      },
      pathname: '/',
      query: {},
      renderPage,
    }

    const props = await Document.getInitialProps(context)

    context.renderPage()

    expect(renderPage).toHaveBeenCalledTimes(1)
    expect(renderPage).toHaveBeenCalledWith({
      enhanceApp: expect.any(Function),
    })

    expect(props).toMatchInlineSnapshot(`
      Object {
        "aProp": true,
        "sheetList": Array [
          Object {
            "attributes": Object {},
            "css": "@font-face{font-display:swap;font-weight:300;src:url('fonts/lato-v11-latin-300.woff') format('woff'),url('fonts/lato-v11-latin-300.woff2') format('woff2');font-family:\\"Lato\\"}@font-face{font-display:swap;font-weight:regular;src:url('fonts/lato-v11-latin-regular.woff') format('woff'),url('fonts/lato-v11-latin-regular.woff2') format('woff2');font-family:\\"Lato\\"}",
            "rehydration": 0,
            "type": "FONT",
          },
          Object {
            "attributes": Object {},
            "css": "html, body, p, h1, h2, h3{margin:0;padding:0}h1, h2, h3{font-size:100%;font-weight:400}html{box-sizing:border-box}*, *:after, *:before{box-sizing:inherit}img{height:auto;max-width:100%}html, body{height:100%}html{-moz-osx-font-smoothing: grayscale; -webkit-font-smoothing: antialiased}html{-webkit-overflow-scrolling:touch;line-height:1.45;overflow-x:hidden;text-rendering:optimizeLegibility}body{background-color:#4b79a1;background-image:-webkit-linear-gradient(-90deg, #4b79a1 0%, #283e51 100%);background-image:-moz-linear-gradient(-90deg, #4b79a1 0%, #283e51 100%);background-image:linear-gradient(-90deg, #4b79a1 0%, #283e51 100%);color:hsl(200, 16%, 16%);font-size:calc(16px + 0.4vw);font-family:Lato, san-serif}",
            "rehydration": 0,
            "type": "STATIC",
          },
        ],
      }
    `)
  })
})
