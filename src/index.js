import collection from './collection'

collection.extend(require('./extend/xicidaili'))
collection
  .run()
  .then(item => {
    console.log(item)
  })
  .catch(item => {
    console.log(item)
  })

export default {
  extend() {},
  run() {},
  get() {},
  map() {}
}
