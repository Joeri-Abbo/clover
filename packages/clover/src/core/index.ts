import {Observable, from} from 'rxjs'
import {concatMap} from 'rxjs/operators'
import makeCompiler from './compiler'
import makeConfig from './config'
import makeData from './data'
import {makeUtil} from './util'
import actions from './actions'
import prettier from './prettier'
import {resolve, dirname} from 'path'

const clover = ({
  config,
  generator,
  file,
  projectDir,
  data,
  ...props
}) => {
  const builtConfig = makeConfig({
    config,
    projectDir,
  })

  const builtData = makeData({
    config,
    data,
    generator,
  })

  const util = makeUtil({config})
  const compiler = makeCompiler({generator, data})

  generator.registerActions &&
    generator.registerActions.forEach(action => {
      actions.register({action})
    })

  return new Observable(observer => {
    const props = {
      config: builtConfig,
      data: builtData,
      actions,
      compiler,
      prettier,
      util,
      generator,
      projectDir,
      generatorDir: resolve(file, '..'),
    }

    from(generator.tasks)
      .pipe(
        concatMap(
          (task: any) =>
            new Observable(observer => {
              actions[task.task]({task, actions, observer, ...props})
            }),
        ),
      )
      .subscribe({
        next: next => observer.next(next),
        error: error => observer.error(error),
        complete: () => observer.complete(),
      })
  })
}

export default clover
