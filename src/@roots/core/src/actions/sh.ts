import execa, {ExecaChildProcess} from 'execa'
import {Actions} from './'

export async function sh(
  this: Actions,
  ...task: string[]
): Promise<ExecaChildProcess> {
  const op = await execa(
    task.shift(),
    task.length > 0 ? task : null,
    this.clover.config.execa,
  )

  return op
}
