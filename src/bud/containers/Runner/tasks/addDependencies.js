import execa from 'execa'

const execaOptions = {cwd: process.cwd()}

/**
 * Add dependencies
 */
const addDependencies = async function ({
  task: {repo, pkgs, dev},
  observer,
}) {
  let installation

  observer.next({status: `Installing packages from ${repo}...`})

  if (repo !== 'npm' && repo !== 'packagist') {
    observer.error(`Incorrect package repo specified.`)
  }

  if (repo == 'npm') {
    installation = execa.command(
      `yarn add ${dev ? `-D` : ``} ${pkgs.join(' ')}`,
      execaOptions,
    )
  }

  if (repo == 'packagist') {
    installation = execa.command(
      `composer require ${pkgs.join(' ')} ${dev ? `--development` : ``}`,
      execaOptions,
    )
  }

  installation.stdout.on('data', status => {
    observer.next({status})
  })

  installation.then(() => observer.complete())
}

export default addDependencies
