import {Actions} from '.'

async function clone(this: Actions, task): Promise<any> {
  const op = this.sh(
    `git`,
    `clone`,
    `git@github.com:${task.repo}`,
    `${task.dest}`,
  )

  return op
}

export {clone}
