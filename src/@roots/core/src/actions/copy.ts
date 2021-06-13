import {join} from 'path'
import {copy as fsCopy} from 'fs-extra'
import {Actions} from './'

async function copy(this: Actions, task: {src; dest}): Promise<void> {
  const src = join(this.clover.config.templateDir, task.src)
  const dest = join(this.clover.config.projectDir, task.dest)

  await fsCopy(src, dest)

  return
}

export {copy}
