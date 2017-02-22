// @flow

import Strong from '../../../src/shared/components/Strong'
import snapshot from '../../helpers/snapshot'

const text = 'Hello'

describe('<Strong />', () => {
  it('renders', snapshot.bind(null, Strong, { text }))
})
