import {
  GitHub,
  LinkedIn,
  StackOverflow,
  Starship,
  Tessel,
  Twitter,
  Yarn,
} from '../svgs'
import { Link } from './Link'
import { Section } from './Section'
import { css } from 'otion'

export enum IconType {
  GitHub = 'github',
  LinkedIn = 'linked-in',
  StackOverflow = 'stack-overflow',
  Starship = 'starship',
  Tessel = 'tessel',
  Twitter = 'twitter',
  Yarn = 'yarn',
}

type IconProps = {
  className?: string
  href: string
  icon: IconType
}

const styles = css({
  display: 'inline-block',
  height: '3.7em',
  minWidth: '3.7em',
})

export function Icon({ className = '', href, icon }: IconProps) {
  return (
    <Section className={className}>
      <Link className={styles} href={href}>
        {icon === IconType.GitHub && <GitHub />}
        {icon === IconType.LinkedIn && <LinkedIn />}
        {icon === IconType.Starship && <Starship />}
        {icon === IconType.StackOverflow && <StackOverflow />}
        {icon === IconType.Tessel && <Tessel />}
        {icon === IconType.Twitter && <Twitter />}
        {icon === IconType.Yarn && <Yarn />}
      </Link>
    </Section>
  )
}
