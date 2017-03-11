/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

function fac() {

  fac.chkEqArg = function (val, dash) {
    var arg = { val: val }, eq;
    if (typeof val !== 'string') { return arg; }
    if (dash) {
      dash = (dash.exec(val) || false);
      if (!dash) { return arg; }
      if (dash.index !== 0) { return arg; }
      arg.dash = (dash.length === 1 ? dash[0] : dash);
      val = val.slice(dash[0].length);
      if (!val) { return arg; }
    }
    delete arg.val;
    eq = val.indexOf('=');
    if (eq < 0) {
      arg.opt = val;
    } else {
      arg.opt = val.substr(0, eq);
      arg.val = val.slice(eq + 1);
    }
    return arg;
  };

}
