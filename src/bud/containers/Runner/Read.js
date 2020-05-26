import {readFile} from 'fs-extra'

/**
 * Read file
 *
 * @param {string} templateDir
 * @param {string} template
 */
const Read = async ({observer, file}) => {
  try {
    observer.next({status: `Reading: ${file}`})

    return await readFile(file, 'utf8')
  } catch (error) {
    observer.error(error)
  }
}

export default Read
