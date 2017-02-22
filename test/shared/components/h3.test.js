// @flow

import H3 from '../../../src/shared/components/H3'
import preact from 'preact'
import snapshot from '../../helpers/snapshot'

const children = (
  // eslint-disable-next-line react/jsx-filename-extension
  <span>Hello</span>
)

const styles = {
  color: 'rebeccapurple',
}

describe('<H3 />', () => {
  it('renders', snapshot.bind(null, H3, { children }))
  it('renders styles', snapshot.bind(null, H3, { children, styles }))
})
