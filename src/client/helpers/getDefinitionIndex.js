/**
 * Accepts a custom dimension or metric and returns it's numerical index.
 * @param {string} definition The definition string (e.g. 'dimension1').
 * @return {number} The definition index.
 */
const getDefinitionIndex = ( definition: string ): number =>
  +/\d+$/.exec(definition)[0]

export default getDefinitionIndex
