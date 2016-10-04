## proxy-collection

An experience spider to collect proxy ip

## Getting Started

```js
import proxyc from 'proxy-collection'

proxyc
  .extend(require('./extend/xicidaili'))
  .run()
  .then(hosts => {
    // hosts => ['http://100.10.10.10:80', ...]
    // do something
  })

```

```js
import proxyc from 'proxy-collection'

proxyc
  .extend(require('./extend/xicidaili'))
  .map(host => {
    // host => 'http://100.10.10.10:80'
    // do something
  })
```
