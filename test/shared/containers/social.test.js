// @flow

import Social from '../../../src/shared/containers/Social'
import preact from 'preact'
import snapshot from '../../helpers/snapshot'

const profiles = [
  // eslint-disable-next-line react/jsx-filename-extension
  { component: <svg />, to: '//abc.xyz' },
]

describe('<Social />', () => {
  it('renders', snapshot.bind(null, Social, { profiles }))
})
