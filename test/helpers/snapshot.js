// @flow

import type { VNode } from '../../src/types'
import { render } from 'preact-render-to-string'
import preact from 'preact'

type Props = {
  [ key: string ]: mixed,
}

const snapshot = (
  Component: VNode,
  props: Props = {},
) => {
  const options = { pretty: '  ', shallow: true }
  // eslint-disable-next-line react/jsx-filename-extension
  const tree = render(<Component {...props} />, null, options)

  expect(tree).toMatchSnapshot()
}

export default snapshot
