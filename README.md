
<!--#echo json="package.json" key="name" underline="=" -->
array-iter-next-crnt
====================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Get array items one-by-one and remember the current one.
<!--/#echo -->


Usage
-----

from [test/take2dict.js](test/take2dict.js):

<!--#include file="test/take2dict.js" start="  //#u" stop="  //#r"
  outdent="  " code="javascript" -->
<!--#verbatim lncnt="34" -->
```javascript
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
```
<!--/include-->



<!--#toc stop="scan" -->


Q&A
---

* Why does the iterator function return `false` instead of `undefined`
  if there's no next value?

In scenarios where you know that all your values are truthy and you don't
mind coding style, you can
```javascript
while (x = myIter().crnt) { console.log('after next(), crnt is', x); }
```



Known issues
------------

* needs more/better tests and docs




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
