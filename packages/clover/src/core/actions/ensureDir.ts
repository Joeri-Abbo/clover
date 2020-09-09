import {join} from 'path'
import fs from 'fs-extra'

const ensureDir = async ({
  task,
  observer,
  config,
  data,
  compiler,
}) => {
  const path = join(config.projectDir, compiler.make(task.path)(data))

  observer.next(`Writing directory ${path}`)

  await fs.ensureDir(path)

  observer.complete()
}

export {ensureDir as default}
