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
        __NEXT_DATA__={{
          props: {},
          page: '',
          query: {},
          buildId: '',
        }}
        dangerousAsPath=""
        devOnlyCacheBusterQueryString=""
        docComponentsRendered={{}}
        ampPath=""
        buildManifest={{
          devFiles: [],
          ampDevFiles: [],
          polyfillFiles: [],
          lowPriorityFiles: [],
          pages: {
            '/_app': [],
          },
          ampFirstPages: [],
          rootMainFiles: [],
        }}
        inAmpMode={false}
        hybridAmp={false}
        isDevelopment={false}
        dynamicImports={[]}
        assetPrefix=""
        canonicalBase=""
        headTags={[]}
        scriptLoader={{}}
      />
    )

    expect(document.getElementById('__otion')).toBeInTheDocument()
  })

  it('should call getInitialProps and return correctly', async () => {
    const context = {
      AppTree() {
        return null
      },
      pathname: '/',
      query: {},
      renderPage: jest.fn(() => Promise.resolve({ html: '' })),
      defaultGetInitialProps: jest.fn(() => Promise.resolve({ html: '' })),
    }

    const props = await Document.getInitialProps(context)

    context.renderPage()

    expect(props).toMatchInlineSnapshot(`
      {
        "html": "",
        "styles": <style
          dangerouslySetInnerHTML={
            {
              "__html": "",
            }
          }
          id="__otion"
        />,
      }
    `)
  })
})
