import { GhostFloating, Shadow } from '../svgs'
import { Section } from '../components'
import { useEffect } from 'react'
import { useFela } from 'react-fela'
import { view } from '../log'

const styles = {
  container: {
    alignContent: 'center',
    color: '#f4f6ff',
    display: 'grid',
    height: '100vh',
    justifyContent: 'center',
    justifyItems: 'center',
  },
  shadow: {
    height: 3,
    marginTop: 1,
    width: 6,
  },
}

export default function FourOhFourPage() {
  const { css } = useFela()

  useEffect(() => {
    view()
  }, [])

  return (
    <Section center className={styles.container}>
      <GhostFloating />
      <div className={css(styles.shadow)}>
        <Shadow />
      </div>
      <h1>Whoops!</h1>
      <div>
        We couldn't find the page you
        <br />
        were looking for.
      </div>
    </Section>
  )
}
