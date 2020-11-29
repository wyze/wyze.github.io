import * as octokit from '@octokit/graphql'
import { Repository } from '../types'
import { fireEvent, render } from '../test-utils'
import HomePage, { getStaticProps } from '.'

jest.mock('@octokit/graphql')
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

const createLanguages = (): Repository['languages'] => ({
  edges: [
    { node: { color: '#000000', name: 'JavaScript' }, size: 1 },
    { node: { color: '#663399', name: 'TypeScript' }, size: 2 },
  ],
  totalSize: 3,
})

const createRepo = ({
  isArchived,
  isPrivate,
  owner: login,
  name,
  shortDescriptionHTML,
  stargazers: totalCount,
}: Omit<
  Repository,
  'languages' | 'nameWithOwner' | 'owner' | 'stargazers' | 'url'
> & {
  owner: string
  stargazers: number
}) => ({
  isArchived,
  isPrivate,
  name,
  nameWithOwner: `${login}/${name}`,
  owner: {
    login,
  },
  languages: createLanguages(),
  shortDescriptionHTML: shortDescriptionHTML.slice(0, 100),
  stargazers: {
    totalCount,
  },
  url: `//mock.local/${login}/${name}`,
})

describe('<HomePage />', () => {
  it('should render', () => {
    const { getByText } = render(
      <HomePage
        contributions={[
          {
            description: 'A mock repo 1.',
            languages: [
              {
                colorHex: '#663399',
                name: 'TypeScript',
                percent: 66.66666666666666,
              },
              {
                colorHex: '#000000',
                name: 'JavaScript',
                percent: 33.33333333333333,
              },
            ],
            name: 'mock/repo-1',
            stars: 100,
            url: '//mock.local/mock/repo-1',
          },
        ]}
        projects={[
          {
            description: 'The personal website of me.',
            languages: [
              {
                colorHex: '#663399',
                name: 'TypeScript',
                percent: 66.66666666666666,
              },
              {
                colorHex: '#000000',
                name: 'JavaScript',
                percent: 33.33333333333333,
              },
            ],
            name: 'wyze.github.io',
            stars: 7,
            url: '//mock.local/wyze/wyze.github.io',
          },
        ]}
      />
    )

    expect(
      getByText(
        (_, element) =>
          element.textContent ===
          "Hello, I'm Neil Kistner, a software engineer in St. Louis.",
        { selector: 'main > div' }
      )
    ).toBeInTheDocument()

    // Scroll page to render data
    fireEvent.scroll(window)
  })
})

describe('getStaticProps', () => {
  it('should fetch data from github', async () => {
    jest.spyOn(octokit, 'graphql').mockResolvedValue({
      viewer: {
        projects: {
          nodes: [
            createRepo({
              isArchived: false,
              isPrivate: false,
              owner: 'wyze',
              name: 'wyze.github.io',
              shortDescriptionHTML: 'The personal website of me.',
              stargazers: 7,
            }),
          ],
        },
        contributions1: {
          nodes: [
            {
              repository: createRepo({
                isArchived: false,
                isPrivate: false,
                owner: 'mock',
                name: 'repo-1',
                shortDescriptionHTML: 'A mock repo 1.',
                stargazers: 100,
              }),
            },
          ],
        },
        contributions2: {
          nodes: [
            {
              repository: createRepo({
                isArchived: false,
                isPrivate: false,
                owner: 'mock',
                name: 'repo-2',
                shortDescriptionHTML: 'A mock repo 2.',
                stargazers: 123456,
              }),
            },
          ],
        },
        contributions3: { nodes: [] },
      },
    })

    const data = await getStaticProps()

    expect(data).toMatchInlineSnapshot(`
      Object {
        "props": Object {
          "contributions": Array [
            Object {
              "description": "A mock repo 2.",
              "languages": Array [
                Object {
                  "colorHex": "#663399",
                  "name": "TypeScript",
                  "percent": 66.66666666666666,
                },
                Object {
                  "colorHex": "#000000",
                  "name": "JavaScript",
                  "percent": 33.33333333333333,
                },
              ],
              "name": "mock/repo-2",
              "stars": 123456,
              "url": "//mock.local/mock/repo-2",
            },
            Object {
              "description": "A mock repo 1.",
              "languages": Array [
                Object {
                  "colorHex": "#663399",
                  "name": "TypeScript",
                  "percent": 66.66666666666666,
                },
                Object {
                  "colorHex": "#000000",
                  "name": "JavaScript",
                  "percent": 33.33333333333333,
                },
              ],
              "name": "mock/repo-1",
              "stars": 100,
              "url": "//mock.local/mock/repo-1",
            },
          ],
          "projects": Array [
            Object {
              "description": "The personal website of me.",
              "languages": Array [
                Object {
                  "colorHex": "#663399",
                  "name": "TypeScript",
                  "percent": 66.66666666666666,
                },
                Object {
                  "colorHex": "#000000",
                  "name": "JavaScript",
                  "percent": 33.33333333333333,
                },
              ],
              "name": "wyze.github.io",
              "stars": 7,
              "url": "//mock.local/wyze/wyze.github.io",
            },
          ],
        },
        "revalidate": 1,
      }
    `)
  })
})
