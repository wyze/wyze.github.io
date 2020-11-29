import { RenderOptions, render } from '@testing-library/react'
import { RendererProvider } from 'react-fela'
import { renderer } from './fela'

const Providers: React.FC = ({ children }) => {
  return <RendererProvider renderer={renderer}>{children}</RendererProvider>
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: Providers, ...options })

// const observerMap = new Map()
// const instanceMap = new Map()

// const intersectionObserver = jest.fn((cb, options) => {
//   const { threshold = 0.0 } = options ?? {}
//   const instance = {
//     thresholds: Array.isArray(threshold) ? threshold : [threshold],
//     root: options?.root ?? null,
//     rootMargin: options?.rootMargin ?? '0px 0px 0px 0px',
//     takeRecords: jest.fn(),
//     time: Date.now(),
//     observe: jest.fn((element: Element) => {
//       instanceMap.set(element, instance)
//       observerMap.set(element, cb)
//     }),
//     unobserve: jest.fn((element: Element) => {
//       instanceMap.delete(element)
//       observerMap.delete(element)
//     }),
//     disconnect: jest.fn(),
//   }

//   return instance
// })

// beforeAll(() => {
//   window.IntersectionObserver = intersectionObserver
// })

// afterEach(() => {
//   intersectionObserver.mockClear()
//   instanceMap.clear()
//   observerMap.clear()
// })

// export function mockIsIntersecting(element: Element, isIntersecting: boolean) {
//   const cb = observerMap.get(element)
//   const instance = instanceMap.get(element)
//   if (cb && instance) {
//     const entry = [
//       {
//         boundingClientRect: element.getBoundingClientRect(),
//         intersectionRatio: isIntersecting ? 1 : 0,
//         intersectionRect: isIntersecting ? element.getBoundingClientRect() : {},
//         isIntersecting,
//         rootBounds: instance.root ? instance.root.getBoundingClientRect() : {},
//         target: element,
//         time: Date.now() - instance.time,
//       },
//     ]
//     if (act) act(() => cb(entry, instance))
//     else cb(entry, instance)
//   } else {
//     throw new Error(
//       'No IntersectionObserver instance found for element. Is it still mounted in the DOM?'
//     )
//   }
// }

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
