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

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
