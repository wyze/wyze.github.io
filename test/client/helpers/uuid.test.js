// @flow

import uuid from '../../../src/client/helpers/uuid'

const regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

describe('uuid', () => {
  it('generates uuid v4', () => {
    expect(uuid()).toMatch(regex)
  })

  it('generates uuid with seed', () => {
    expect(uuid(9876543210 * 9876543210)).toMatch(/^[0-9a-f]{8}$/)
  })
})
