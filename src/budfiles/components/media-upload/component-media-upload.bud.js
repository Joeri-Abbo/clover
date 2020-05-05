/**
 * Generator: MediaUpload Component
 */
module.exports = {
  label: 'Generate MediaUpload Component',
  dependsOn: ['bud/block'],
  actions: [
    {
      action: 'template',
      template: 'MediaUpload.js.hbs',
      path: 'src/components/MediaUpload.js',
      parser: 'babel',
    },
  ],
}
