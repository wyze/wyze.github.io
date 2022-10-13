import { describe, expect, it } from 'vitest'

import { render, screen } from '~/test/test-utils'

import { Icon, IconType } from './Icon'

describe('<Icon />', () => {
  it.each([
    [IconType.GitHub],
    [IconType.LinkedIn],
    [IconType.StackOverflow],
    [IconType.Starship],
    [IconType.Tessel],
    [IconType.Twitter],
    [IconType.Yarn],
  ])('should render with %s', (icon) => {
    render(<Icon href="//mock.local" icon={icon} />)

    expect(screen.getByText(icon)).toBeInTheDocument()
    expect(screen.getByText(icon).closest('a')).toHaveAttribute(
      'href',
      '//mock.local'
    )
  })

  it('should apply style with className property', () => {
    render(
      <Icon className="text-[rebeccapurple]" href="" icon={IconType.GitHub} />
    )

    expect(screen.getByText('github').closest('div')).toHaveClass(
      'text-[rebeccapurple]'
    )
  })
})
