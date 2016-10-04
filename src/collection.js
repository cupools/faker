import path from 'path'
import request from 'request'
import cheerio from 'cheerio'

export default {
  __task: [],
  run() {
    return Promise
      .all(this.__task.map(task => run(task.host, task.process)))
      .then(ret => Promise.resolve(
        ret.reduce((tmp, item) => tmp.concat(item), []))
      )
      // .then(ret => validation(ret))
      // .then(ret => ret.filter(item => !!item))
  },
  extend(task) {
    if (task.host && task.process) {
      this.__task = this.__task.concat(task)
    } else {
      console.warn('invalid task %s', task.host)
    }
  }
}

function run(host, process) {
  if (host.includes('%d')) {
    return Promise
      .all([
        run(host.replace('%d', 1), process),
        run(host.replace('%d', 2), process),
        run(host.replace('%d', 3), process)
      ])
      .then(ret => Promise.resolve(
        ret.reduce((tmp, item) => tmp.concat(item), [])
      ))
  }

  return new Promise(resolve => {
    request(
      {
        url: host,
        strictSSL: false,
        timeout: 5e3,
        headers: {
          'User-Agent': 'Mozilla/5.0 (iPhone; MicroMessenger CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53'
        }
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          resolve(process(null, cheerio.load(body)))
        } else {
          resolve(process(error))
        }
      }
    )
  })
}

function validation(hosts) {
  return Promise.all(
    hosts.map(url => {
      return new Promise(resolve => {
        request(
          {
            url,
            method: 'HEAD',
            timeout: 5e3
          },
          error => error ? resolve(null) : resolve(url)
        )
      })
    })
  )
}
