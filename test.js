require( 'chai' ).should();

var demethodize = require( './' );

describe( "demethodize", function () {
  it( "should set the 'this' context as the first argument", function () {
    var objWithMethod = {
      returnThis: function () { return this; }
    };
    var bareObj = {};
    var justReturnThis = demethodize( objWithMethod.returnThis );
    justReturnThis( bareObj ).should.equal( bareObj );
  });

  it( "should apply subsequent arguments to the method", function () {
    function timesTwo ( n ) { return n * 2; }
    var map = demethodize( [].map );
    var obj = { 0: 10, 1: 100, 2: 1000, length: 3 };
    map( obj, timesTwo ).should.deep.equal([ 20, 200, 2000 ]);
  });

});
