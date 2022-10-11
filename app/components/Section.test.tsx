import { Section } from './Section'
import { render, screen } from '../../test-utils'

describe('<Section />', () => {
  it('should render with className as string', () => {
    render(<Section className="cn">Content</Section>)

    const content = screen.getByText('Content')

    expect(content).toBeInTheDocument()
    expect(content).toHaveStyle({ textAlign: 'center' })

    expect(content).toHaveClass('cn')
  })
})
