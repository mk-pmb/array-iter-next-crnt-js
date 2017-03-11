/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
/*test-args: --demo --args=fake --mode testing */
'use strict';

var iter = require('array-iter-next-crnt'), eq = require('equal-pmb');


function checkArg(dict, arg) {
  var opt = arg.match(/^(\-{2})([a-z0-9\-]+)(=|$)/i), list;
  if (opt) {
    arg = (opt[3] ? arg.slice(opt[0].length) : this.nextOr());
    opt = opt[2];
  } else {
    opt = '#';
  }
  list = dict[opt];
  if (!list) { list = dict[opt] = []; }
  list.push(arg);
  return dict;
}


function parseArgs(args) {
  if (typeof args === 'string') { args = args.split(/\s+/); }
  return iter(args).reduce(checkArg, { '#': [] });
}



eq(parseArgs('hello --foo 11 --bar=22 --bar 33 --foo=44 world'),
  { '#': [ 'hello', 'world' ], bar: [ '22', '33' ], foo: [ '11', '44' ] });





















console.log("+OK parse-cli test passed.");    //= "+OK parse-cli test passed."
