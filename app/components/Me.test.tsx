import { Me } from './Me'
import { describe, expect, it } from 'vitest'
import { render, screen } from '~/test/test-utils'

describe('<Me />', () => {
  it('should render', () => {
    render(<Me />)

    expect(screen.getByAltText('Neil Kistner')).toBeInTheDocument()
  })
})
