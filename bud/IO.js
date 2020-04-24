import fs from 'fs-extra'

/**
 * Read file and return contents
 *
 * @param {string} path file path
 */
const Read = ({ path }) => fs.readFileSync(path)

/**
 * Process template literals and lint for code style
 *
 * @param {string} path     file path
 * @param {object} contents data
 */
const Write = ({ path, contents }) => {
  fs.outputFileSync(path, contents)

  return null;
}

export {
  Read,
  Write,
};
