import { describe, expect, it } from 'vitest'

import { render, screen, within } from '~/test/test-utils'

import { GitHubItem } from './GitHubItem'

describe('<GitHubItem />', () => {
  it('should render', () => {
    const languages = [
      { colorHex: '#001122', name: 'Language 1', percent: 24 },
      { colorHex: '#334455', name: 'Language 2', percent: 40 },
      { colorHex: '#667788', name: 'Language 3', percent: 26 },
      { colorHex: '#99aabb', name: 'Language 4', percent: 10 },
    ]
    render(
      <GitHubItem
        description="A test repo"
        languages={languages}
        name="test/repo"
        stars={1000}
        url="//mock.local/test/repo"
      />
    )

    const name = screen.getByText('test/repo')

    expect(name).toBeInTheDocument()
    expect(name).toHaveAttribute('href', '//mock.local/test/repo')

    expect(screen.getByText('1,000')).toBeInTheDocument()
    expect(screen.getByText('A test repo')).toBeInTheDocument()

    // Bullet Structure
    const bulletContainer =
      screen.getByText('Language 1').parentElement ?? new HTMLElement()
    const bullet = within(bulletContainer)

    expect(Array.from(bulletContainer.childNodes)).toStrictEqual([
      bullet.getByTestId('language-color'),
      bullet.getByText('Language 1'),
      bullet.getByText('24%'),
    ])

    // Bullets
    for (const { colorHex, name, percent } of languages.slice(0, 3)) {
      const languageContainer =
        screen.getByText(name).parentElement ?? new HTMLElement()
      const language = within(languageContainer)

      expect(language.getByTestId('language-color')).toHaveStyle({
        backgroundColor: colorHex,
      })
      expect(language.getByText(name)).toBeInTheDocument()
      expect(language.getByText(`${percent}%`)).toBeInTheDocument()
    }

    expect(screen.getByText('+ 1 more')).toBeInTheDocument()

    // Bars
    for (const { colorHex, name, percent } of languages) {
      const bar = screen.getByTitle(name)

      expect(bar).toBeInTheDocument()
      expect(bar).toHaveStyle({
        backgroundColor: colorHex,
        width: `${percent}%`,
      })
    }
  })

  it('should strip html out of the description', () => {
    render(
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

    expect(screen.getByText('A test repo')).toBeInTheDocument()
  })
})
