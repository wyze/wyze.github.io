import { Section } from './Section'
import { render } from '../test-utils'

describe('<Section />', () => {
  it.each([
    ['object', { color: 'rebeccapurple' }],
    ['string', 'cn'],
  ])('should render with className as %s', (_, className) => {
    const { getByText } = render(
      <Section className={className}>Content</Section>
    )

    const content = getByText('Content')

    expect(content).toBeInTheDocument()
    expect(content).toHaveStyle({ textAlign: 'center' })

    if (typeof className === 'string') {
      expect(content).toHaveClass('cn')
    } else {
      expect(content).toHaveStyle({ color: 'rebeccapurple' })
    }
  })
})
