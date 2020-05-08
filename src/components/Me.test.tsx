import { Me } from './Me'
import { render } from '../test-utils'

describe('<Me />', () => {
  it('should render', () => {
    const { getByAltText } = render(<Me />)

    expect(getByAltText('Neil Kistner')).toBeInTheDocument()
  })
})
