import {Observable, from} from 'rxjs'
import {concatMap} from 'rxjs/operators'

/**
 * Bud componentry
 */
import makeCompiler from './compiler'
import makeData from './data'
import makeUtil from './util'
import actions from './actions'
import prettier from './prettier'

/**
 * Bud core
 *
 * @type  {func}
 * @param {string} outDir
 * @param {object} configData
 * @param {object} data
 * @param {object} sprout
 * @param {string} templateDir
 * @param {bool}   skipInstall
 *
 * @return {Observable}
 */
const bud = ({projectDir, configData, data: dataSrc, sprout, templateDir}) => {
  const config = {
    projectDir,
    templateDir,
    ...configData,
    execa: {
      cwd: projectDir,
    },
  }

  const data = makeData(dataSrc)
  const util = makeUtil(config)
  const compiler = makeCompiler({sprout, data})

  sprout.registerActions &&
    sprout.registerActions.forEach(action => {
      actions.register(action)
    })

  return new Observable(observer => {
    from(sprout.tasks)
      .pipe(
        concatMap(function (task) {
          return new Observable(async observer => {
            observer.next(task.action)

            actions[task.action]({
              task,
              observer,
              config,
              actions,
              compiler,
              prettier,
              util,
              data,
            })
          })
        }),
      )
      .subscribe({
        next: next => observer.next(next),
        error: error => observer.error(error),
        complete: complete => observer.complete(complete),
      })
  })
}

export default bud
