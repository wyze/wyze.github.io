// @flow

import Employer from '../../../src/shared/components/Employer'
import snapshot from '../../helpers/snapshot'

const present = {
  name: 'ABC Company',
  start: 'May 2016',
}

const past = {
  ...present,
  end: 'December 2016',
}

describe('<Employer />', () => {
  it('renders', snapshot.bind(null, Employer, past))
  it('renders without end', snapshot.bind(null, Employer, present))
})
