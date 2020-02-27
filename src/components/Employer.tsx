import { PropsWithChildren } from 'react'
import { Section } from './Section'
import { level } from '../styles'
import { useFela } from 'react-fela'

type EmployerProps = PropsWithChildren<{
  end?: string
  start: string
}>

const styles = {
  child: {
    display: 'block',
    nested: {
      small: {
        alignItems: 'center',
        display: 'flex',
        flexBasis: 50,
        flexGrow: 0,
        flexShrink: 0,
        justifyContent: 'space-between',
      },
    },
  },
  h2: {
    fontSize: 1.25,
  },
  section: {
    paddingBottom: 1,
    width: '100%',
    nested: {
      small: {
        paddingBottom: 0.5,
      },
      large: {
        width: '48%',
        nested: {
          ':nth-child(even)': {
            paddingLeft: 0.5,
          },
          ':nth-child(odd)': {
            paddingRight: 0.5,
          },
        },
      },
    },
  },
  months: {
    fontWeight: 300,
  },
  strong: {
    fontWeight: 400,
  }
}

export function Employer({ children, end = 'Present', start }: EmployerProps) {
  const { css } = useFela()

  return (
    <Section className={styles.section}>
      <div className={css(styles.child, level)}>
        <h2 className={css(styles.h2)}>
          <strong className={css(styles.strong)}>{children}</strong>
        </h2>
        <div className={css(styles.months)}>
          ({start} {'—'} {end})
        </div>
      </div>
    </Section>
  )
}
