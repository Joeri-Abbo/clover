const { join } = require('path')
import React from 'react'
import Runner from './Runner'
import execa from 'execa'

const Install = cwd =>
  execa.commandSync('yarn', cwd).stdout

export default Install
