import { ClassName } from '../types'
import { PropsWithChildren } from 'react'
import { useFela } from 'react-fela'

type LinkProps = PropsWithChildren<{
  className?: ClassName
  href: string
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

export function Link({ children, className = {}, href }: LinkProps) {
  const { css } = useFela()

  return (
    <a
      className={css(styles, className)}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}
