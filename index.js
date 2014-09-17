module.exports = function demethodize ( fn ) {
  return function () {
    var len = arguments.length;
    var args = new Array( len );
    for ( var i = 1; i < len; i++ ) {
      args[i - 1] = arguments[i];
    }
    return fn.apply( arguments[0], args );
  };
};
