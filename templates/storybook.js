const {resolve} = require('path')
const {getLatest} = require('./../bud/template-utilities')

/**
 * Storybook
 */
module.exports = {
  path: resolve(__dirname, './plugin'),
  fields: [],
  files: [
    {
      strategy: 'copy',
      readFrom: '_main.js',
      writeTo: 'storybook/main.js',
    },
    {
      strategy: 'copy',
      readFrom: '_manager.js',
      writeTo: '.storybook/manager.js',
    },
    {
      strategy: 'copy',
      readFrom: '_preview.js',
      writeTo: '.storybook/preview.js',
    },
    {
      strategy: 'copy',
      readFrom: '_theme.js',
      writeTo: './storybook/theme.js',
    },
    {
      strategy: 'copy',
      readFrom: 'components/preview.js',
      writeTo: './storybook/components/preview.js',
    },
  ],
  package: {
    scripts: {
      "storybook": "start-storybook -p 6006",
      "build-storybook": "build-storybook",
    },
  },
  install: {
    dev: [
      [
        { name: '@storybook/addon-a11y' },
        { name: '@storybook/addon-actions' },
        { name: '@storybook/addon-docs' },
        { name: '@storybook/addon-knobs' },
        { name: '@storybook/addon-links' },
        { name: '@storybook/addon-storysource' },
        { name: '@storybook/addon-viewport' },
        { name: '@storybook/addons' },
        { name: '@storybook/react' },
      ],
    ],
  },
}
