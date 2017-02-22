// @flow

import Title from '../../../src/shared/components/Title'
import snapshot from '../../helpers/snapshot'

const title = 'Hello'

describe('<Title />', () => {
  it('renders', snapshot.bind(null, Title, { title }))
})
