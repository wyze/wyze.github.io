import type { AppLoadContext } from '@remix-run/cloudflare'
import { GraphQLClient } from 'graphql-request'

import * as github from '~/graphql/github.generated'

declare module '@remix-run/server-runtime' {
  interface AppLoadContext {
    GITHUB_ENDPOINT: string
    GITHUB_TOKEN: string
  }
}

const ITEM_COUNT = 24

function getSdk(context: AppLoadContext) {
  return github.getSdk(
    new GraphQLClient(context.GITHUB_ENDPOINT, {
      fetch,
      headers: {
        authorization: `bearer ${context.GITHUB_TOKEN}`,
        'user-agent': 'wyze',
      },
    })
  )
}

export async function getData(context: AppLoadContext) {
  const sdk = getSdk(context)
  const { viewer } = await sdk.getData()

  const transformLanguages = ({
    edges,
    totalSize,
  }: NonNullable<
    NonNullable<
      NonNullable<typeof viewer['projects']['nodes']>[number]
    >['languages']
  >) =>
    edges
      ?.filter((item): item is NonNullable<typeof item> => Boolean(item?.node))
      .map(({ node: { color, name }, size }) => ({
        colorHex: color ?? '#ccc',
        name,
        percent: (size / totalSize) * 100,
      }))
      .sort((left, right) => right.percent - left.percent)
      .filter((project) => project.percent >= 0.1) ?? []

  const projects =
    viewer.projects.nodes
      ?.filter((project): project is NonNullable<typeof project> =>
        Boolean(project)
      )
      .filter((project) => !project.isArchived)
      .map(
        ({
          languages,
          name,
          nameWithOwner,
          shortDescriptionHTML,
          stargazers: { totalCount },
          url,
        }) => ({
          description: shortDescriptionHTML,
          languages: languages ? transformLanguages(languages) : [],
          name: nameWithOwner.startsWith('wyze/') ? name : nameWithOwner,
          stars: totalCount,
          url,
        })
      )
      .slice(0, ITEM_COUNT) ?? []

  const contributions = [
    ...(viewer.contributions1.nodes ?? []),
    ...(viewer.contributions2.nodes ?? []),
    ...(viewer.contributions3.nodes ?? []),
  ]
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .reduce<
      Array<
        NonNullable<
          NonNullable<typeof viewer['contributions1']['nodes']>[number]
        >['repository']
      >
    >(
      (acc, { repository }) =>
        acc.find((item) => item.nameWithOwner === repository.nameWithOwner) ||
        repository.owner.login === 'wyze' ||
        repository.isArchived ||
        repository.isPrivate
          ? acc
          : [...acc, repository],
      []
    )
    .map(
      ({
        languages,
        nameWithOwner,
        shortDescriptionHTML,
        stargazers: { totalCount },
        url,
      }) => ({
        description: shortDescriptionHTML,
        languages: languages ? transformLanguages(languages) : [],
        name: nameWithOwner,
        stars: totalCount,
        url,
      })
    )
    .sort((left, right) => right.stars - left.stars)
    .slice(0, ITEM_COUNT)

  return { contributions, projects }
}
