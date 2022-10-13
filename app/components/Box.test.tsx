import { describe, expect, it } from 'vitest'

import { render, screen } from '~/test/test-utils'

import { Box } from './Box'

describe('<Box />', () => {
  it('should render', () => {
    render(<Box title="A title">Some content</Box>)

    const content = screen.getByText('Some content')

    expect(screen.getByText('A title')).toBeInTheDocument()
    expect(content).toBeInTheDocument()
    expect(content).toHaveClass('flex-nowrap')
  })

  it.each([
    ['wrap', { wrap: true }, 'flex-wrap'],
    [
      'className',
      { className: 'text-[rebeccapurple]' },
      'text-[rebeccapurple]',
    ],
  ])('should apply style with %s property', (_, props, className) => {
    render(<Box {...props}>Content</Box>)

    expect(screen.getByText('Content')).toHaveClass(className)
  })
})
