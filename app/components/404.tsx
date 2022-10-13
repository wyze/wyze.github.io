import { GhostFloating, Shadow } from '~/svgs'

import { Section } from './Section'

export function FourOhFourPage() {
  return (
    <Section
      center
      className="flex h-screen flex-col items-center justify-center gap-10 text-xl font-medium text-[#f4f6ff]"
    >
      <GhostFloating />
      <div className="h-12 w-24">
        <Shadow />
      </div>
      <h1 className="text-3xl">Whoops!</h1>
      <div>
        We couldn{"'"}t find the page you <br />
        were looking for.
      </div>
    </Section>
  )
}
