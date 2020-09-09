const config = {
  bracketSpacing: false,
  tabWidth: 2,
  printWidth: 70,
  singleQuote: true,
  jsxBracketSameLine: true,
  useTabs: false,
  semi: false,
  overrides: [
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
  ],
}

export {config as default}
