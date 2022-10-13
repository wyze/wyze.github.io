import { describe, expect, it } from 'vitest'

import { render, screen } from '~/test/test-utils'

import { Employer } from './Employer'

describe('<Employer />', () => {
  it('should render', () => {
    render(<Employer start="2020-01-01">A Company</Employer>)

    expect(screen.getByText('A Company')).toBeInTheDocument()
    expect(screen.getByText('(2020-01-01 — Present)')).toBeInTheDocument()
  })

  it('should work with end property', () => {
    render(
      <Employer end="2020-02-02" start="2020-01-01">
        A Company
      </Employer>
    )

    expect(screen.getByText('(2020-01-01 — 2020-02-02)')).toBeInTheDocument()
  })
})
