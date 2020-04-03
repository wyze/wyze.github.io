import { Icon, IconType } from './Icon'
import { render } from '../test-utils'

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
    const { getByText } = render(<Icon href="//mock.local" icon={icon} />)

    expect(getByText(icon)).toBeInTheDocument()
    expect(getByText(icon).closest('a')).toHaveAttribute('href', '//mock.local')
  })

  it('should apply style with className property', () => {
    const { getByText } = render(
      <Icon
        className={{ color: 'rebeccapurple' }}
        href=""
        icon={IconType.GitHub}
      />
    )

    expect(getByText('github').closest('div')).toHaveStyle({
      color: 'rebeccapurple',
    })
  })
})
