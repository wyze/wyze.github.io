# [neilkistner.com](https://neilkistner.com)

[![Website][website-image]][website-url]
[![Lighthouse][lighthouse-image]][lighthouse-url]
[![Build Status][actions-image]][actions-url]
[![Coveralls][coveralls-image]][coveralls-url]

> The personal website of Neil Kistner.

## Setup

```sh
$ git clone https://github.com/wyze/wyze.github.io.git
$ cd wyze.github.io
$ yarn # or `npm install`
```

## Development

```sh
$ yarn dev
```

## Test

```sh
$ yarn test
```

## Build

```sh
$ yarn build
```

## Production

```sh
$ docker build --build-arg GITHUB_TOKEN="<token>" .
```

## License

MIT © [Neil Kistner](https://neilkistner.com)

[website-image]: https://img.shields.io/website-up-down-green-red/https/neilkistner.com.svg?style=flat-square
[website-url]: https://neilkistner.com

[lighthouse-image]: https://img.shields.io/badge/lighthouse-100-brightgreen.svg?style=flat-square
[lighthouse-url]: https://googlechrome.github.io/lighthouse/viewer/?gist=0e786826596fa80011036e427ff0059b

[actions-image]: https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fwyze%2Fwyze.github.io%2Fbadge&style=flat-square
[actions-url]: https://actions-badge.atrox.dev/wyze/wyze.github.io/goto

[coveralls-image]: https://img.shields.io/coveralls/github/wyze/wyze.github.io.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/wyze/wyze.github.io
