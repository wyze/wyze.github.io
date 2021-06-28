type Language = {
  colorHex: string
  name: string
  percent: number
}

export type GitHubInfo = {
  description: string
  languages: Language[]
  name: string
  stars: number
  url: string
}

export type Repository = {
  isArchived: boolean
  isPrivate: boolean
  name: string
  nameWithOwner: string
  owner: {
    login: string
  }
  languages: {
    edges: Array<{
      node: {
        color: string
        name: string
      }
      size: number
    }>
    totalSize: number
  }
  shortDescriptionHTML: string
  stargazers: {
    totalCount: number
  }
  url: string
}

export type ViewerResponse = {
  viewer: {
    contributions1: { nodes: Array<{ repository: Repository }> }
    contributions2: { nodes: Array<{ repository: Repository }> }
    contributions3: { nodes: Array<{ repository: Repository }> }
    projects: { nodes: Repository[] }
  }
}
