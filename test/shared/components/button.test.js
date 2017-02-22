// @flow

import Button from '../../../src/shared/components/Button'
import snapshot from '../../helpers/snapshot'

describe('<Button />', () => {
  it('renders', snapshot.bind(null, Button))
  it('renders with text', snapshot.bind(null, Button, { text: 'Try again' }))
})
