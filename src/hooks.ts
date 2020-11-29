import { MutableRefObject, useEffect, useState } from 'react'

function throttle(fn: (...args: unknown[]) => void, wait: number) {
  let previouslyRun: number | null = null
  let queuedToRun: NodeJS.Timeout | null = null

  return function invoke(...args: unknown[]) {
    const now = performance.now()

    if (queuedToRun) {
      clearTimeout(queuedToRun)
    }

    if (!previouslyRun || now - previouslyRun >= wait) {
      fn(...args)
      previouslyRun = now
    } else {
      queuedToRun = setTimeout(
        invoke.bind(null, ...args),
        wait - (now - previouslyRun)
      )
    }
  }
}

// Based off this implementation, but in TS and customized a little.
// https://github.com/Purii/react-use-scrollspy
export function useScrollSpy<T>({
  offsetPx,
  sections,
}: {
  offsetPx: number
  sections: Array<[T, MutableRefObject<HTMLDivElement | null>]>
}) {
  const [activeSection, setActiveSection] = useState<T>(() => {
    const [[defaultSectionItem]] = sections

    return defaultSectionItem
  })

  const handle = throttle(() => {
    setActiveSection((state) => {
      const [[section = state] = []] = sections
        .filter(([, ref]) => {
          const isAtBottom =
            window.innerHeight + window.pageYOffset >=
            document.body.scrollHeight - 125

          return (
            isAtBottom ||
            (ref.current?.getBoundingClientRect().top ?? -Infinity) + offsetPx <
              0
          )
        })
        .reverse()

      return section
    })
  }, 100)

  useEffect(() => {
    window.addEventListener('scroll', handle)

    return () => {
      window.removeEventListener('scroll', handle)
    }
  }, [sections, offsetPx, handle])
  return activeSection
}
