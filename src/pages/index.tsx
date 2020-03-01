import {
  Box,
  Employer,
  GitHubItem,
  Icon,
  IconType,
  Link,
  Me,
  Section,
} from '../components'
import { GitHubInfo, Repository, ViewerResponse } from '../types'
import { createComponentWithProxy, useFela } from 'react-fela'
import { graphql } from '@octokit/graphql'
import { thin } from '../styles'
import { useEffect, useState } from 'react'
import resume from '../assets/resume.pdf'

type HomePageProps = {
  contributions: GitHubInfo[]
  projects: GitHubInfo[]
}

const dev = process.env.NODE_ENV !== 'production'

const styles = {
  conclusion: {
    width: '100%',
    nested: {
      '> h2': {
        fontSize: 1.25,
      },
    },
  },
  container: {
    padding: '2em 1em',
    nested: {
      large: {
        padding: '4em 2em',
      },
    },
  },
  github: {
    display: 'grid',
    gridGap: 10,
    gridTemplateColumns: '1fr',
    nested: {
      large: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
      small: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
    },
  },
  section: {
    flexBasis: 75,
    flexGrow: 1,
    flexShrink: 1,
    width: '100%',
    nested: {
      '> h1': {
        ...thin,
        nested: {
          '> strong': {
            fontWeight: 400,
          },
        },
      },
    },
  },
  social: {
    flexBasis: 50,
    flexGrow: 0,
    flexShrink: 0,
    margin: '0.5em 0',
    paddingTop: 0.4,
    nested: {
      small: {
        flexBasis: 25,
        margin: 0,
      },
    },
  },
  team: {
    paddingTop: 0.4,
    width: '100%',
    nested: {
      small: {
        nested: {
          ':not(:first-of-type)': {
            paddingTop: 0.4,
          },
          ':last-of-type': {
            marginLeft: '25%',
          },
        },
        width: '50%',
      },
      large: {
        width: '33%',
        nested: {
          ':last-of-type': {
            marginLeft: 0,
          },
        },
      },
      ':not(:first-of-type)': {
        paddingTop: 1,
      },
    },
  },
} as const

const SocialIcon = createComponentWithProxy(styles.social, Icon)
const TeamIcon = createComponentWithProxy(styles.team, Icon)

export default function HomePage({ contributions, projects }: HomePageProps) {
  const { css } = useFela()
  const [renderData, setRenderData] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator && !dev) {
      navigator.serviceWorker.register('/service-worker.js')
    }
  }, [])

  useEffect(() => {
    if (window && !renderData) {
      const scroller = () => {
        setRenderData(true)
      }

      window.addEventListener('scroll', scroller)

      return () => window.removeEventListener('scroll', scroller)
    }
  }, [renderData])

  return (
    <main className={css(styles.container)}>
      <Box pixel="introduction" wrap>
        <Me />
        <Section className={styles.section}>
          <h1>
            Hello, I'm <strong>Neil Kistner</strong>, a software engineer in{' '}
            <strong>St. Louis</strong>.
          </h1>
        </Section>
      </Box>
      <Box pixel="social" title="Me Around The Internet" wrap>
        <SocialIcon href="//github.com/wyze" icon={IconType.GitHub} />
        <SocialIcon href="//twitter.com/wyze" icon={IconType.Twitter} />
        <SocialIcon
          href="//linkedin.com/in/neilkistner"
          icon={IconType.LinkedIn}
        />
        <SocialIcon
          href="//stackoverflow.com/users/1507905/neil-kistner"
          icon={IconType.StackOverflow}
        />
      </Box>
      <Box pixel="employment" title="Employment" wrap>
        <Employer start="April 2017">Juristat</Employer>
        <Employer end="April 2017" start="September 2015">
          Monsanto
        </Employer>
        <Employer end="September 2015" start="December 2013">
          Safety National
        </Employer>
        <Employer end="December 2013" start="February 2012">
          SteadyRain
        </Employer>
        <Employer end="February 2012" start="April 2011">
          CSC
        </Employer>
        <Employer end="March 2011" start="March 2007">
          Panera Bread
        </Employer>
      </Box>
      <Box pixel="core-team" title="Core Team Member" wrap>
        <TeamIcon href="//yarnpkg.com" icon={IconType.Yarn} />
        <TeamIcon href="//tessel.io" icon={IconType.Tessel} />
        <TeamIcon href="//starship.rs" icon={IconType.Starship} />
      </Box>
      <Box
        className={styles.github}
        pixel="contributions"
        title="Contributions Made"
        wrap
      >
        {renderData &&
          contributions.map((contribution) => (
            <GitHubItem key={contribution.name} {...contribution} />
          ))}
      </Box>
      <Box
        className={styles.github}
        pixel="projects"
        title="Open Source Projects"
        wrap
      >
        {renderData &&
          projects.map((project) => (
            <GitHubItem key={project.name} {...project} />
          ))}
      </Box>
      <Box pixel="conclusion">
        <Section className={styles.conclusion}>
          <h2 className={css(thin)}>
            Download <Link href={resume}>résumé</Link>. View{' '}
            <Link href="//github.com/wyze/wyze.github.io">source</Link>.
          </h2>
        </Section>
      </Box>
    </main>
  )
}

