import {outputFile} from 'fs-extra'

/**
 * Write
 *
 * @param {Observer} observer
 * @param {string}   target
 * @param {string}   string
 */
const Write = ({observer, target, string}) => {
  !(observer && target && string)
    ? observer.next({status: `Waiting for file contents..`})
    : (() => {
      observer.next({status: `Writing ${target}`})
      outputFile(target, string)
      .then(() => {
        observer.complete()
      })
    })()
}

export default Write
