import { useEffect, useRef, useState } from 'react'
import { useFela } from 'react-fela'

type PixelProps = { location: string }

const styles = (visible: boolean) => ({ display: visible ? 'none' : 'inline' })

export function Pixel({ location }: PixelProps) {
  const { css } = useFela()
  const [visible, setVisible] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imageRef.current) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.intersectionRatio > 0) {
          setVisible(true)
        }
      })

      observer.observe(imageRef.current)

      return () => observer.unobserve(imageRef.current!)
    }
  }, [imageRef.current])

  return (
    <img
      alt={location}
      className={css(styles(visible))}
      ref={imageRef}
      src={visible ? `/pixel/${location}.png` : ''}
    />
  )
}
