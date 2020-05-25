import {format} from 'prettier'

/**
 * Prettier
 *
 * @param {Observable} observer
 * @param {string} extension
 * @param {string} string
 */
const Prettify = async ({observer, string, extension}) => {
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

  const parser = parsers[`${extension}`]

  const config = {
    arrowParens: 'avoid',
    bracketSpacing: false,
    tabWidth: 2,
    printWidth: 100,
    singleQuote: true,
    jsxBracketSameLine: true,
    useTabs: false,
    trailingComma: 'all',
    semi: false,
    parser,
  }

  /**
   * Make prettier.
   */
  observer.next(
    parser ? `Skipping prettier. No support for this extension.` : `Prettifying file output`,
  )

  const prettified = parser ? format(string, config) : string

  return prettified
}

export default Prettify
