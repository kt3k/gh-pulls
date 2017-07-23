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
    process.exit(1)
  }

  return getPullRequestCount(user).then(count => {
    console.log(`${user}: ${count}`)
  })
}

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

minimisted(main)
