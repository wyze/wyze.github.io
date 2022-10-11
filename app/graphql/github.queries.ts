import gql from 'graphql-tag'

export const getData = gql`
  query getData {
    viewer {
      contributions1: pullRequests(first: 100, states: [MERGED]) {
        nodes {
          repository {
            ...RepoFields
          }
        }
      }
      contributions2: pullRequests(
        after: "Y3Vyc29yOnYyOpHOBZoUUA=="
        first: 100
        states: [MERGED]
      ) {
        nodes {
          repository {
            ...RepoFields
          }
        }
      }
      contributions3: pullRequests(
        after: "Y3Vyc29yOnYyOpHODSNyWw=="
        first: 100
        states: [MERGED]
      ) {
        nodes {
          repository {
            ...RepoFields
          }
        }
      }
      projects: repositories(
        orderBy: { direction: DESC, field: STARGAZERS }
        ownerAffiliations: [OWNER]
        first: 100
        isFork: false
        privacy: PUBLIC
      ) {
        nodes {
          ...RepoFields
        }
      }
    }
  }

  fragment RepoFields on Repository {
    isArchived
    isPrivate
    name
    nameWithOwner
    owner {
      login
    }
    languages(first: 20) {
      edges {
        node {
          color
          name
        }
        size
      }
      totalSize
    }
    shortDescriptionHTML(limit: 100)
    stargazers {
      totalCount
    }
    url
  }
`
