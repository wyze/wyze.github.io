[%%raw {|
module.exports = {
  env: {
    test: {
      plugins: [
        ['@babel/transform-modules-commonjs', { lazy: true }],
        'babel-plugin-remove-graphql-queries'
      ]
    }
  }
}
|}];
