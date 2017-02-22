// @flow

import Employment from '../../../src/shared/containers/Employment'
import snapshot from '../../helpers/snapshot'

const jobs = [
  { name: 'Startup', start: 'Today' },
]

describe('<Employment />', () => {
  it('renders', snapshot.bind(null, Employment, { jobs }))
})
