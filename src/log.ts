enum EventAction {
  Click = 'CLICK',
}

const siteId = '657223fd-49db-420b-b788-11d43da73c97'

function isUnique(referrer: string) {
  return !referrer || referrer?.split('/')[2] !== window.location.host
}

function send(query: string, variables: object) {
  const body = JSON.stringify({ query, variables })
  const headers = new Headers([['content-type', 'application/json']])

  fetch('https://api.neilkistner.com/graphql', {
    body,
    // credentials: 'include',
    headers,
    method: 'post',
  })
}

export function click(value: string) {
  const query = `mutation AddEvent($action: EventAction!, $siteId: UUID!, $value: String) {
    createEvent(
      input: { event: { action: $action, siteId: $siteId, value: $value } }
    ) {
      clientMutationId
    }
  }`
  const variables = { action: EventAction.Click, siteId, value }

  send(query, variables)
}

export function view(
  page = window.location.pathname,
  incoming = window.document.referrer
) {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions()
  const { userAgent } = window.navigator
  const unique = isUnique(incoming)
  const referrer = incoming
    ?.replace(/^https?:\/\/((m|l|w{2,3}([0-9]+)?)\.)?([^?#]+)(.*)$/, '$4')
    .replace(/^([^/]+)\/$/, '$1')

  const query = `mutation AddView(
    $page: String!
    $referrer: String
    $siteId: UUID!
    $timeZone: String
    $unique: Boolean!
    $userAgent: String
    $width: Int
  ) {
    createView(
      input: {
        view: {
          page: $page
          referrer: $referrer
          siteId: $siteId
          timezone: $timeZone
          unique: $unique
          userAgent: $userAgent
          width: $width
        }
      }
    ) {
      clientMutationId
    }
  }`
  const variables = {
    page,
    referrer,
    siteId,
    timeZone,
    unique,
    userAgent,
    width: window.innerWidth,
  }

  send(query, variables)
}
