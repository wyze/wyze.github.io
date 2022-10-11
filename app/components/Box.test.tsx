import { Box } from './Box'
import { css } from 'otion'
import { render, screen } from '../../test-utils'

describe('<Box />', () => {
  it('should render', () => {
    render(<Box title="A title">Some content</Box>)

    const content = screen.getByText('Some content')

    expect(screen.getByText('A title')).toBeInTheDocument()
    expect(content).toBeInTheDocument()
    expect(content).toHaveStyle('flex-wrap: nowrap')
  })

  it.each([
    ['wrap', { wrap: true }, 'flex-wrap: wrap'],
    [
      'className',
      { className: css({ color: 'rebeccapurple' }) },
      'color: rebeccapurple',
    ],
  ])('should apply style with %s property', (_, props, style) => {
    render(<Box {...props}>Content</Box>)

    expect(screen.getByText('Content')).toHaveStyle(style)
  })
})