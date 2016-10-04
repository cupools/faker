'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var host = exports.host = 'http://www.kuaidaili.com/free/inha/%d/';
var process = exports.process = function process(error, $) {
  if (error) {
    console.error(error);
    return [];
  }

  var ret = [];
  var host = '';
  var port = '';

  $('#list td').map(function (index, item) {
    var text = $(item).text();

    if (/^(\d+?\.){3}\d+?$/.exec(text)) {
      host = text.trim();
    } else if (/^\d{1,4}$/.exec(text)) {
      port = text.trim();
      ret.push('http://' + host + ':' + port);
    }
  });

  return ret;
};