export async function getStaticProps() {
  const { viewer } = (await graphql(
    `
      {
        viewer {
          contributions1: pullRequests(first: 100, states: [MERGED]) {
            nodes {
              repository {
                ...RepoFields
              }
            }
          }
          contributions2: pullRequests(
            after: "Y3Vyc29yOnYyOpHOBZoUUA=="
            first: 100
            states: [MERGED]
          ) {
            nodes {
              repository {
                ...RepoFields
              }
            }
          }
          contributions3: pullRequests(
            after: "Y3Vyc29yOnYyOpHODSNyWw=="
            first: 100
            states: [MERGED]
          ) {
            nodes {
              repository {
                ...RepoFields
              }
            }
          }
          projects: repositories(
            orderBy: { direction: DESC, field: STARGAZERS }
            ownerAffiliations: [OWNER]
            first: 100
            isFork: false
            privacy: PUBLIC
          ) {
            nodes {
              ...RepoFields
            }
          }
        }
      }

      fragment RepoFields on Repository {
        isArchived
        isPrivate
        name
        nameWithOwner
        owner {
          login
        }
        languages(first: 20) {
          edges {
            node {
              color
              name
            }
            size
          }
          totalSize
        }
        shortDescriptionHTML(limit: 100)
        stargazers {
          totalCount
        }
        url
      }
    `,
    { headers: { authorization: `token ${process.env.GITHUB_TOKEN}` } }
  )) as ViewerResponse
  const itemCount = 24

  const transformLanguages = ({ edges, totalSize }: Repository['languages']) =>
    edges
      .map(({ node: { color, name }, size }) => ({
        colorHex: color ?? '#ccc',
        name,
        percent: (size / totalSize) * 100,
      }))
      .sort((left, right) => right.percent - left.percent)
      .filter((project) => project.percent >= 0.1)

  const projects = viewer.projects.nodes
    .filter((project) => !project.isArchived)
    .map(
      ({
        languages,
        name,
        nameWithOwner,
        shortDescriptionHTML,
        stargazers: { totalCount },
        url,
      }) => ({
        description: shortDescriptionHTML,
        languages: transformLanguages(languages),
        name: nameWithOwner.startsWith('wyze/') ? name : nameWithOwner,
        stars: totalCount,
        url,
      })
    )
    .slice(0, itemCount)

  const contributions = [
    ...viewer.contributions1.nodes,
    ...viewer.contributions2.nodes,
    ...viewer.contributions3.nodes,
  ]
    .reduce(
      (acc, { repository }) =>
        acc.find((item) => item.nameWithOwner === repository.nameWithOwner) ||
        repository.owner.login === 'wyze' ||
        repository.isArchived ||
        repository.isPrivate
          ? acc
          : [...acc, repository],
      [] as Repository[]
    )
    .map(
      ({
        languages,
        nameWithOwner,
        shortDescriptionHTML,
        stargazers: { totalCount },
        url,
      }) => ({
        description: shortDescriptionHTML,
        languages: transformLanguages(languages),
        name: nameWithOwner,
        stars: totalCount,
        url,
      })
    )
    .sort((left, right) => right.stars - left.stars)
    .slice(0, itemCount)

  return { props: { contributions, projects } }
}
