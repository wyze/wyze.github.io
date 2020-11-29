import { Box } from './Box'
import { render } from '../test-utils'

describe('<Box />', () => {
  it('should render', () => {
    const { getByText } = render(<Box title="A title">Some content</Box>)

    const content = getByText('Some content')

    expect(getByText('A title')).toBeInTheDocument()
    expect(content).toBeInTheDocument()
    expect(content).toHaveStyle('flex-wrap: nowrap')
  })

  it.each([
    ['wrap', { wrap: true }, 'flex-wrap: wrap'],
    [
      'className',
      { className: { color: 'rebeccapurple' } },
      'color: rebeccapurple',
    ],
  ])('should apply style with %s property', (_, props, style) => {
    const { getByText } = render(<Box {...props}>Content</Box>)

    expect(getByText('Content')).toHaveStyle(style)
  })
})
