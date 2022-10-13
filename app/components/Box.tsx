import clsx from 'clsx'
import { forwardRef } from 'react'

type BoxProps = {
  children: React.ReactNode
  className?: string
  grid?: true
  title?: string
  wrap?: boolean
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  { children, className, grid, title, wrap = false },
  ref
) {
  return (
    <div ref={ref} className="rounded-lg bg-slate-200 p-6 shadow-lg">
      {title ? (
        <h1 className="mb-4 pb-2 text-3xl font-light text-slate-700/75 shadow-bottom">
          {title}
        </h1>
      ) : null}
      <div
        className={clsx(
          {
            'flex items-center justify-between': !grid,
            'flex-wrap': !grid && wrap,
            'flex-nowrap': !grid && !wrap,
          },
          className
        )}
      >
        {children}
      </div>
    </div>
  )
})
