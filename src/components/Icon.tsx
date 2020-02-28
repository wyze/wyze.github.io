import { CssFelaStyle } from 'react-fela'
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
  className?: CssFelaStyle<{}, {}>
  href: string
  icon: IconType
  title?: string
}

const styles = {
  display: 'inline-block',
  height: 3.7,
  minWidth: 3.7,
}

export function Icon({ className = {}, icon, ...rest }: IconProps) {
  return (
    <Section className={className}>
      <Link className={styles} title={icon} {...rest}>
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
