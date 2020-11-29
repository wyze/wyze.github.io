import { render } from '../test-utils'
import FourOhFourPage from './404'

describe('<FourOhFourPage />', () => {
  it('should render', () => {
    const { getByText } = render(<FourOhFourPage />)

    expect(getByText('ghost')).toBeInTheDocument()
    expect(getByText('shadow')).toBeInTheDocument()
    expect(getByText('Whoops!')).toBeInTheDocument()
    expect(
      getByText("We couldn't find the page you were looking for.")
    ).toBeInTheDocument()
  })
})
