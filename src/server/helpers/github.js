// @flow

import type { GitHubResponse, GitHubResult } from '../../types'
import gh from 'gh-got'
import qs from 'querystring'

type Query = {
  [key: string]: string,
}

type Map = ( result: GitHubResult ) => GitHubResult

const isObject = ( item: { [key: mixed]: mixed } ): boolean =>
  !!item && item.constructor === Object

const mapToResult = ({
  description,
  html_url: url,
  name,
  stargazers_count: stars,
}: GitHubResult): GitHubResult => ({
  description,
  name,
  stars,
  url,
})

export const sortByStars =
  ( left: GitHubResult, right: GitHubResult ): number =>
    right.stars - left.stars

const github = async (
  api: string,
  query: Query,
  map: Map = mapToResult,
): GitHubResponse => {
  const q = [
    qs.stringify(query, '+', ':'),
    qs.stringify({ per_page: 100 }),
  ].join('&')

  const { body } = await gh(`${api}?q=${q}`)

  if ( body && body.items && body.items.length ) {
    return body.items
      .map(map)
      .sort(sortByStars)
  }

  if ( isObject(body) ) {
    return [ body ].map(map).pop()
  }

  return []
}

export default github
