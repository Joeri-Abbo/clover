import {join} from 'path'

import Process from './../Process'
import Prettify from './../Prettify'
import Write from './../Write'

const CWD = process.cwd()

/**
 * JSON
 */
const json = async ({task: {file, merge}, sprout, data, observer}) => {
  const json = require(join(CWD, file))

  observer.next({status: `Writing JSON to ${file}`})
  const output = merge(json)

  try {
    const string = await Process({
      observer,
      string: output,
      sprout,
      data,
    })

    const prettyString = await Prettify({
      observer,
      string,
      extension: 'json',
    })

    await Write({
      observer,
      target: join(CWD, file),
      string: prettyString,
    })

    observer.complete()
  } catch (err) {
    observer.error(`There was a problem writing to ${file}`)
  }
}

export default json
