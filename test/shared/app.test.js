// @flow

import App from '../../src/shared/App'
import snapshot from '../helpers/snapshot'

describe('<App />', () => {
  it('renders', snapshot.bind(null, App))
})
