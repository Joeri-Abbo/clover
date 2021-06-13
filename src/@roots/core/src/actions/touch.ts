import {ensureFile} from 'fs-extra'
import {join} from 'path'
import {Actions} from '.'

export async function touch(
  this: Actions,
  task: {path: string; options: any},
) {
  const path = join(
    this.clover.config.projectDir,
    this.clover.compiler.compile(task.path, task.options),
  )

  try {
    await ensureFile(path)
  } catch (error) {
    throw new Error(error)
  }

  return
}
