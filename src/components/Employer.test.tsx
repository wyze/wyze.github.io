import { Employer } from './Employer'
import { render } from '../test-utils'

describe('<Employer />', () => {
  it('should render', () => {
    const { getByText } = render(
      <Employer start="2020-01-01">A Company</Employer>
    )

    expect(getByText('A Company')).toBeInTheDocument()
    expect(getByText('(2020-01-01 — Present)')).toBeInTheDocument()
  })

  it('should work with end property', () => {
    const { getByText } = render(
      <Employer end="2020-02-02" start="2020-01-01" />
    )

    expect(getByText('(2020-01-01 — 2020-02-02)')).toBeInTheDocument()
  })
})
