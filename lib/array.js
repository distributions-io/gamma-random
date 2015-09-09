'use strict';

// MODULES //

var partial = require( './partial.js' );


// RANDOM //

/**
* FUNCTION: random( len, alpha, beta[, rand] )
*	Creates an array of gamma distributed random numbers.
*
* @param {Number} len - array length
* @param {Number} alpha - shape parameter
* @param {Number} beta - rate parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Number[]} array filled with gamma random numbers
*/
function random( len, alpha, beta, rand ) {
	var out,
		draw,
		i;

	draw = partial( alpha, beta, rand );
	// Ensure fast elements...
	if ( len < 64000 ) {
		out = new Array( len );
		for ( i = 0; i < len; i++ ) {
			out[ i ] = draw();
		}
	} else {
		out = [];
		for ( i = 0; i < len; i++ ) {
			out.push( draw() );
		}
	}
	return out;
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
