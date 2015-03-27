"use strict";

function demethodize(fn) {
  return function dm(ctx) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return fn.apply(ctx, args);
  };
}

function demethodizeFunctional(fn) {
  return function fnDm() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return function callableFnDm(ctx) {
      return fn.apply(ctx, args);
    };
  };
}

demethodize.f = demethodize.functional = demethodizeFunctional;
module.exports = demethodize;
