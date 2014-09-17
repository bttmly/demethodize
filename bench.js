var Benchmark = require( 'benchmark' );

// all the demethodize variations I could think of.

// http://tech.pro/blog/2097/clever-way-to-demethodize-native-js-methods
var dmDoubleBind = Function.prototype.bind.bind( Function.prototype.call );

var dmCallBind1 = function ( fn ) {
  return Function.prototype.call.bind( fn );
};

var dmCallBind2 = (function () {
  var call = Function.prototype.call;
  return function ( fn ) {
    return call.bind( fn );
  };
})();

var _call = Function.prototype.call;
var dmCallBind3 = function ( fn ) {
  return _call.bind( fn );
};

var dmApply1 = function ( fn ) {
  return function ( context ) {
    var len = arguments.length;
    var args = new Array( len );
    for ( var i = 1; i < len; i++ ) {
      args[i - 1] = arguments[i];
    }
    return fn.apply( context, args );
  };
};

var dmApply2 = function ( fn ) {
  return function () {
    var len = arguments.length;
    var args = new Array( len );
    for ( var i = 1; i < len; i++ ) {
      args[i - 1] = arguments[i];
    }
    return fn.apply( arguments[0], args );
  };
};

var dmApply3 = function ( fn ) {
  return function ( context ) {
    var args = [].slice.call( arguments, 1 );
    return fn.apply( context, args );
  };
};

var dmCallSpread = function ( fn ) {
  return function () {
    switch ( arguments.length ) {
      case 0: return fn.call( arguments[0] );
      case 1: return fn.call( arguments[0], arguments[1] );
      case 2: return fn.call( arguments[0], arguments[1], arguments[2] );
      case 3: return fn.call( arguments[0], arguments[1], arguments[2], arguments[3] );
      case 4: return fn.call( arguments[0], arguments[1], arguments[2], arguments[3], arguments[4] );
      case 5: return fn.call( arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5] );
      default:
        var len, args;
        len = arguments.length;
        args = new Array( len );
        for ( var i = 1; i < len; i++ ) {
          args[i - 1] = arguments[i];
        }
        return fn.apply( arguments[0], args );
    }

  };
};

// for the suite
var fns = {
  dmDoubleBind: dmDoubleBind( [].forEach ),
  dmCallBind1: dmCallBind1( [].forEach ),
  dmCallBind2: dmCallBind2( [].forEach ),
  dmCallBind3: dmCallBind3( [].forEach ),
  dmApply1: dmApply1( [].forEach ),
  dmApply2: dmApply2( [].forEach ),
  dmApply3: dmApply3( [].forEach ),
  dmCallSpread: dmCallSpread( [].forEach )
};

var noop = function () {};

var len = process.argv[2] || 3;

var str = '';

while ( str.length < len ) {
  str += String.fromCharCode( str.length % 26 + 97 );
}

var events = [];

// define & run suite
var suite = new Benchmark.Suite();
suite
.add( 'double bind', function () {
  fns.dmDoubleBind( str, noop );
})
.add( 'call bind 1', function () {
  fns.dmCallBind1( str, noop );
})
.add( 'call bind 2', function () {
  fns.dmCallBind2( str, noop );
})
.add( 'call bind 3', function () {
  fns.dmCallBind3( str, noop );
})
.add( 'apply 1', function () {
  fns.dmApply1( str, noop );
})
.add( 'apply 2', function () {
  fns.dmApply2( str, noop );
})
.add( 'apply 3', function () {
  fns.dmApply3( str, noop );
})
.add( 'call spread', function () {
  fns.dmCallSpread( str, noop );
})
.on( 'start', function () {
  console.log( 'Hang tight, running benchmarks...' );
})
.on( 'cycle', function ( event ) {
  events.push( event );
  process.stdout.write( '.' );
})
.on( 'complete', function () {
  process.stdout.write( '\n' );

  var runs = this.slice().sort( function ( a, b ) {
    return a.hz - b.hz;
  });

  var fastest = runs.pop();
  console.log( fastest.name + " is fastest." );
  console.log( String( fastest ) );
  var run, diff, pct;

  while ( runs.length ) {
    run = runs.pop();
    diff = fastest.hz - run.hz;
    pct = ( diff * 100 / fastest.hz ).toFixed( 2 );
    console.log( run.name + " is " + pct + "% slower than fastest.");
    console.log( String( run ) );
  }
})
.run();
