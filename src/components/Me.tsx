import { Section } from './Section'
import { useFela } from 'react-fela'
import png from '../assets/me.png'
import webp from '../assets/me.png?webp'

const styles = {
  container: {
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
  image: {
    maxHeight: '100px',
    borderRadius: '50%',
  },
} as const

export function Me() {
  const { css } = useFela()

  return (
    <Section center={false} className={styles.container}>
      <picture>
        <source srcSet={webp} type="image/webp" />
        <source srcSet={png} type="image/png" />
        <img
          alt="Neil Kistner"
          src={png}
          className={css(styles.image)}
          height={100}
          width={100}
        />
      </picture>
    </Section>
  )
}
