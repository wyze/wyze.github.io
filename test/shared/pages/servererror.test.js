// @flow

import ServerError from '../../../src/shared/pages/ServerError'
import snapshot from '../../helpers/snapshot'

describe('<ServerError />', () => {
  it('renders', snapshot.bind(null, ServerError))
})
