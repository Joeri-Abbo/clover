import {Observable, from} from 'rxjs'
import {concatMap} from 'rxjs/operators'

/**
 * Scaffold directories
 *
 * @param  {array} paths
 * @return {Observable}
 */
const scaffold = ({task, observer, config, data, compiler, actions}) => {
  observer.next(`Creating directories`)

  return from(task.paths)
    .pipe(
      concatMap(path => {
        return new Observable(async observer => {
          try {
            await actions.mkDir({
              task: {path},
              config,
              data,
              compiler,
              observer,
            })

            observer.complete()
          } catch (error) {
            observer.error(`error: thrown in actions.scaffold`)
          }
        })
      }),
    )
    .subscribe({
      next: next => observer.next(next),
      error: error => observer.error(error),
      complete: () => observer.complete(),
    })
}

export default scaffold
