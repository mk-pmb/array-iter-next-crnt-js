/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

function readmeDemo() {
  //#u
  var iter = require('array-iter-next-crnt'), eq = require('equal-pmb'),
    days = ['Mon', 'Tue', ':holiday', 'Wed'], remain, it, collect;

  it = iter(days);

  function addMarkedDay(day, opt) {
    if (it !== opt.ctx) { throw new Error('unexpected context'); }
    day = String(day);
    if (/^:/.exec(it.peek())) { day += it.next().crnt + opt.mark; }
    return (opt.prefix || '') + day;
  }

  collect = it.map(addMarkedDay, [{ ctx: it, mark: '!' }]);
  eq(collect, ['Mon', 'Tue:holiday!', 'Wed']);
  remain = it.map(String);
  eq(remain, []);

  // test rewind
  it.rewind();
  collect = collect.concat(it.map(addMarkedDay, [{ ctx: it, mark: '*' }]));
  eq(collect, [ 'Mon', 'Tue:holiday!', 'Wed',
                'Mon', 'Tue:holiday*', 'Wed' ]);

  days.push('Thu', 'Fri');
  collect = collect.concat(it.map(addMarkedDay, [{ ctx: it, mark: '*' }]));
  eq(collect, [ 'Mon', 'Tue:holiday!', 'Wed',
                'Mon', 'Tue:holiday*', 'Wed', 'Thu', 'Fri' ]);
  //#r

  console.log("+OK peek test passed.");    //= "+OK peek test passed."
}




















module.exports = readmeDemo;
if (require.main === module) { readmeDemo(); }
