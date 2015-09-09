'use strict';

// MODULES //

var randNormal = require( 'distributions-normal-random/lib/number.js' );


// FUNCTIONS //

var ln = Math.log,
	sqrt = Math.sqrt;


// GENERATE GAMMA RANDOM NUMBERS //

/**
* FUNCTION random( alpha, beta[, rand] )
*	Generates a random draw from a gamma distribution with parameters `alpha` and `beta`.
*	Implementation of a method by Marsaglia & Tsang.
*	Reference:
*		Marsaglia, G., & Tsang, W. W. (2000). A simple method for generating
*		gamma variables. ACM Transactions on Mathematical Software,
*		26(3), 363–372. doi:10.1145/358407.358414
*
* @param {Number} alpha - shape parameter
* @param {Number} beta - rate parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Number} random draw from the specified distribution
*/
function random( alpha, beta, rand ) {
	var c, d,
		x,
		u, v;

	d = alpha - 1/3;
	c = 1 / sqrt( 9 * d );
	while ( true ) {
		do {
			x = randNormal( 0, 1, rand );
			v = 1 + c * x;
		} while( v <= 0 );
		v = v*v*v;
		u = rand();
		if ( u < 1 - 0.331 * (x*x) * (x*x) ) {
			return (1/beta) * d * v;
		}
		if ( ln( u ) < 0.5*x*x + d * ( 1 - v + ln( v ) ) ) {
			return (1/beta) * d * v;
		}
	}
}

module.exports = random;
