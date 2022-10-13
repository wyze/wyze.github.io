import clsx from 'clsx'

type LinkProps = {
  children: React.ReactNode
  className?: string
  href: string
}

export function Link({ children, className = '', href }: LinkProps) {
  return (
    <a
      className={clsx(
        'text-[#8b008b] no-underline transition-colors duration-500 hover:text-[#8b0000]',
        className
      )}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}
