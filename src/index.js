import path from 'path'
import jsonfile from 'jsonfile'

import collection from './collection'

const proxyc = {
  __db: path.join(__dirname, '..', 'db.json'),
  __hosts: [],
  extend(task) {
    collection.extend(task)
    return this
  },
  run() {
    return collection
      .run()
      .then(hosts => {
        this.__hosts = hosts.slice(0)
        this.__write(hosts)
        return Promise.resolve(hosts)
      })
  },
  get() {
    return this.__hosts.length ? this.__hosts : this.__read()
  },
  map(fn) {
    this
      .run()
      .then(hosts => {
        hosts.map(fn)
        return Promise.resolve(hosts)
      })
  },
  __read() {
    return read(this.__db)
  },
  __write(obj) {
    return write(this.__db, obj)
  }
}

function read(p) {
  return jsonfile.readFileSync(p)
}

function write(p, data) {
  return jsonfile.writeFileSync(p, data)
}

export default proxyc
