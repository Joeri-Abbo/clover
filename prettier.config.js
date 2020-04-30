module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  tabWidth: 2,
  printWidth: 120,
  singleQuote: true,
  jsxBracketSameLine: true,
  useTabs: false,
  trailingComma: 'all',
  semi: false,
  parser: 'babel',
  overrides: [
    {
      files: ['*.php'],
      options: {
        tabWidth: 4,
        parser: 'plugin-php',
      },
    },
    {
      files: ['*.md'],
      options: {
        parser: 'markdown',
      },
    },
    {
      files: ['*.json'],
      options: {
        parser: 'json',
      },
    },
    {
      files: ['*.hbs'],
      options: {
        tabWidth: 4,
        parser: 'plugin-php',
      },
    },
  ],
}
