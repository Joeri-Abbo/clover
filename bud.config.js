const phpPlugin = require('@prettier/plugin-php')

export default {
  prettier: {
    arrowParens: 'avoid',
    bracketSpacing: true,
    tabWidth: 2,
    printWidth: 100,
    singleQuote: true,
    jsxBracketSameLine: true,
    useTabs: false,
    trailingComma: 'all',
    semi: false,
    plugins: [phpPlugin],
    parser: 'babel',
  },
}
