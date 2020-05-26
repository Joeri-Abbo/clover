import {join} from 'path'

import Read from './../Read'
import Process from './../Process'
import Prettify from './../Prettify'
import Write from './../Write'

/**
 * Template
 */
const template = async ({task, sprout, data, writeDir, templateDir, observer}) => {
  let string

  observer.next({status: `Processing templates`})

  string = await Read({
    observer,
    file: `${templateDir}/${task.template}`,
  })

  string = await Process({
    observer,
    string,
    sprout,
    data,
  })

  if (! task.prettier == false) string = await Prettify({
    observer,
    string: template,
    extension: task.path.split('.')[task.path.split('.').length - 1],
  })

  string = await Write({
    observer,
    string,
    target: join(writeDir, task.path),
  })

  observer.next({status: string})
}

export default template
