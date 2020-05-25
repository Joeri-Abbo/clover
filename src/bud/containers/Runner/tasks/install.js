import execa from 'execa'

const install = async ({task: {repo}, writeDir, observer}) => {
  let installation
  const options = {cwd: writeDir}

  observer.next({status: `Installing packages from ${repo}...`})

  if (repo !== 'npm' && repo !== 'packagist') {
    observer.error(`Incorrect package repo specified.`)
  }

  if (repo == 'npm') {
    installation = execa.command(`yarn`, options)
  }

  if (repo == 'packagist') {
    installation = execa.command(`composer install`, options)
  }

  installation.stdout.on('data', status => {
    observer.next({status: status.code})
  })

  installation.then(() => {
    observer.complete()
  })
}

export default install
