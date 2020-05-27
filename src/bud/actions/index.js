import addDependencies from './addDependencies'
import compile from './compile'
import copy from './copy'
import install from './install'
import json from './json'
import mkDir from './mkDir'
import scaffold from './scaffold'

/**
 * Actions
 */
const actions = {
  addDependencies,
  compile,
  copy,
  install,
  json,
  mkDir,
  scaffold,
  register: function (action) {
    this[`${action.handle}`] = action.callback
  },
}

export default actions
