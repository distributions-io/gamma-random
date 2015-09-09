'use strict';

// MODULES //

var randNormal = require( 'distributions-normal-random/lib/number.js' );


// FUNCTIONS  //

var ln = Math.log,
	sqrt = Math.sqrt;


// PARTIAL //

/**
* FUNCTION: partial( alpha, beta[, rand] )
*	Partially applies `alpha` and `beta` and returns a function
*	to generate random variables from the gamma distribution.
*	Implementation of a method by Marsaglia & Tsang.
*	Reference:
*		Marsaglia, G., & Tsang, W. W. (2000). A simple method for generating
*		gamma variables. ACM Transactions on Mathematical Software,
*		26(3), 363–372. doi:10.1145/358407.358414
*
* @param {Number} alpha - shape parameter
* @param {Number} beta - rate parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Function} function which generates random draws from the specified distribution
*/
function partial( alpha, beta, rand ) {
	var random,
		c, d;

	if ( rand ) {
		random = rand;
	} else {
		random = Math.random;
	}

	d = alpha - 1/3;
	c = 1 / sqrt( 9 * d );

	/**
	* FUNCTION: draw( x )
	*	Generates a random draw for a gamma distribution with parameters `alpha` and `beta`.
	*
	* @private
	* @returns {Number} random draw from the specified distribution
	*/
	return function draw() {
		var x,
			u, v;

		while ( true ) {
			do {
				x = randNormal( 0, 1, random );
				v = 1 + c * x;
			} while( v <= 0 );
			v = v*v*v;
			u = random();
			if ( u < 1 - 0.331 * (x*x) * (x*x) ) {
				return (1/beta) * d * v;
			}
			if ( ln( u ) < 0.5*x*x + d * ( 1 - v + ln( v ) ) ) {
				return (1/beta) * d * v;
			}
		}
	}; // end FUNCTION draw()
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
