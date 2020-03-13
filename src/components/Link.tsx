import { CssFelaStyle, useFela } from 'react-fela'
import { PropsWithChildren } from 'react'
import { click } from '../log'

type LinkProps = PropsWithChildren<{
  className?: CssFelaStyle<{}, {}>
  href: string
  title?: string
}>

const styles = {
  color: '#8b008b',
  textDecoration: 'none',
  transitionDuration: '500ms',
  nested: {
    ':hover': {
      color: '#8b0000',
    },
  },
}

export function Link({
  children,
  className = {},
  href,
  title = '',
}: LinkProps) {
  const { css } = useFela()

  return (
    <a
      className={css(styles, className)}
      href={href}
      onClick={() => click(href.replace(/(^|\w|:)+\/\//, ''))}
      rel="noopener noreferrer"
      target="_blank"
      title={title}
    >
      {children}
    </a>
  )
}
