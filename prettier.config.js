/** @type {import("prettier").Config} */
module.exports = {
  semi: false,
  singleQuote: true,

  // Fix compatability issues
  ...require('@wyze/prettier-tailwind-trivago-compat'),

  // Import plugin
  importOrder: ['^node:', '<THIRD_PARTY_MODULES>', '^~', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
