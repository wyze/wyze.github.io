import { Box, Image, Pixel, Section } from '../components'
import { thin } from '../styles'
import { useEffect } from 'react'
import { useFela } from 'react-fela'

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
} as const

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
      <Box title="Me Around The Internet" />
    </main>
  )
}
