import { PropsWithChildren } from 'react'
import { css, cx, large, level, makeRGBA } from '../styles'
import { forwardRef } from 'react'

type BoxProps = PropsWithChildren<{
  className?: string
  grid?: true
  title?: string
  wrap?: boolean
}>

const boxShadow = makeRGBA(0.1)

const styles = {
  container: cx(
    css({
      backgroundColor: 'hsl(200, 25%, 94%)',
      borderRadius: 5,
      boxShadow: `0 2px 3px 0 ${boxShadow}, 0 0 0 1px ${boxShadow}`,
      padding: '1em',
      selectors: {
        '&:not(:first-child)': {
          marginTop: '2em',
        },
      },
    }),
    large({
      selectors: {
        '&:not(:first-child)': {
          marginTop: '4em',
        },
      },
    })
  ),
  title: css({
    boxShadow: `0 2px 2px -2px ${makeRGBA(0.25)}`,
    color: makeRGBA(0.75),
    fontSize: '1.4em',
    fontWeight: 300,
    marginBottom: '0.5em',
    paddingBottom: '0.25em',
  }),
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  { children, className = '', grid, title, wrap = false },
  ref
) {
  return (
    <div ref={ref} className={styles.container}>
      {title ? <h1 className={styles.title}>{title}</h1> : null}
      <div
        className={cx(
          css({
            flexWrap: wrap ? 'wrap' : 'nowrap',
          }),
          grid ? undefined : css(level),
          className
        )}
      >
        {children}
      </div>
    </div>
  )
})
