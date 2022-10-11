import { Icon, IconType } from './Icon'
import { css } from 'otion'
import { render, screen } from '../../test-utils'

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
      <Icon
        className={css({ color: 'rebeccapurple' })}
        href=""
        icon={IconType.GitHub}
      />
    )

    expect(screen.getByText('github').closest('div')).toHaveStyle({
      color: 'rebeccapurple',
    })
  })
})
