import { PropsWithChildren } from 'react'
import { useFela } from 'react-fela'

type BoxProps = PropsWithChildren<{}>

const styles = {
  backgroundColor: 'hsl(200, 25%, 94%)',
  borderRadius: 5,
}

export function Box({ children }: BoxProps) {
  const { css } = useFela()

  return <div className={css(styles)}>{children}</div>
}
