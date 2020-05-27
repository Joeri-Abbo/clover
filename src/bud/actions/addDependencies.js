/**
 * Action: Add dependencies
 *
 * @param  {object}   task
 * @param  {Observer} observer
 * @param  {object}   util
 *
 * @return {void}
 */
const addDependencies = async ({task, observer, util}) => {
  let installation

  observer.next(`Installing packages from ${task.repo}...`)

  if (task.repo !== 'npm' && task.repo !== 'packagist') {
    observer.error(`Incorrect package repo specified.`)
  }

  if (task.repo == 'npm') {
    installation = util.command(
      `yarn add ${task.dev ? `-D` : ``} ${task.pkgs.join(' ')}`,
    )
  }

  if (task.repo == 'packagist') {
    installation = util.command(
      `composer require ${task.pkgs.join(' ')} ${
        task.dev ? `--development` : ``
      }`,
    )
  }

  installation.stdout.on('data', status => {
    observer.next(status)
  })

  installation.then(() => observer.complete())
}

export default addDependencies
