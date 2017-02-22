// @flow

import H1 from '../../../src/shared/components/H1'
import preact from 'preact'
import snapshot from '../../helpers/snapshot'

const children = (
  // eslint-disable-next-line react/jsx-filename-extension
  <span>Hello</span>
)

const styles = {
  color: 'rebeccapurple',
}

describe('<H1 />', () => {
  it('renders', snapshot.bind(null, H1, { children }))
  it('renders styles', snapshot.bind(null, H1, { children, styles }))
})
