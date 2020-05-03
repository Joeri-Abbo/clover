/** Modules */
const {Observable, from} = require('rxjs')
const {concatMap} = require('rxjs/operators')
const execa = require('execa')

/**
 * Runs many tasks.
 *
 * @param {array}  tasks   array of cli commands
 * @param {object} options execa options
 */
const job = ({tasks, options}) =>
  new Observable(observer => {
    from(tasks)
      .pipe(concatMap(task => task({task, options})))
      .subscribe(response => observer.next(response))
  })

/**
 * Runs a task.
 *
 * @param {string} cmd     execa cmd
 * @param {array}  options execa options
 */
const task = ({cmd, options}) =>
  new Observable(observer => {
    execa.command(cmd, options).then(({stdout, stderr}) => {
      if (stderr) observer.error(stderr)
      if (stdout) observer.next(stdout)

      observer.complete()
    })
  })

module.exports = {job, task}
