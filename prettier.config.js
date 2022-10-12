/** @type {import("prettier").Config} */
module.exports = {
  semi: false,
  singleQuote: true,

  // Import plugin
  importOrder: ['^node:', '<THIRD_PARTY_MODULES>', '^~', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
