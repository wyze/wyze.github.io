import { css, cx, small } from '~/styles/helpers'

import { Section } from './Section'

const styles = {
  container: cx(
    css({
      flexBasis: '100%',
      paddingBottom: 1,
      textAlign: 'center',
    }),
    small({
      flexBasis: 'auto',
      paddingBottom: 0,
    })
  ),
  image: css({
    maxHeight: '100px',
    borderRadius: '50%',
  }),
}

export function Me() {
  return (
    <Section center={false} className={styles.container}>
      <img
        alt="Neil Kistner"
        className={styles.image}
        height={100}
        src="/assets/me.png"
        width={100}
      />
    </Section>
  )
}
