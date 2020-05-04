const {resolve} = require('path')

/**
 * Generator: MediaUpload Component
 */
module.exports = {
  label: 'Generate MediaUpload Component',
  path: resolve(__dirname, './templates'),
  actions: [
    {
      action: 'template',
      template: 'MediaUpload.js.hbs',
      path: 'src/components/MediaUpload.js',
      parser: 'babel',
    },
  ],
}
