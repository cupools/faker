'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var host = exports.host = 'http://www.xicidaili.com/nn/%d';
var process = exports.process = function process(error, $) {
  if (error) {
    console.error(error);
    return [];
  }

  var ret = [];
  var host = '';
  var port = '';

  $('#ip_list td').map(function (index, item) {
    var text = $(item).text();

    if (/^(\d+?\.?){4}$/.exec(text)) {
      host = text.trim();
    } else if (/^\d{1,4}$/.exec(text)) {
      port = text.trim();
      ret.push('http://' + host + ':' + port);
    }
  });

  return ret;
};