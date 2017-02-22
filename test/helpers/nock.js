// @flow

import nock from 'nock'

const api = 'https://api.github.com'
const url = 'https://github.com'

nock(api)
  .get('/search/issues')
  .query(true)
  .reply(200, {
    items: [
      { repository_url: `${api}/wyze/a` },
    ],
  })

nock(api)
  .get('/search/repositories')
  .query(true)
  .reply(200, {
    items: [
      {
        description: 'a',
        html_url: `${url}/wyze/a`,
        name: 'a',
        stargazers_count: 1,
      },
      {
        description: `
I have a really long description, and I will be wrapped and ellipsis will be
 added to my text. This only happens when I am over 100 characters though.
`,
        html_url: `${url}/wyze/b`,
        name: 'b',
        stargazers_count: 3,
      },
    ],
  })

nock(api)
  .get(/wyze/)
  .query(true)
  .reply(200, {
    description: 'a',
    full_name: 'wyze/a',
    html_url: `${url}/wyze/a`,
    stargazers_count: 1,
  })

nock(api)
  .get('/bad')
  .query(true)
  .reply(200)
