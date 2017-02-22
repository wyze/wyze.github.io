// @flow

import Box from '../../../src/shared/components/Box'
import preact from 'preact'
import snapshot from '../../helpers/snapshot'

const childStyle = {
  color: 'rebeccapurple',
}

const children = (
  // eslint-disable-next-line react/jsx-filename-extension
  <div>I am a child.</div>
)

const title = 'I am a title.'

describe('<Box />', () => {
  it('renders', snapshot.bind(null, Box))
  it('renders children', snapshot.bind(null, Box, { children }))
  it('renders title', snapshot.bind(null, Box, { title }))
  it('renders flex wrap', snapshot.bind(null, Box, { wrap: true }))
  it('renders passed styles', snapshot.bind(null, Box, { childStyle }))
})
