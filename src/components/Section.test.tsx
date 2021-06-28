import { Section } from './Section'
import { render } from '../test-utils'

describe('<Section />', () => {
  it('should render with className as string', () => {
    const { getByText } = render(<Section className="cn">Content</Section>)

    const content = getByText('Content')

    expect(content).toBeInTheDocument()
    expect(content).toHaveStyle({ textAlign: 'center' })

    expect(content).toHaveClass('cn')
  })
})
