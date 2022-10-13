import clsx from 'clsx'

type SectionProps = {
  center?: boolean
  children: React.ReactNode
  className: string
}

export function Section({ center = true, children, className }: SectionProps) {
  return (
    <div className={clsx({ 'text-center': center }, className)}>{children}</div>
  )
}
