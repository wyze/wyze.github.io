import { describe, expect, it } from 'vitest'

import { render, screen } from '~/test/test-utils'

import { Section } from './Section'

describe('<Section />', () => {
  it('should render with className as string', () => {
    render(<Section className="cn">Content</Section>)

    const content = screen.getByText('Content')

    expect(content).toBeInTheDocument()
    expect(content).toHaveClass('text-center')
    expect(content).toHaveClass('cn')
  })
})
