'use strict';

// MODULES //

var partial = require( './partial.js' ),
	recurse = require( './recurse.js' );


// RANDOM //

/**
* FUNCTION: random( dims, alpha, beta[, rand] )
*	Creates a multidimensional array of gamma distributed random numbers.
*
* @param {Number[]} dims - dimensions
* @param {Number} alpha - shape parameter
* @param {Number} beta - rate parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Array} multidimensional array filled with gamma random numbers
*/
function random( dims, alpha, beta, rand ) {
	var draw = partial( alpha, beta, rand );
	return recurse( dims, 0, draw );
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
