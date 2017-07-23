#!/usr/bin/env node

const Octokat = require('octokat')
const minimisted = require('minimisted')
const chalk = require('chalk')

/**
 * @param {Object} argv minimist-parsed cli opts
 */
const main = argv => {
  if (argv.help) {
    console.log(usage)
    process.exit(0)
  }

  const user = argv._[0]

  if (!user) {
    console.log(chalk.red('Error:'), 'user name is not specified')
    process.exit(1)
  }

  return wait(+argv.wait || 0)
    .then(() => getPullRequestCount(user))
    .then(count => {
      console.log(`${user}: ${count}`)
    })
}

/**
 * Waits n ms and resolves.
 * @param {number} n The ms to wait
 */
const wait = n => new Promise(resolve => setTimeout(resolve, n))

/**
 * gets the pull reqeust count of the given user.
 * @param {string} user The user name
 * @return {Promise}
 */
const getPullRequestCount = user => initClient(process.env.API_ROOT)
  .search('issues')
  .fetch({ q: `is:pr author:${user}` })
  .then(result => result.totalCount)

const initClient = rootURL => {
  return new Octokat({ rootURL })
}

const usage = `
Usage: gh-pulls <user> [options]

Options:
  -h, --help         Shows help message.
  -w, --wait         Milliseconds to wait before invoking GitHub Search API.
`.trim()

minimisted(main, {
  string: ['w', 'wait'],
  boolean: ['h', 'help'],
  alias: {
    w: 'wait',
    h: 'help'
  }
})
