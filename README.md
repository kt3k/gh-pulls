# gh-pulls v1.1.0


[![CircleCI](https://circleci.com/gh/kt3k/gh-pulls.svg?style=svg)](https://circleci.com/gh/kt3k/gh-pulls)
[![codecov](https://codecov.io/gh/kt3k/gh-pulls/branch/master/graph/badge.svg)](https://codecov.io/gh/kt3k/gh-pulls)

> CLI tool for showing numbers of pull requests by the user of the given user name.

# Usage

Install via npm:

```console
$ npm i -g gh-pulls
```

Hit the command `gh-pulls` with a name.

```console
$ gh-pulls mojombo
mojombo: 43
```

# Options

```
Usage: gh-pulls <user> [options]

Options:
  -h, --help         Shows help message.
  -w, --wait         Milliseconds to wait before invoking GitHub Search API.
```

# License

MIT
