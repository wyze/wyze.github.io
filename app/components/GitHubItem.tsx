import type { getData } from '~/services/github.server'
import { Star } from '~/svgs'

import { Link } from './Link'
import { Section } from './Section'

type GitHubItemProps = Awaited<ReturnType<typeof getData>>['projects'][number]

const { format: formatStars } = Intl.NumberFormat('en-US')
const { format: formatLanguage } = Intl.NumberFormat('en-US', {
  minimumFractionDigits: 1,
  style: 'percent',
})

export function GitHubItem({
  description,
  languages,
  name,
  stars,
  url,
}: GitHubItemProps) {
  const [bullets, bars] = languages
    .sort((left, right) => right.percent - left.percent)
    .reduce(
      ([bullets, bars], { colorHex, name, percent }) => {
        const backgroundColor = colorHex
        const width = formatLanguage(percent / 100).replace('.0', '')

        const bullet = (
          <div
            key={name}
            className="mr-3 grid grid-cols-language items-center gap-1"
          >
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor }}
              data-testid="language-color"
            />
            <div className="font-semibold">{name}</div>
            <div>{width}</div>
          </div>
        )

        const bar = (
          <span key={name} style={{ backgroundColor, width }} title={name} />
        )

        return [
          [...bullets, bullet],
          [...bars, bar],
        ]
      },
      [[], []] as [JSX.Element[], JSX.Element[]]
    )

  return (
    <Section
      center={false}
      className="flex h-full min-h-[10rem] flex-col overflow-hidden rounded-md bg-sky-50 text-lg shadow"
    >
      <Section
        center={false}
        className="flex items-center justify-between px-4 pt-2"
      >
        <Link className="break-words text-xl" href={url}>
          {name}
        </Link>
        <div className="flex h-4 items-center justify-end italic">
          <Star />
          {formatStars(stars)}
        </div>
      </Section>
      <Section
        center={false}
        className="overflow-hidden text-ellipsis break-words py-1 px-4"
      >
        {description.replace(/<[^>]*>?/gm, '')}
      </Section>
      <div className="mt-auto flex w-full flex-col">
        <div className="flex flex-wrap px-4 pb-2 text-sm">
          {bullets.slice(0, 3)}
          {bullets.length > 3 && (
            <span className="text-[#6b6b6b]">+ {bullets.length - 3} more</span>
          )}
        </div>
        <div className="flex w-full shrink-0 grow-0 basis-3">{bars}</div>
      </div>
    </Section>
  )
}
