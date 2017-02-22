// @flow

import Section from '../../../src/shared/components/Section'
import preact from 'preact'
import snapshot from '../../helpers/snapshot'

const children = (
  // eslint-disable-next-line react/jsx-filename-extension
  <div>I am a child.</div>
)

const styles = {
  color: 'rebeccapurple',
}

describe('<Section />', () => {
  it('renders', snapshot.bind(null, Section, { children }))
  it('renders non-centered', snapshot.bind(null, Section, { center: false }))
  it('renders passed styles', snapshot.bind(null, Section, { styles }))
})
