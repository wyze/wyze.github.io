import type { PropsWithChildren } from 'react'
import { css, cx } from '~/styles/helpers'

type SectionProps = PropsWithChildren<{
  center?: boolean
  className: string
}>

const styles = {
  center: css({
    textAlign: 'center',
  }),
  container: css({
    selectors: {
      '& h1': {
        fontSize: '1.4em',
      },
    },
  }),
}

export function Section({ center = true, children, className }: SectionProps) {
  return (
    <div
      className={cx(
        styles.container,
        center ? styles.center : undefined,
        className
      )}
    >
      {children}
    </div>
  )
}
