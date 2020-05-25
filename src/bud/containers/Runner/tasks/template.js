import {join} from 'path'

import Read from './../Read'
import Process from './../Process'
import Prettify from './../Prettify'
import Write from './../Write'

/**
 * Template
 */
const template = async ({
  task,
  sprout,
  data,
  writeDir,
  templateDir,
  observer,
}) => {
  const string = await Read({
    observer,
    file: `${templateDir}/${task.template}`,
  })

  const template = await Process({
    observer,
    string,
    sprout,
    data,
  })

  const prettier = await Prettify({
    observer,
    string: template,
    extension: task.path.split('.')[
      task.path.split('.').length - 1
    ],
  })

  const output = await Write({
    observer,
    string: prettier,
    target: join(writeDir, task.path),
  })

  observer.next({status: output})
  observer.complete()
}

export default template