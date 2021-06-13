import {outputFile} from 'fs-extra'
import {Actions} from '.'

export async function json(this: Actions, task) {
  const json = await import(
    `${this.clover.config.projectDir}/${task.file}`
  )

  try {
    const output = task.merge(json)
    await outputFile(
      `${this.clover.config.projectDir}/${task.file}`,
      this.clover.prettier.format(output, 'json'),
    )
  } catch (err) {
    console.log(`There was a problem writing to ${task.file}`)
  }
}
