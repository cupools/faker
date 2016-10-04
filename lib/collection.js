'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  __task: [],
  run: function run() {
    return _promise2.default.all(this.__task.map(function (task) {
      return _run(task.host, task.process);
    })).then(function (ret) {
      return ret.reduce(function (tmp, item) {
        return tmp.concat(item);
      }, []);
    }).then();
  },
  extend: function extend(task) {
    if (task.host && task.process) {
      this.__task = this.__task.concat(task);
    } else {
      console.warn('invalid task %s', task.host);
    }
  }
};


function _run(host, process) {
  if (host.includes('%d')) {
    return _promise2.default.all([_run(host.replace('%d', 1), process), _run(host.replace('%d', 2), process), _run(host.replace('%d', 3), process)]).then(function (ret) {
      return ret.reduce(function (tmp, item) {
        return tmp.concat(item);
      }, []);
    });
  }

  return new _promise2.default(function (resolve) {
    (0, _request2.default)({
      url: host,
      strictSSL: false,
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; MicroMessenger CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53'
      }
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        resolve(process(null, _cheerio2.default.load(body)));
      } else {
        resolve(process(error));
      }
    });
  });
}