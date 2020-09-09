const command = async ({task, observer, util}) => {
  task.msg && observer.next(`${task.msg}`)

  const {exitCode, stderr} = await util.command(task.run)
  exitCode == 0 ? observer.complete() : observer.error(stderr)
}

export default command
