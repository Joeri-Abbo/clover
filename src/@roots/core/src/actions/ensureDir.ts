import {join} from 'path'
import fs from 'fs-extra'
import {Actions} from '.'

async function ensureDir(this: Actions, task) {
  const path = join(this.clover.config.projectDir, task.path)

  await fs.ensureDir(path)

  return
}

export {ensureDir}
