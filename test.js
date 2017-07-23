const { describe, it, timeout } = require('kocha')
const { expect } = require('chai')
const { exec } = require('child_process')

const API_ROOT = 'http://localhost:28987'
const PATH = process.env.PATH
const env = { API_ROOT, PATH }

describe('gh-pulls', () => {
  timeout(10000)

  it('fetches pull request count', done => {
    exec('node index.js mojombo', { env }, (err, stdout) => {
      expect(err).to.equal(null)
      expect(stdout.toString().trim()).to.equal('mojombo: 43')
      done()
    })
  })

  it('shows help message when called with -h', done => {
    exec('node index.js -h', { env }, (err, stdout) => {
      expect(err).to.equal(null)
      expect(stdout.toString().trim()).to.match(/Usage: gh-pulls <user> \[options\]/)
      done()
    })
  })

  it('throws error when the parameter is not given', done => {
    exec('node index.js', { env }, (err) => {
      expect(err).to.not.equal(null)
      done()
    })
  })
})
