import { type LoaderArgs, json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import type { ComponentProps } from 'react'

import {
  Box,
  Employer,
  GitHubItem,
  Icon,
  IconType,
  Link,
  Me,
  Section,
} from '~/components'
import { getData } from '~/services/github.server'
import { css, cx, large, small, thin } from '~/styles/helpers'

const styles = {
  conclusion: css({
    width: '100%',
    selectors: {
      '& > h2': {
        fontSize: '1.25em',
      },
    },
  }),
  container: cx(
    css({
      padding: '2em 1em',
    }),
    large({
      padding: '4em 2em',
    })
  ),
  github: cx(
    css({
      display: 'grid',
      gridGap: 10,
      gridTemplateColumns: '1fr',
    }),
    small(
      {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      true
    ),
    large({
      gridTemplateColumns: 'repeat(3, 1fr)',
    })
  ),
  section: css({
    flexBasis: 75,
    flexGrow: 1,
    flexShrink: 1,
    width: '100%',
    selectors: {
      '& > h1': thin,
      '& > h1 > strong': {
        fontWeight: 400,
      },
    },
  }),
  social: cx(
    css({
      flexBasis: 50,
      flexGrow: 0,
      flexShrink: 0,
      margin: '0.5em 0',
      paddingTop: 0.4,
    }),
    small({
      flexBasis: '25%',
      margin: 0,
    })
  ),
  team: cx(
    css({
      paddingTop: 0.4,
      width: '100%',
      selectors: {
        '&:not(:first-of-type)': {
          paddingTop: 1,
        },
      },
    }),
    small({
      width: '50%',
      selectors: {
        '&:not(:first-of-type)': {
          paddingTop: 0.4,
        },
        '&:last-of-type': {
          marginLeft: '25%',
        },
      },
    }),
    large({
      width: '33%',
      selectors: {
        '&:last-of-type': {
          marginLeft: 0,
        },
      },
    })
  ),
}

function SocialIcon(props: ComponentProps<typeof Icon>) {
  return <Icon className={styles.social} {...props} />
}

function TeamIcon(props: ComponentProps<typeof Icon>) {
  return <Icon className={styles.team} {...props} />
}

export async function loader({ context }: LoaderArgs) {
  return json(await getData(context))
}

export default function Index() {
  const { contributions, projects } = useLoaderData<typeof loader>()

  return (
    <main className={styles.container}>
      <Box wrap>
        <Me />
        <Section className={styles.section}>
          <h1>
            Hello, I{"'"}m <strong>Neil Kistner</strong>, a software engineer in{' '}
            <strong>St. Louis</strong>.
          </h1>
        </Section>
      </Box>
      <Box title="Me Around The Internet" wrap>
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
      <Box title="Employment" wrap>
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
      <Box title="Core Team Member" wrap>
        <TeamIcon href="//yarnpkg.com" icon={IconType.Yarn} />
        <TeamIcon href="//tessel.io" icon={IconType.Tessel} />
        <TeamIcon href="//starship.rs" icon={IconType.Starship} />
      </Box>
      <Box className={styles.github} grid title="Contributions Made">
        {contributions.map((contribution) => (
          <GitHubItem key={contribution.name} {...contribution} />
        ))}
      </Box>
      <Box className={styles.github} grid title="Open Source Projects">
        {projects.map((project) => (
          <GitHubItem key={project.name} {...project} />
        ))}
      </Box>
      <Box>
        <Section className={styles.conclusion}>
          <h2 className={css(thin)}>
            Download <Link href="/assets/resume.pdf">résumé</Link>. View{' '}
            <Link href="//github.com/wyze/wyze.github.io">source</Link>.
          </h2>
        </Section>
      </Box>
    </main>
  )
}
