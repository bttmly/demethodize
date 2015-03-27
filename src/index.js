function demethodize (fn) {
  return function dm (ctx, ...args) {
    return fn.apply(ctx, args);
  };
}

function demethodizeFunctional (fn) {
  return function fnDm (...args) {
    return function callableFnDm (ctx) {
      return fn.apply(ctx, args);
    };
  };
}

demethodize.f = demethodize.functional = demethodizeFunctional;
module.exports = demethodize;
