const install = async ({task, observer, util}) => {
  const cmdStr = () => {
    switch (task.repo) {
      case 'npm':
        return 'yarn'
      case 'packagist':
        return 'composer install'
      default:
        observer.error(`Incorrect package repo specified.`)
    }
  }

  observer.next(`Installating packages from ${task.repo}`)

  const {command, exitCode, stderr} = await util.command(cmdStr())

  command && observer.next(command)

  exitCode == 0 ? observer.complete() : observer.error(stderr)
}

export default install
