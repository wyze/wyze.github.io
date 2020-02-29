import { useFela } from 'react-fela'
import {useIntersectionObserver} from '../hooks'

type PixelProps = { location: string }

const styles = (visible: boolean) => ({ display: visible ? 'none' : 'inline' })

export function Pixel({ location }: PixelProps) {
  const [imageRef, visible] = useIntersectionObserver<HTMLImageElement>()
  const { css } = useFela()

  return (
    <img
      alt={location}
      className={css(styles(visible))}
      ref={imageRef}
      src={visible ? `/pixel/${location}.png` : ''}
    />
  )
}
