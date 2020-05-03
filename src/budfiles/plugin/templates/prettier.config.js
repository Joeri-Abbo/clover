/**
 * Prettier config.
 */

const prettierPluginPHP = require('@prettier/plugin-php')

module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: false,
  tabWidth: 2,
  printWidth: 80,
  singleQuote: true,
  jsxBracketSameLine: true,
  useTabs: false,
  trailingComma: 'all',
  semi: false,
  overrides: [
    {
      files: ['*.php'],
      options: {
        tabWidth: 4,
        parser: prettierPluginPHP,
      }
    },
  ]
}
