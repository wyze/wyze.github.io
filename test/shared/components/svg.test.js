// @flow

import SVG from '../../../src/shared/components/SVG'
import preact from 'preact'
import snapshot from '../../helpers/snapshot'

const svg = {
  // eslint-disable-next-line react/jsx-filename-extension
  children: <g />,
  height: 100,
  width: 100,
}

describe('<SVG />', () => {
  it('renders', snapshot.bind(null, SVG, svg))
})
