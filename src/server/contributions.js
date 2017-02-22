// @flow

import type { GitHubResponse, GitHubResult } from '../types'
import github, { sortByStars } from './helpers/github'

const query = {
  author: 'wyze',
  is: 'merged',
  type: 'pr',
}

const mapToRepoUrl = ({ repository_url: url }: GitHubResult): string => url

const mapToResult = ({
  description,
  full_name: name,
  html_url: url,
  stargazers_count: stars,
}: GitHubResult): GitHubResult => ({
  description,
  name,
  stars,
  url,
})

const uniqueUrl = (
  url: string,
  idx: number,
  arr: Array<string>,
): boolean => arr.indexOf(url) === idx

const mapUrlToResult = async ( url: string ): GitHubResult =>
  // eslint-disable-next-line no-return-await
  await github(url, {}, mapToResult)

const contributions = async (): GitHubResponse => {
  const results = await github('search/issues', query, mapToRepoUrl)
  const urls: Array<string> = results.filter(uniqueUrl)

  return (await Promise.all(urls.map(mapUrlToResult))).sort(sortByStars)
}

export default contributions
