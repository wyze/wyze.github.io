import { Link } from './Link'
import { fireEvent, render } from '../test-utils'

describe('<Link />', () => {
  it('should render', () => {
    const { getByText } = render(
      <Link href="https://mock.local/1">Content</Link>
    )

    fireEvent.click(getByText('Content'))

    expect(getByText('Content')).toBeInTheDocument()
    expect(getByText('Content')).toHaveAttribute('href', 'https://mock.local/1')
  })

  it('should apply style with className property', () => {
    const { getByText } = render(
      <Link className={{ color: 'rebeccapurple' }} href="">
        Content
      </Link>
    )

    expect(getByText('Content')).toHaveStyle({ color: 'rebeccapurple' })
  })
})
