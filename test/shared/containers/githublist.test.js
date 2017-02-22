// @flow

import GitHubList from '../../../src/shared/containers/GitHubList'
import snapshot from '../../helpers/snapshot'

const ghItemWithoutDescription = {
  name: 'wyze.github.io',
  stars: 1,
  url: 'https://github.com/wyze/wyze.github.io',
}

const ghItem = {
  ...ghItemWithoutDescription,
  description: 'My personal website.',
}

const content = [
  ghItemWithoutDescription,
  ghItem,
]

const title = 'Open Source Projects'

describe('<GitHubList />', () => {
  it('renders', snapshot.bind(null, GitHubList, { content }))
  it('renders title', snapshot.bind(null, GitHubList, { content, title }))
})
