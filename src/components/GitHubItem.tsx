import { GitHubInfo } from '../types'
import { Link } from './Link'
import { Section } from './Section'
import { Star } from '../svgs'
import { css, cx, level, makeRGBA } from '../styles'

type GitHubItemProps = GitHubInfo

const { format: formatStars } = Intl.NumberFormat('en-US')
const shadowColor = makeRGBA(0.175)

const styles = {
  bar: css({
    display: 'flex',
    flexBasis: 12,
    flexGrow: 0,
    flexShrink: 0,
    width: '100.1%',
  }),
  bold: css({
    fontWeight: 600,
  }),
  bullets: css({
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: '0.75em',
    padding: '0 0.5em 0.25em',
  }),
  circle: css({
    borderRadius: '100%',
    height: 12,
    width: 12,
  }),
  container: css({
    backgroundColor: 'hsl(200, 33%, 96%)',
    borderRadius: 5,
    boxShadow: `0 2px 3px 0 ${shadowColor}, 0 0 0 1px ${shadowColor}`,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '9em',
    overflow: 'hidden',
  }),
  description: css({
    fontSize: '0.95em',
    overflow: 'hidden',
    padding: '0.25em 0.5em',
    textOverflow: 'ellipsis',
    wordBreak: 'break-word',
  }),
  languages: css({
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'auto',
    width: '100%',
  }),
  language: css({
    alignItems: 'center',
    display: 'grid',
    gridGap: 6,
    gridTemplateColumns: 'repeat(3, auto)',
    marginRight: '12px',
  }),
  link: css({
    fontSize: '1.05em',
    wordBreak: 'break-word',
  }),
  star: css({
    fontSize: '0.95em',
    fontStyle: 'italic',
    height: '1.05em',
    justifyContent: 'flex-end',
  }),
  title: css({
    padding: '0.5em 0.5em 0',
  }),
}

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
        const background = css({ backgroundColor: colorHex })
        const width = formatLanguage(percent / 100).replace('.0', '')

        const bullet = (
          <div key={name} className={styles.language}>
            <div
              className={cx(background, styles.circle)}
              data-testid="language-color"
            />
            <div className={styles.bold}>{name}</div>
            <div>{width}</div>
          </div>
        )

        const bar = (
          <span
            key={name}
            className={cx(background, css({ width }))}
            title={name}
          />
        )

        return [
          [...bullets, bullet],
          [...bars, bar],
        ]
      },
      [[], []] as [JSX.Element[], JSX.Element[]]
    )

  return (
    <Section center={false} className={styles.container}>
      <Section center={false} className={cx(css(level), styles.title)}>
        <Link className={styles.link} href={url}>
          {name}
        </Link>
        <div className={cx(css(level), styles.star)}>
          <Star />
          {formatStars(stars)}
        </div>
      </Section>
      <Section center={false} className={styles.description}>
        {description.replace(/<[^>]*>?/gm, '')}
      </Section>
      <div className={styles.languages}>
        <div className={styles.bullets}>
          {bullets.slice(0, 3)}
          {bullets.length > 3 && (
            <span className={cx(css({ color: '#6b6b6b' }), styles.language)}>
              + {bullets.length - 3} more
            </span>
          )}
        </div>
        <div className={styles.bar}>{bars}</div>
      </div>
    </Section>
  )
}
