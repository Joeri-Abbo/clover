import {Observable, from} from 'rxjs'
import {concatMap} from 'rxjs/operators'

/**
 * Bud componentry
 */
import makeCompiler from './compiler'
import actions from './actions'
import prettier from './prettier'
import sproutUtil from './util'

/**
 * Bud core
 *
 * @param {string} outDir
 * @param {object} configData
 * @param {object} data
 * @param {object} sprout
 * @param {string} templateDir
 * @param {bool}   skipInstall
 */
const bud = ({projectDir, configData, data, sprout, templateDir}) => {
  const config = {
    projectDir,
    templateDir,
    ...configData,
    execa: {
      cwd: projectDir,
    },
  }
  const util = sproutUtil(config)
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
