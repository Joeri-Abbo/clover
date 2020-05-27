import {Observable, from} from 'rxjs'
import {concatMap} from 'rxjs/operators'
import makeCompiler from './compiler'
import makeConfig from './config'
import makeData from './data'
import makeUtil from './util'
import actions from './actions'
import prettier from './prettier'

/**
 * 🌱 bud starter
 *
 * @prop {string} projectDir
 * @prop {object} projectConfig
 * @prop {object} data
 * @prop {object} sprout
 * @prop {string} templateDir
 *
 * @return {Observable}
 */
const bud = props => {
  const config = makeConfig({...props})
  const data = makeData({...props})

  const {sprout} = props
  const util = makeUtil({config})
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
              data,
              actions,
              compiler,
              prettier,
              util,
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
