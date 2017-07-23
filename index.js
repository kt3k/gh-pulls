#!/usr/bin/env node

const Octokat = require('octokat')
const minimisted = require('minimisted')
const chalk = require('chalk')

/**
 * @param {Object} argv minimist-parsed cli opts
 */
const main = argv => {
  const user = argv._[0]

  if (!user) {
    console.log(chalk.red('Error:'), 'user name is not specified')
    process.exit()
  }

  return printPullRequestCount(user)
}

/**
 * Prints the pull reqeust count of the given user.
 * @param {string} user The user name
 * @return {Promise}
 */
const printPullRequestCount = user => {
  const octo = new Octokat()

  return octo.search('issues').fetch({ q: `is:pr author:${user}` }).then(result => {
    console.log(`${user}: ${result.totalCount}`)
  })
}

minimisted(main)
