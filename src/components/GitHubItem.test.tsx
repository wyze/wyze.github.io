import { GitHubItem } from './GitHubItem'
import { render, within } from '../test-utils'

describe('<GitHubItem />', () => {
  it('should render', () => {
    const languages = [
      { colorHex: '#001122', name: 'Language 1', percent: 24 },
      { colorHex: '#334455', name: 'Language 2', percent: 40 },
      { colorHex: '#667788', name: 'Language 3', percent: 26 },
      { colorHex: '#99aabb', name: 'Language 4', percent: 10 },
    ]
    const { getByText, getByTitle } = render(
      <GitHubItem
        description="A test repo"
        languages={languages}
        name="test/repo"
        stars={1000}
        url="//mock.local/test/repo"
      />
    )

    const name = getByText('test/repo')

    expect(name).toBeInTheDocument()
    expect(name).toHaveAttribute('href', '//mock.local/test/repo')

    expect(getByText('1,000')).toBeInTheDocument()
    expect(getByText('A test repo')).toBeInTheDocument()

    // Bullet Structure
    const bulletContainer =
      getByText('Language 1').parentElement ?? new HTMLElement()
    const bullet = within(bulletContainer)

    expect(Array.from(bulletContainer.childNodes)).toStrictEqual([
      bullet.getByTestId('language-color'),
      bullet.getByText('Language 1'),
      bullet.getByText('24%'),
    ])

    // Bullets
    for (const { colorHex, name, percent } of languages.slice(0, 3)) {
      const languageContainer =
        getByText(name).parentElement ?? new HTMLElement()
      const language = within(languageContainer)

      expect(language.getByTestId('language-color')).toHaveStyle({
        backgroundColor: colorHex,
      })
      expect(language.getByText(name)).toBeInTheDocument()
      expect(language.getByText(`${percent}%`)).toBeInTheDocument()
    }

    expect(getByText('+ 1 more')).toBeInTheDocument()

    // Bars
    for (const { colorHex, name, percent } of languages) {
      const bar = getByTitle(name)

      expect(bar).toBeInTheDocument()
      expect(bar).toHaveStyle({
        background: colorHex
          .slice(1)
          .match(/.{2}(?=(.{2})+(?!.))|.{2}$/g)
          ?.map((hex) => parseInt(hex, 16)),
        width: `${percent}%`,
      })
    }
  })

  it('should strip html out of the description', () => {
    const { getByText } = render(
      <GitHubItem
        description={
          'A test <img alt="A description" src="//mock.local/image.png" /> repo'
        }
        languages={[]}
        name="test/repo"
        stars={0}
        url="//mock.local/test/repo"
      />
    )

    expect(getByText('A test repo')).toBeInTheDocument()
  })
})
