import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'src/client/analytics.js',
  dest: 'static/js/js.js',
  format: 'iife',
  plugins: [
    babel({
      babelrc: false,
      exclude: 'static/**',
      plugins: [
        'external-helpers',
        'transform-object-rest-spread',
      ],
      presets: [
        [ 'env',
          {
            modules: false,
            targets: {
              browsers: [
                'last 2 versions',
              ],
            },
          },
        ],
        'flow',
      ],
    }),
    resolve(),
    uglify(),
  ],
}
