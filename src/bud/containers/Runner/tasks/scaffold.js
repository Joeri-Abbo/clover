/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-undef */
import {join} from 'path'
import {ensureDir} from 'fs-extra'
import {Observable, from} from 'rxjs'
import {concatMap} from 'rxjs/operators'

import Process from './../Process'

/**
 * Task: scaffold dir
 *
 * @prop {object}   task
 * @prop {string}   writeDir
 * @prop {object}   sprout
 * @prop {object}   data
 * @prop {Observer} observer
 */
const scaffold = async ({task: {paths}, writeDir, sprout, data, observer}) => {
  observer.next({status: `Creating directories`})
  from(paths)
    .pipe(
      concatMap(path => {
        return new Observable(async observer => {
          try {
            const pathTmp = await Process({sprout, data, observer, string: path})
            const dirPath = join(writeDir, pathTmp)

            try {
              await ensureDir(dirPath).then(() => {
                observer.complete()
              })
            } catch {
              observer.error(`Scaffolding action throw: ${paths}, ${dirPath}`)
            }
          } catch {
            observer.error(`Action error: scaffold, pathTemplate`)
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
