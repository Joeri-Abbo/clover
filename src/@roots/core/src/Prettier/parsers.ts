export const parsers = {
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

export type Parser = keyof typeof parsers & string
