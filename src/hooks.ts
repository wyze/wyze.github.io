import { useEffect, useRef, useState } from 'react'

export function useIntersectionObserver<T extends HTMLElement>() {
  const [visible, setVisible] = useState(false)
  const element = useRef<T>(null)

  useEffect(() => {
    if (element.current) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      })

      observer.observe(element.current)

      return () => observer.unobserve(element.current!)
    }
  }, [element.current])

  return [element, visible] as const
}
