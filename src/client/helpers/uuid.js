/**
 * Generates a UUID.
 * https://gist.github.com/jed/982883
 * @param {number|undefined} seed
 * @return {string}
 */
/* eslint-disable no-bitwise, no-mixed-operators */
const uuid = ( seed: ?number ): string =>
  seed ? (seed ^ Math.random() * 16 >> seed / 4).toString(16) :
      ([ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid)
/* eslint-enable no-bitwise, no-mixed-operators */

export default uuid
