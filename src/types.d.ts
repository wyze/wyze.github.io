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
