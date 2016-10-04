'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

var _collection = require('./collection');

var _collection2 = _interopRequireDefault(_collection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var proxyc = {
  __db: _path2.default.join(__dirname, '..', 'db.json'),
  __hosts: [],
  extend: function extend(task) {
    _collection2.default.extend(task);
    return this;
  },
  run: function run() {
    var _this = this;

    return _collection2.default.run().then(function (hosts) {
      _this.__hosts = hosts.slice(0);
      _this.__write(hosts);
      return _promise2.default.resolve(hosts);
    });
  },
  get: function get() {
    return this.__hosts.length ? this.__hosts : this.__read();
  },
  map: function map(fn) {
    this.run().then(function (hosts) {
      hosts.map(fn);
      return _promise2.default.resolve(hosts);
    });
  },
  __read: function __read() {
    return read(this.__db);
  },
  __write: function __write(obj) {
    return write(this.__db, obj);
  }
};

function read(p) {
  return _jsonfile2.default.readFileSync(p);
}

function write(p, data) {
  return _jsonfile2.default.writeFileSync(p, data);
}

exports.default = proxyc;