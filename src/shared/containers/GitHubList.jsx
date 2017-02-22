// @flow

import type { GitHubResult, GitHubResults, Style, VNode } from '../../types'
import { css } from 'glamor'
import Box from '../components/Box'
import GitHubItem from '../components/GitHubItem'
import preact from 'preact'

type Props = {
  content: GitHubResults,
  title: string,
}

const childStyle: Style = css({
  justifyContent: 'flex-start',
})

const GitHubList = ({ content, title }: Props): VNode => (
  <Box wrap childStyle={childStyle} title={title}>
    {content.map(( item: GitHubResult ): VNode => (
      <GitHubItem key={item.name} {...item} />
    ))}
  </Box>
)

export default GitHubList
