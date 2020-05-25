import execa from 'execa'

const execaOptions = {cwd: process.cwd()}

const install = async ({task: {repo}, observer}) => {
  let installation

  observer.next({status: `Installing packages from ${repo}...`})

  if (repo !== 'npm' && repo !== 'packagist') {
    observer.error(`Incorrect package repo specified.`)
  }

  if (repo == 'npm') {
    installation = execa.command(`yarn`, execaOptions)
  }

  if (repo == 'packagist') {
    installation = execa.command(`composer install`, execaOptions)
  }

  installation.stdout.on('data', status => {
    observer.next({status: status.code})
  })

  installation.then(() => observer.complete())
}

export default install