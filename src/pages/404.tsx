import { GhostFloating, Shadow } from '../svgs'
import { Section } from '../components'
import { css } from 'otion'

const styles = {
  container: css({
    alignContent: 'center',
    color: '#f4f6ff',
    display: 'grid',
    height: '100vh',
    justifyContent: 'center',
    justifyItems: 'center',
  }),
  shadow: css({
    height: '3em',
    marginTop: '1em',
    width: '6em',
  }),
}

export default function FourOhFourPage() {
  return (
    <Section center className={styles.container}>
      <GhostFloating />
      <div className={styles.shadow}>
        <Shadow />
      </div>
      <h1>Whoops!</h1>
      <div>
        We couldn{"'"}t find the page you <br />
        were looking for.
      </div>
    </Section>
  )
}
