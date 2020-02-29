import { CssFelaStyle, useFela } from 'react-fela'
import { PropsWithChildren } from 'react'
import { forwardRef } from 'react'
import { level, makeRGBA } from '../styles'

type BoxProps = PropsWithChildren<{
  className?: CssFelaStyle<{}, {}>
  title?: string
  wrap?: boolean
}>

const boxShadow = makeRGBA(0.1)

const styles = {
  child: ({ wrap }: BoxProps) =>
    ({
      flexWrap: wrap ? 'wrap' : 'nowrap',
    } as const),
  container: {
    backgroundColor: 'hsl(200, 25%, 94%)',
    borderRadius: 5,
    boxShadow: `0 2px 3px 0 ${boxShadow}, 0 0 0 1px ${boxShadow}`,
    padding: 1,
    nested: {
      ':not(:first-child)': {
        marginTop: 2,
      },
      large: {
        nested: {
          ':not(:first-child)': {
            marginTop: 4,
          },
        },
      },
    },
  },
  title: {
    boxShadow: `0 2px 2px -2px ${makeRGBA(0.25)}`,
    color: makeRGBA(0.75),
    fontSize: 1.4,
    fontWeight: 300,
    marginBottom: 0.5,
    paddingBottom: 0.25,
  },
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  { children, className = {}, title, wrap = false },
  ref
) {
  const { css } = useFela({ wrap })

  return (
    <div ref={ref} className={css(styles.container)}>
      {title && <h1 className={css(styles.title)}>{title}</h1>}
      <div className={css(styles.child, level, className)}>{children}</div>
    </div>
  )
})
