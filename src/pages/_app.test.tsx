import { render } from '../test-utils'
import App from './_app'
import Router from 'next/router'

describe('<App />', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <App
        Component={(props) => <div {...props} />}
        pageProps={{ children: <div>Hi</div> }}
        router={Router.router!}
      />
    )

    expect(getByText('Hi')).toBeInTheDocument()
  })
})
