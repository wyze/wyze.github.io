import { render } from '../test-utils'
import { view } from '../log'
import FourOhFourPage from '../pages/404'

jest.mock('../log')

describe('<FourOhFourPage />', () => {
  it('should render', () => {
    const { getByText } = render(<FourOhFourPage />)

    expect(getByText('ghost')).toBeInTheDocument()
    expect(getByText('shadow')).toBeInTheDocument()
    expect(getByText('Whoops!')).toBeInTheDocument()
    expect(
      getByText("We couldn't find the page you were looking for.")
    ).toBeInTheDocument()

    expect(view).toHaveBeenCalledTimes(1)
    expect(view).toHaveBeenCalledWith()
  })
})
