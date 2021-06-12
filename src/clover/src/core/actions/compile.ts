import {resolve} from 'path'
import {outputFile, readFile} from 'fs-extra'
import {Subscriber} from 'rxjs'

interface CompileProps {
  task: any
  observer: Subscriber<unknown>
  data: any
  prettier: any
  compiler: any
  config: any
  projectDir: string
  generatorDir: string
}

const compile = async ({
  task,
  observer,
  data,
  prettier,
  compiler,
  config,
  generatorDir,
}): Promise<void> => {
  observer.next(`Write file: ${task.dest}`)

  const src = await readFile(
    resolve(task.templateDir ?? generatorDir, task.src),
    'utf8',
  )

  const dest = compiler.make(task.dest)(data)

  const template = compiler.make(src)(data)

  observer.next(`Writing file ${dest}`)

  await outputFile(
    resolve(config.projectDir, dest),

    task.parser ? prettier.format(template, task.parser) : template,
  )

  observer.complete()
}

export {compile as default}
