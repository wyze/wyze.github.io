import { Section } from './Section'

type EmployerProps = {
  end?: string
  children: React.ReactNode
  start: string
}

export function Employer({ children, end = 'Present', start }: EmployerProps) {
  return (
    <Section className="w-full">
      <div className="flex shrink-0 grow-0 flex-col items-center justify-between xl:flex-row">
        <h2 className="text-2xl">
          <strong className="font-light">{children}</strong>
        </h2>
        <div className="text-xl font-light">
          ({start} {'—'} {end})
        </div>
      </div>
    </Section>
  )
}
