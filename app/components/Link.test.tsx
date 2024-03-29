import { describe, expect, it } from 'vitest'

import { render, screen, setup } from '~/test/test-utils'

import { Link } from './Link'

describe('<Link />', () => {
  it('should render', () => {
    const { user } = setup(<Link href="https://mock.local/1">Content</Link>)

    user.click(screen.getByText('Content'))

    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Content')).toHaveAttribute(
      'href',
      'https://mock.local/1'
    )
  })

  it('should apply style with className property', () => {
    render(
      <Link className="text-[rebeccapurple]" href="">
        Content
      </Link>
    )

    expect(screen.getByText('Content')).toHaveClass('text-[rebeccapurple]')
  })
})
