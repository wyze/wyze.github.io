import { GitHubInfo } from '../types'
import { Link } from './Link'
import { Section } from './Section'
import { Star } from '../svgs'
import { level, makeRGBA } from '../styles'
import { useFela } from 'react-fela'

type GitHubItemProps = GitHubInfo

const { format: formatStars } = Intl.NumberFormat('en-US')
const shadowColor = makeRGBA(0.175)

const styles = {
  bar: {
    display: 'flex',
    flexBasis: '12px',
    flexGrow: 0,
    flexShrink: 0,
    width: '100.1%',
  },
  bold: {
    fontWeight: 600,
  },
  bullets: {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: 0.75,
    padding: '0 0.5em 0.25em',
  },
  circle: {
    borderRadius: '100%',
    height: '12px',
    width: '12px',
  },
  container: {
    backgroundColor: 'hsl(200, 33%, 96%)',
    borderRadius: 5,
    boxShadow: `0 2px 3px 0 ${shadowColor}, 0 0 0 1px ${shadowColor}`,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 9,
    overflow: 'hidden',
  },
  description: {
    fontSize: 0.95,
    overflow: 'hidden',
    padding: '0.25em 0.5em',
    textOverflow: 'ellipsis',
    wordBreak: 'break-word',
  },
  languages: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'auto',
    width: '100%',
  },
  language: {
    alignItems: 'center',
    display: 'grid',
    gridGap: 6,
    gridTemplateColumns: 'repeat(3, auto)',
    marginRight: '12px',
  },
  link: {
    fontSize: 1.05,
    wordBreak: 'break-word',
  },
  star: {
    fontSize: 0.95,
    fontStyle: 'italic',
    height: 1.05,
    justifyContent: 'flex-end',
  },
  title: {
    padding: '0.5em 0.5em 0',
  },
} as const

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
  const { css } = useFela()
  const [bullets, bars] = languages
    .sort((left, right) => right.percent - left.percent)
    .reduce(
      ([bullets, bars], { colorHex, name, percent }) => {
        const background = { backgroundColor: colorHex }
        const width = formatLanguage(percent / 100)

        const bullet = (
          <div className={css(styles.language)}>
            <div className={css(background, styles.circle)} />
            <div className={css(styles.bold)}>{name}</div>
            <div>{width}</div>
          </div>
        )

        const bar = <span className={css(background, { width })} title={name} />

        return [
          [...bullets, bullet],
          [...bars, bar],
        ]
      },
      [[], []] as [JSX.Element[], JSX.Element[]]
    )

  return (
    <Section center={false} className={styles.container}>
      <Section center={false} className={css(level, styles.title)}>
        <Link className={styles.link} href={url}>
          {name}
        </Link>
        <div className={css(level, styles.star)}>
          <Star />
          {formatStars(stars)}
        </div>
      </Section>
      <Section center={false} className={styles.description}>
        {description.replace(/<[^>]*>?/gm, '')}
      </Section>
      <div className={css(styles.languages)}>
        <div className={css(styles.bullets)}>
          {bullets.slice(0, 3)}
          {bullets.length > 3 && (
            <span className={css({ color: '#6b6b6b' }, styles.language)}>
              + {bullets.length - 3} more
            </span>
          )}
        </div>
        <div className={css(styles.bar)}>{bars}</div>
      </div>
    </Section>
  )
}
