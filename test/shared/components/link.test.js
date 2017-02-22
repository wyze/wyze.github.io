// @flow

import Link from '../../../src/shared/components/Link'
import snapshot from '../../helpers/snapshot'

const link = {
  children: 'GitHub',
  to: '//github.com/wyze',
}

const linkWithStyles = {
  ...link,
  styles: {
    color: 'rebeccapurple',
  },
}

describe('<Link />', () => {
  it('renders', snapshot.bind(null, Link, link))
  it('renders style', snapshot.bind(null, Link, linkWithStyles))
})
