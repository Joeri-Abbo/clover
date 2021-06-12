import {join} from 'path'
import {copy as fsCopy} from 'fs-extra'

const copy = async ({task, config, observer}): Promise<void> => {
  const src = join(config.templateDir, task.src)
  const dest = join(config.projectDir, task.dest)

  observer.next(`Copying file`)

  await fsCopy(src, dest)

  observer.complete()
}

export default copy
