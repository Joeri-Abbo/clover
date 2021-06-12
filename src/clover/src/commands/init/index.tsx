import {join} from 'path'
import {stat, Stats} from 'fs-extra'
import React, {useEffect, useState} from 'react'
import {isNull} from 'lodash'

import {initNew, initExisting} from '@roots/clover-generators'
import GeneratorMiddleware from '../../middleware/GeneratorMiddleware'

/** Constants */
const cwd = process.cwd()

// eslint-disable-next-line
const Init = ({inputArgs}) => {
  const output =
    inputArgs && inputArgs[1] ? join(cwd, inputArgs[1]) : cwd

  /**
   * Determine if target out directory is an existing project or all-new
   */
  const [newProject, setNewProject] = useState(null)
  useEffect(() => {
    const projectExistsCheck = async () => {
      const projectExists: Stats = await stat(
        join(output, 'package.json'),
      )

      setNewProject(!projectExists ? false : true)
    }

    projectExistsCheck()
  }, [])

  /**
   * If the target dir already contains a package.json file
   * then run the init generator which respects that.
   */
  const [command, setCommand] = useState(null)
  useEffect(() => {
    if (!isNull(newProject)) {
      const init = newProject ? initNew : initExisting

      setCommand(init)
    }
  }, [newProject])

  return !command ? null : (
    <GeneratorMiddleware
      file={''}
      generator={command}
      output={output}
    />
  )
}

export default Init
