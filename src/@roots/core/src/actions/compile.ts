import {resolve} from 'path'
import {outputFile, readFile} from 'fs-extra'
import {Clover} from '../'
import {Parser} from '../Prettier'

export async function compile(
  this: Clover,
  task: {
    template: string
    dest: string
    parser: Parser
  },
): Promise<void> {
  const template = await readFile(
    resolve(this.config.projectDir, task.template),
    'utf8',
  )

  const compiled = this.compiler.compile(template, this.data)

  await outputFile(
    resolve(this.config.projectDir, task.dest),
    task.parser
      ? this.prettier.format(compiled, task.parser)
      : compiled,
  )

  return
}
