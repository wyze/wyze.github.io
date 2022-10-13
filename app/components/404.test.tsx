import { describe, expect, it } from 'vitest'

import { render, screen } from '~/test/test-utils'

import { FourOhFourPage } from './404'

describe('<FourOhFourPage />', () => {
  it('should render', () => {
    render(<FourOhFourPage />)

    expect(screen.getByText('Whoops!')).toBeInTheDocument()
    expect(
      screen.getByText("We couldn't find the page you were looking for.")
    ).toBeInTheDocument()
  })
})
