import { Me } from './Me'
import { render, screen } from '../../test-utils'

describe('<Me />', () => {
  it('should render', () => {
    render(<Me />)

    expect(screen.getByAltText('Neil Kistner')).toBeInTheDocument()
  })
})
