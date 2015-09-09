Gamma Random Variables
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Creates a [matrix](https://github.com/dstructs/matrix) or array filled with draws from a [gamma distribution](https://en.wikipedia.org/wiki/Gamma_distribution).


## Installation

``` bash
$ npm install distributions-gamma-random
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var random = require( 'distributions-gamma-random' );
```

#### random( [dims][, opts] )

Creates a [`matrix`](https://github.com/dstructs/matrix) or [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) filled with draws from a [gamma distribution](https://en.wikipedia.org/wiki/Gamma_distribution). The `dims` argument may either be a positive `integer` specifying a `length` or an `array` of positive `integers` specifying dimensions. If no `dims` argument is supplied,the function returns a single random draw from a [gamma distribution](https://en.wikipedia.org/wiki/Gamma_distribution).

``` javascript
var out;

// Set seed
random.seed = 2;

out = random( 5 );
// returns [ ~0.192, ~0.319, ~0.714, ~0.861, ~0.974 ]

out = random( [2,1,2] );
// returns [ [ [~0.0375,~0.6443] ], [ [~0.5867,~0.980] ] ]

```

The function accepts the following `options`:

*	__alpha__: shape parameter. Default: `1`.
*	__beta__: rate parameter. Default: `1`.
*	__seed__: positive integer used as a seed to initialize the generator. If not supplied, uniformly distributed random numbers are generated via an underlying generator seedable by setting the `seed` property of the exported function.
*	__dtype__: output data type (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types). Default: `generic`.

The [gamma](https://en.wikipedia.org/wiki/Gamma_distribution) distribution is a function of two parameters: `alpha > 0`(shape parameter) and `beta > 0`(rate parameter). By default, `alpha` is equal to `1` and `beta` is equal to `1`. To adjust either parameter, set the corresponding option.

``` javascript
var out = random( 5, {
	'alpha': 30,
	'beta': 5,
});
// returns [ ~5.861, ~4.767, ~7.006, ~6.287, ~6.737 ]

```

To be able to reproduce the generated random numbers, set the `seed` option to a positive integer.

``` javascript
var out = random( 3, {
	'seed': 22
});
// returns [ ~0.267, ~1.047, ~0.203 ]

var out = random( 3, {
    'seed': 22
});
// returns [ ~0.267, ~1.047, ~0.203 ]

```

If no `seed` option is supplied, each function call uses a common underlying uniform number generator. A positive-integer seed for this underlying generator can be supplied by setting the seed property of the exported function.

```javascript
random.seed = 11;
var out = random();
// returns ~0.162

var out = random();
// returns ~0.606

random.seed = 11;
var out = random();
// returns ~0.162

var out = random();
// returns ~0.606

```

By default, the output data structure is a generic [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). To output a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), set the `dtype` option.

``` javascript
var out;

out = random( 5, {
	'dtype': 'float32'
});
// returns Float32Array( [~2.131,~2.051,~1.701,1.54,~1.111] )

out = random( [3,2], {
	'dtype': 'float64'
});
/*
	[ ~0.786 ~1.724
	  ~1.664 ~0.652
	  ~1.042 ~0.231 ]
*/

```

__Notes__:
*	Currently, for more than `2` dimensions, the function outputs a __generic__ `array` and ignores any specified `dtype`.

	``` javascript
	var out = random( [2,1,3], {
		'dtype': 'float32'
	});
	// returns [ [ [~0.349,~0.104,~3.897] ], [ [~0.426,~4.594,~0.281] ] ]

	```

## Method

The algorithm used to generate gamma random variables is taken from a paper by Marsaglia & Tsang. It is very fast provided one has access to a performant uniform and normal number generator.

To generate the random standard normal variates, the module internally calls the [normal-random](https://github.com/distributions-io/normal-random) which provides a very fast algorithm, the improved *Ziggurat* algorithm by Doornik, to sample from a normal distribution.

Reference:
> Marsaglia, G., & Tsang, W. W. (2000). A simple method for generating
> gamma variables. ACM Transactions on Mathematical Software,
> 26(3), 363–372. doi:10.1145/358407.358414
>
> Doornik, J. a. (2005).
> An Improved Ziggurat Method to Generate Normal Random Samples.

## Examples

``` javascript
var random = require( 'distributions-gamma-random' ),
	out;

// Set seed
random.seed = 4;

// Plain arrays...

// 1x10:
out = random( 10 );

// 2x1x3:
out = random( [2,1,3] );

// 5x5x5:
out = random( [5,5,5] );

// 10x5x10x20:
out = random( [10,5,10,20] );

// Typed arrays...
out = random( 10, {
	'dtype': 'float32'
});

// Matrices...
out = random( [3,2], {
	'dtype': 'float64'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-gamma-random.svg
[npm-url]: https://npmjs.org/package/distributions-gamma-random

[travis-image]: http://img.shields.io/travis/distributions-io/gamma-random/master.svg
[travis-url]: https://travis-ci.org/distributions-io/gamma-random

[codecov-image]: https://img.shields.io/codecov/c/github/distributions-io/gamma-random/master.svg
[codecov-url]: https://codecov.io/github/distributions-io/gamma-random?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/gamma-random.svg
[dependencies-url]: https://david-dm.org/distributions-io/gamma-random

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/gamma-random.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/gamma-random

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/gamma-random.svg
[github-issues-url]: https://github.com/distributions-io/gamma-random/issues
