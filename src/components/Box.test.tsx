import { Box } from './Box'
import { mockIsIntersecting, render } from '../test-utils'
import { view } from '../log'

jest.mock('../log')

describe('<Box />', () => {
  it('should render', () => {
    const { container, getByText } = render(
      <Box pixel="test" title="A title">
        Some content
      </Box>
    )

    const content = getByText('Some content')

    expect(getByText('A title')).toBeInTheDocument()
    expect(content).toBeInTheDocument()
    expect(content).toHaveStyle('flex-wrap: nowrap')

    mockIsIntersecting(container.firstElementChild!, true)

    expect(view).toHaveBeenCalledTimes(1)
    expect(view).toHaveBeenCalledWith('/test', 'http://localhost/')
  })

  it.each([
    ['wrap', { wrap: true }, 'flex-wrap: wrap'],
    [
      'className',
      { className: { color: 'rebeccapurple' } },
      'color: rebeccapurple',
    ],
  ])('should apply style with %s property', (_, props, style) => {
    const { getByText } = render(
      <Box pixel="" {...props}>
        Content
      </Box>
    )

    expect(getByText('Content')).toHaveStyle(style)
  })
})
