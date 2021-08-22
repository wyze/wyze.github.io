import { Section } from './Section'
import { css, cx, small } from '../styles'

import Image from 'next/image'

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
      <Image
        alt="Neil Kistner"
        src="/assets/me.png"
        className={styles.image}
        height={100}
        width={100}
      />
    </Section>
  )
}
