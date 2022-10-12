import type { PropsWithChildren } from 'react'

import { css, cx, large, level, small } from '~/styles/helpers'

import { Section } from './Section'

type EmployerProps = PropsWithChildren<{
  end?: string
  start: string
}>

const styles = {
  child: cx(
    css({
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 0,
      flexShrink: 0,
    }),
    large({
      flexDirection: 'row',
    })
  ),
  h2: css({
    fontSize: '1.25em',
  }),
  section: cx(
    css({
      paddingBottom: '1em',
      width: '100%',
    }),
    small({
      paddingBottom: '0.5em',
      width: '50%',
    }),
    large({
      width: '48%',
      selectors: {
        '&:nth-child(even)': {
          paddingLeft: '0.5em',
        },
        '&:nth-child(odd)': {
          paddingRight: '0.5em',
        },
      },
    })
  ),
  months: css({
    fontWeight: 300,
  }),
  strong: css({
    fontWeight: 400,
  }),
}

export function Employer({ children, end = 'Present', start }: EmployerProps) {
  return (
    <Section className={styles.section}>
      <div className={cx(styles.child, css(level))}>
        <h2 className={styles.h2}>
          <strong className={styles.strong}>{children}</strong>
        </h2>
        <div className={styles.months}>
          ({start} {'—'} {end})
        </div>
      </div>
    </Section>
  )
}
