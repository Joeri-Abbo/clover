import execa from 'execa'

const install = async ({task: {repo}, writeDir, observer}) => {
  const options = {cwd: writeDir}

  observer.next({status: `Installing packages from ${repo}...`})

  if (repo !== 'npm' && repo !== 'packagist') {
    observer.error(`Incorrect package repo specified.`)
  }

  if (repo == 'npm') {
    const {stdout} = execa(`yarn`, [`install`], options)
    stdout.then(() => {
      observer.complete()
    })
  }

  if (repo == 'packagist') {
    const {stdout} = execa(`composer`, [`install`], options)
    stdout.then(() => {
      observer.complete()
    })
  }
}

export default install
