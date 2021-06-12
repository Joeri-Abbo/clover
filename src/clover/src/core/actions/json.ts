import {outputFile} from 'fs-extra'

const json = async function ({task, observer, prettier, config}) {
  // eslint-disable-next-line
  const json = require(`${config.projectDir}/${task.file}`)
  observer.next(`Writing JSON to ${task.file}`)

  try {
    const output = task.merge(json)
    await outputFile(
      `${config.projectDir}/${task.file}`,
      prettier.format(output, 'json'),
    )

    observer.complete()
  } catch (err) {
    console.log(`There was a problem writing to ${task.file}`)
  }
}

export default json
