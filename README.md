## Faker

An experience spider to collect free proxy ip through extensible task.

## Getting Started

```bash
$ npm install --save cupools/faker
```

```js
import faker from 'faker'

faker
  .extend(require('faker/extend/xicidaili'))
  .run()
  .then(function (hosts) {
    // hosts => ['http://100.10.10.10:80', ...]
    // do something
  })

```

## Documentation

### faker.run()
Collect free proxy ip from extended task and save in json file, return a Promise that resolve all collected hosts.

Examples:

```js
faker
  .extend(require('faker/extend/xicidaili'))
  .run()
  .then(function (hosts) {
    // hosts => ['http://100.10.10.10:80', ...]
    // do something
  })
```

### faker.extend()
Extend a task for a specified website that provides free proxy ip, and `faker.run()` will process all the tasks.

Examples:

```js
faker
  .extend(require('faker/extend/xicidaili'))
  .extend(require('faker/extend/kuaidaili'))
  .run()
```

A task object contains `host` and `process`, and a simple task as follow:

```js
exports.host = 'http://provider.freeip/'

/**
 * function to process website and get information
 * @param   Error     error
 * @param   Object    $
 * @return  Array
 */
exports.process = function (error, $) {
  if (error) {
    console.error(error)
    return []
  }
  return $('.ip').map(
    function (index, el) {
      return $(el).text()
    }
  )
}
```

`$` is nearly identical to jQuery, provided by [cheeriojs](https://github.com/cheeriojs/cheerio), and the HTML of website has been loaded. The function `process` should return an array of hosts.

`host` can include `%d`, like `http://provider.freeip/page/%d/`, and it will be replaced as 1, 2 and 3.

More examples can be found in [repository](https://github.com/cupools/faker/tree/master/src/extend)

### faker.get()
Get an array of hosts found in the latest collection.

### faker.map()
Easily wrap `faker.run`.

Example:

```js
faker
  .extend(require('faker/extend/xicidaili'))
  .map(function (host) {
    // host => 'http://100.10.10.10:80'
    // do something
  })
```

## Issues
This is an simple repository and any question or ideas just task a look at the code directly or [open an issue](https://github.com/cupools/faker/issues). Fork your own repository is welcome as well.
