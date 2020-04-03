import * as octokit from '@octokit/graphql'
import { Repository } from '../types'
import { render } from '../test-utils'
import HomePage, { getStaticProps } from '../pages'

jest.mock('../log')
jest.mock('@octokit/graphql')

const createLanguages = (): Repository['languages'] => ({
  edges: [{ node: { color: '#000000', name: 'JavaScript' }, size: 1 }],
  totalSize: 1,
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
    const { getByText } = render(<HomePage contributions={[]} projects={[]} />)

    expect(
      getByText(
        (_, element) =>
          element.textContent ===
          "Hello, I'm Neil Kistner, a software engineer in St. Louis.",
        { selector: 'main > div' }
      )
    ).toBeInTheDocument()
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
              owner: 'facebook',
              name: 'react',
              shortDescriptionHTML: 'The V in MVC.',
              stargazers: 123456,
            }),
          ],
        },
        contributions1: { nodes: [] },
        contributions2: { nodes: [] },
        contributions3: { nodes: [] },
      },
    })

    const data = await getStaticProps()

    expect(data).toMatchInlineSnapshot(`
      Object {
        "props": Object {
          "contributions": Array [],
          "projects": Array [
            Object {
              "description": "The V in MVC.",
              "languages": Array [
                Object {
                  "colorHex": "#000000",
                  "name": "JavaScript",
                  "percent": 100,
                },
              ],
              "name": "facebook/react",
              "stars": 123456,
              "url": "//mock.local/facebook/react",
            },
          ],
        },
      }
    `)
  })
})
