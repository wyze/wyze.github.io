// @flow

import Introduction from '../../../src/shared/containers/Introduction'
import snapshot from '../../helpers/snapshot'

describe('<Introduction />', () => {
  it('renders', snapshot.bind(null, Introduction))
})
