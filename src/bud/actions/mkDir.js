import {join} from 'path'
import {ensureDir} from 'fs-extra'

/**
 * Make directory
 *
 * @param  {object}   task
 * @param  {Observer} observer
 * @param  {object}   config
 * @param  {object}   data
 * @param  {object}   compiler
 *
 * @return {void}
 */
const mkDir = async ({task, observer, config, data, compiler}) => {
  const path = join(config.projectDir, compiler.make(task.path)(data))

  try {
    await ensureDir(path).then(() => {
      observer.next()
    })
  } catch (error) {
    observer.error(`actions.mkDir: ${JSON.stringify(error)}`)
  }
}

export default mkDir
