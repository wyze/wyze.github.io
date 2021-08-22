import { render, screen } from '../test-utils'
import FourOhFourPage from './404'

describe('<FourOhFourPage />', () => {
  it('should render', () => {
    render(<FourOhFourPage />)

    expect(screen.getByText('ghost')).toBeInTheDocument()
    expect(screen.getByText('shadow')).toBeInTheDocument()
    expect(screen.getByText('Whoops!')).toBeInTheDocument()
    expect(
      screen.getByText("We couldn't find the page you were looking for.")
    ).toBeInTheDocument()
  })
})
