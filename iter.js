/*jslint indent: 2, maxlen: 80, continue: false, unparam: false */
/* -*- tab-width: 2 -*- */
/*global define: true, module: true, require: true */
((typeof define === 'function') && define.amd ? define : function (factory) {
  'use strict';
  var m = ((typeof module === 'object') && module), e = (m && m.exports);
  if (e) { m.exports = (factory(require, e, m) || m.exports); }
})(function () {
  'use strict';

  function addProxies(src, dest) {
    Object.keys(src).forEach(function (key) {
      dest[key] = src[key].bind(null, dest);
    });
  }

  var mthd = {}, fac;
  function iterFactory(arr) {
    function iter(d) { return iter.nextOr(d); }
    addProxies(mthd, iter);
    iter.rewind();
    iter.array = arr;
    return iter;
  }
  fac = iterFactory;


  mthd.rewind = function iterRewind(iter, startIdx) {
    iter.pos = (startIdx || 0) - 1;
    return iter;
  };


  mthd.next = function iterNext(iter) {
    var arr = (iter.array || false), nxtPos = (+iter.pos) + 1,
      hasNext = ((nxtPos >= 0) && (arr.length >= 0) && (nxtPos < arr.length));
    if (!hasNext) { return false; }
    iter.crnt = arr[nxtPos];
    iter.pos = nxtPos;
    return iter;
  };


  mthd.nextOr = function iterNextOr(iter, ifLast) {
    return (iter.next() ? iter.crnt : ifLast);
  };


  mthd.peek = function iterPeek(iter, inc) {
    var arr = (iter.array || false), peekPos = (+iter.pos) + (+(inc || 1));
    if (peekPos >= 0) { return arr[peekPos]; }
    return;
  };


  mthd.take = function (iter, minN, maxN) {
    minN = (+minN || 0);
    if (maxN !== +maxN) { maxN = minN; }
    var arr = iter.array, offset = (+iter.pos || 0) + 1,
      taken = arr.slice(offset, offset + maxN);
    if (taken.length < minN) { return false; }
    iter.pos = offset + taken.length - 1;
    iter.crnt = arr[iter.pos];
    return taken;
  };


  mthd.each = function iterEach(iter, workFunc, extraArgs, context, results) {
    var args = [0], rslt;
    if ((typeof workFunc) !== 'function') {
      throw new TypeError('Expected workFunc to be a function');
    }
    if (extraArgs) { args = args.concat(extraArgs); }
    if (context === undefined) { context = iter; }
    while (iter.next()) {
      args[0] = iter.crnt;
      rslt = workFunc.apply(context, args);
      if (results) { results[results.length] = rslt; }
    }
    return iter;
  };


  mthd.map = function iterMap(iter, workFunc, extraArgs, context, results) {
    if (!results) { results = []; }
    iter.each(workFunc, extraArgs, context, results);
    return results;
  };


  mthd.reduce = function iterMap(iter, workFunc, accum, context) {
    if (accum === undefined) { accum = iter.next().crnt; }
    iter.each(function (x) { accum = workFunc.call(this, accum, x); },
      null, context);
    return accum;
  };






















  return fac;
});
