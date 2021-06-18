import { Section } from './Section'
import { css, cx, small } from '../styles'

import png from '../assets/me.png'
import webp from '../assets/me.png?webp'

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
      <picture>
        <source srcSet={webp} type="image/webp" />
        <source srcSet={png} type="image/png" />
        <img
          alt="Neil Kistner"
          src={png}
          className={styles.image}
          height={100}
          width={100}
        />
      </picture>
    </Section>
  )
}
