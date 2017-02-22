// @flow

import GitHubItem from '../../../src/shared/components/GitHubItem'
import snapshot from '../../helpers/snapshot'

const ghItemNoDesc = {
  name: 'wyze.github.io',
  stars: 1,
  url: 'https://github.com/wyze/wyze.github.io',
}

const ghItem = {
  ...ghItemNoDesc,
  description: 'My personal website.',
}

describe('<GitHubItem />', () => {
  it('renders', snapshot.bind(null, GitHubItem, ghItem))
  it('renders no description', snapshot.bind(null, GitHubItem, ghItemNoDesc))
})
