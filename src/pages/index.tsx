import {
  Box,
  Employer,
  Icon,
  IconType,
  Image,
  Pixel,
  Section,
} from '../components'
import { thin } from '../styles'
import { useEffect } from 'react'
import { createComponentWithProxy, useFela } from 'react-fela'

const dev = process.env.NODE_ENV !== 'production'

/*
  "hide": [
    display(none),
  ],
  "image": [
    flexBasis @@ pct(100.),
    paddingBottom @@ em(1.0),
    textAlign(center),
    media(breakpoint(Small), [
      flexBasis(auto),
      paddingBottom(zero),
    ]),
  ],
  "section": [
    flexBasis @@ pct(75.),
    flexGrow(1),
    flexShrink(1),
    width @@ pct(100.0),
  ]
*/

const styles = {
  container: {
    padding: '2em 1em',
    nested: {
      large: {
        padding: '4em 2em',
      },
    },
  },
  image: {
    flexBasis: 100,
    paddingBottom: 1,
    textAlign: 'center',
    nested: {
      small: {
        flexBasis: 'auto',
        paddingBottom: 0,
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
        }
      },
      ':not(:first-of-type)': {
        paddingTop: 1,
      },
    },
  },
} as const

const SocialIcon = createComponentWithProxy(styles.social, Icon)
const TeamIcon = createComponentWithProxy(styles.team, Icon)

export default function HomePage() {
  const { css } = useFela()

  useEffect(() => {
    if ('serviceWorker' in navigator && !dev) {
      navigator.serviceWorker.register('/service-worker.js')
    }
  }, [])

  return (
    <main className={css(styles.container)}>
      <Box wrap>
        <Pixel location="introduction" />
        <Section center={false} className={styles.image}>
          <Image alt="Neil Kistner" circle src="img/me-large.png" />
        </Section>
        <Section className={styles.section}>
          <h1>
            Hello, I'm <strong>Neil Kistner</strong>, a software engineer in{' '}
            <strong>St. Louis</strong>.
          </h1>
        </Section>
      </Box>
      <Box title="Me Around The Internet" wrap>
        <Pixel location="social" />
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
        <Pixel location="employment" />
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
        <Pixel location="core-team" />
        <TeamIcon href="//yarnpkg.com" icon={IconType.Yarn} />
        <TeamIcon href="//tessel.io" icon={IconType.Tessel} />
        <TeamIcon href="//starship.rs" icon={IconType.Starship} />
      </Box>
    </main>
  )
}
