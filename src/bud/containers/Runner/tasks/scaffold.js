/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-undef */
import {join} from 'path'
import {ensureDir} from 'fs-extra'
import {Observable, from} from 'rxjs'
import {concatMap} from 'rxjs/operators'

import Process from './../Process'

const CWD = process.cwd()

const scaffold = async ({task: {paths}, sprout, data, observer}) => {
  observer.next({status: `Creating directories`})

  from(paths)
    .pipe(
      concatMap(path => {
        return new Observable(async observer => {
          try {
            const pathTemplate = await Process({
              sprout,
              data,
              observer,
              string: path,
            })

            const dirPath = join(CWD, pathTemplate)

            try {
              await ensureDir(dirPath)
                .then(() => {
                  observer.complete()
                })
            } catch {
              observer.error(`scaffolding action throw: ${paths}, ${dirPath}`)
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