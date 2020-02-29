import { CssFelaStyle, useFela } from 'react-fela'
import { PropsWithChildren } from 'react'
import { forwardRef } from 'react'
import { level, makeRGBA } from '../styles'
import { useIntersectionObserver } from '../hooks'

type ForwardMutableRef<T = HTMLDivElement | null, P = BoxProps> = (
  render: (props: PropsWithChildren<P>, ref: React.MutableRefObject<T>) => React.ReactElement | null
) => React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>

type BoxProps = PropsWithChildren<{
  className?: CssFelaStyle<{}, {}>
  pixel: string
  title?: string
  wrap?: boolean
}>

const boxShadow = makeRGBA(0.1)

const styles = {
  child: ({ wrap }: Pick<BoxProps, 'wrap'>) =>
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
  image: {
    display: 'none',
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

const forwardMutableRef = forwardRef as ForwardMutableRef

export const Box = forwardMutableRef(function Box(
  { children, className = {}, pixel, title, wrap = false }: BoxProps,
  ref
) {
  const { css } = useFela({ wrap })
  const [boxRef, visible] = useIntersectionObserver()

  return (
    <div
      ref={(instance) => {
        if (ref && typeof ref !== 'function') {
          ref.current = instance
        }

        boxRef.current = instance
      }}
      className={css(styles.container)}
    >
      {visible && <img
        alt={pixel}
        className={css(styles.image)}
        src={`/pixel/${pixel}.png`}
      />}
      {title && <h1 className={css(styles.title)}>{title}</h1>}
      <div className={css(styles.child, level, className)}>{children}</div>
    </div>
  )
})
