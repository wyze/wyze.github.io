// Preact
export type VNode = React$Element<mixed>

// Glamor
export type Style = {
  [ key: string ]: mixed,
}

// Server
type Server = {
  address: () => {
    host: string,
  },
}

export type KoaApp = {
  listen: (port: number | string) => Server,
  use: () => void,
}

export type Context = {
  body: string,
}

export type GlamorStatic = {
  css: string,
  html: string,
}

export type Thunk = () => mixed

// Shared
export type GitHubResult = {
  description?: string,
  name: string,
  stars: number | string,
  url: string,
}

export type Job = {
  end?: string,
  name: string,
  start: string,
}

export type Profile = {
  component: VNode,
  to: string,
}

export type Team = {
  component: VNode,
  to: string,
}

export type GitHubResults = Array<GitHubResult>

export type GitHubResponse = Promise<GitHubResults>

export type Jobs = Array<Job>

export type Profiles = Array<Profile>

export type Teams = Array<Team>

export type Middleware = ( ctx: Context, next: () => void ) => Promise<void>
