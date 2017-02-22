// @flow

import H2 from '../../../src/shared/components/H2'
import preact from 'preact'
import snapshot from '../../helpers/snapshot'

const children = (
  // eslint-disable-next-line react/jsx-filename-extension
  <span>Hello</span>
)

const styles = {
  color: 'rebeccapurple',
}

describe('<H2 />', () => {
  it('renders', snapshot.bind(null, H2, { children }))
  it('renders styles', snapshot.bind(null, H2, { children, styles }))
})
