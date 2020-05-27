/**
 * Prettier parsers.
 * @type {object}
 */
const parsers = {
  js: 'babel',
  jsx: 'babel',
  graphql: 'graphql',
  css: 'css',
  json: 'json',
  md: 'markdown',
  html: 'html',
  htm: 'html',
  ts: 'typescript',
  tsx: 'typescript',
  yml: 'yaml',
  yaml: 'yaml',
  less: 'less',
}

/**
 * Infer parser.
 *
 * @type  {async func}
 * @param {string} file
 */
const inferParser = async function (file) {
  const ext = file.split('.')[file.split('.').length - 1]

  return parsers[`${ext}`] ?? null
}

export default inferParser
