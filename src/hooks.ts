import { useEffect, useRef, useState } from 'react'

export function useIntersectionObserver(rootMargin?: string) {
  const [visible, setVisible] = useState(false)
  const element = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (element.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true)
          }
        },
        { rootMargin }
      )

      observer.observe(element.current!)

      return () => observer.unobserve(element.current!)
    }
  }, [element.current])

  return [element, visible] as const
}
