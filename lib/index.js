'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collection = require('./collection');

var _collection2 = _interopRequireDefault(_collection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_collection2.default.extend(require('./extend/xicidaili'));
_collection2.default.run().then(function (item) {
  console.log(item);
}).catch(function (item) {
  console.log(item);
});

exports.default = {
  extend: function extend() {},
  run: function run() {},
  get: function get() {},
  map: function map() {}
};