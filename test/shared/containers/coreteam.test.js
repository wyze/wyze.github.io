// @flow

import CoreTeam from '../../../src/shared/containers/CoreTeam'
import preact from 'preact'
import snapshot from '../../helpers/snapshot'

const teams = [
  // eslint-disable-next-line react/jsx-filename-extension
  { component: <svg />, name: 'My Team' },
]

describe('<CoreTeam />', () => {
  it('renders', snapshot.bind(null, CoreTeam, { teams }))
})
