# Demethodize
Demethodizing allows you to use methods as generics. You can just use call and apply to do this, like so:
```js
Array.prototype.map.call( 'abcdef', function ( letter ) {
  return letter.toUpperCase();
}); // ['A', 'B', 'C', 'D', 'E', 'F']
```
This is kind of verbose if you're using it a lot. `Array.prototype.map` can be simply substituted with `[].map`. This gets even easier still with demethodize, which produces reusable functions.

```js
var map = demethodize( [].map );
map( 'abcdef', function ( letter ) {
  return letter.toUpperCase();
}); // ['A', 'B', 'C', 'D', 'E', 'F']

map( '123456', function ( n) {
  return Number( n ) + 1;
}); // [2, 3, 4, 5, 6, 7]
```

I've benchmarked a number of equivalent implementations for speed, and am using an implementation with `.apply()` as it is fastest.

**Example benchmark output** (see bench.js for implementations)
```
Hang tight, running benchmarks...
........
apply 2 is fastest.
apply 2 x 1,373,646 ops/sec ±1.48% (91 runs sampled)
apply 1 is 3.98% slower than fastest.
apply 1 x 1,318,984 ops/sec ±2.58% (89 runs sampled)
call spread is 16.82% slower than fastest.
call spread x 1,142,603 ops/sec ±5.11% (75 runs sampled)
call bind 2 is 18.85% slower than fastest.
call bind 2 x 1,114,747 ops/sec ±1.47% (89 runs sampled)
call bind 1 is 20.31% slower than fastest.
call bind 1 x 1,094,665 ops/sec ±1.92% (91 runs sampled)
double bind is 21.23% slower than fastest.
double bind x 1,082,039 ops/sec ±2.07% (89 runs sampled)
call bind 3 is 23.46% slower than fastest.
call bind 3 x 1,051,395 ops/sec ±1.76% (89 runs sampled)
apply 3 is 54.54% slower than fastest.
apply 3 x 624,405 ops/sec ±4.53% (84 runs sampled)
```
