import { CssFelaStyle, useFela } from 'react-fela'
import { PropsWithChildren } from 'react'

type SectionProps = PropsWithChildren<{
  center?: boolean
  className: CssFelaStyle<{}, {}>
}>

const styles = ({ center }: Pick<SectionProps, 'center'>) =>
  ({
    textAlign: center ? 'center' : undefined,
    nested: {
      '& h1': {
        fontSize: 1.4,
      },
    },
  } as const)

export function Section({ center = true, children, className }: SectionProps) {
  const { css } = useFela()

  return <div className={css(styles({ center }), className)}>{children}</div>
}
