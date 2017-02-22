require('babel-register')

if ( !require('piping')({ hook: true }) ) {
  return
}

require('./src/server')
