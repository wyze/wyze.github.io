import { Section } from './Section'

export function Me() {
  return (
    <Section center={false} className="basis-full md:basis-auto">
      <img
        alt="Neil Kistner"
        className="m-auto rounded-full"
        height={100}
        src="/assets/me.png"
        width={100}
      />
    </Section>
  )
}
