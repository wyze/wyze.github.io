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
    edges: [
      {
        node: {
          color: string
          name: string
        }
        size: number
      }
    ]
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
    contributions1: { nodes: { repository: Repository }[] }
    contributions2: { nodes: { repository: Repository }[] }
    contributions3: { nodes: { repository: Repository }[] }
    projects: { nodes: Repository[] }
  }
}
