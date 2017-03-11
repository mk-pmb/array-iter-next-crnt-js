/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';


function readmeDemo() {
  //#u
  var iter = require('array-iter-next-crnt'), list, it, dict,
    expectEqual = require('equal-pmb'), expected;

  list = [ 'animals', 3, 'bird', 'cat', 'horse',
    'tooFew', 9001,
    'empty', 0,
    'alpha', 5, 'a', 'b', 'c',    // misleading notation in order to
    'nums', 0, 1, 2, 3, 4,        // show that it doesn't matter
    'fruit', 2, 'banana', 'pear',
    ];

  it = iter(list);
  dict = {};
  it.each(function (key) {
    expectEqual(it, this);
    expectEqual(it.crnt, key);
    var nextUp = it.peek(), howMany;
    expectEqual(it.next(), it);
    howMany = it.crnt;
    expectEqual(nextUp, howMany);
    dict[key] = it.take(howMany);
  });

  expected = {
    animals: [ 'bird', 'cat', 'horse' ],
    tooFew: false,
    empty: [],
    alpha: [ 'a', 'b', 'c', 'nums', 0 ],    // took 5, as expected.
    '1': [ 3, 4 ],
    fruit: [ 'banana', 'pear' ],
  };
  expectEqual(dict, expected);
  //#r

  console.log("+OK peek test passed.");    //= "+OK peek test passed."
}




















module.exports = readmeDemo;
if (require.main === module) { readmeDemo(); }
