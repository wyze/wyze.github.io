// @flow

import NotFound from '../../../src/shared/pages/NotFound'
import snapshot from '../../helpers/snapshot'

describe('<NotFound />', () => {
  it('renders', snapshot.bind(null, NotFound))
})
