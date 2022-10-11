import type { PropsWithChildren } from 'react'
import { css, cx } from '~/styles/helpers'

type LinkProps = PropsWithChildren<{
  className?: string
  href: string
}>

const styles = css({
  color: '#8b008b',
  textDecoration: 'none',
  transitionDuration: '500ms',
  ':hover': {
    color: '#8b0000',
  },
})

export function Link({ children, className = '', href }: LinkProps) {
  return (
    <a
      className={cx(styles, className)}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}
