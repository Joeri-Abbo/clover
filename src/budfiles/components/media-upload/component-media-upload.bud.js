/**
 * Generator: MediaUpload Component
 */
module.exports = {
  name: 'component-media-upload',
  label: 'Generate MediaUpload Component',
  dependsOn: ['block'],
  actions: [
    {
      action: 'template',
      template: 'MediaUpload.js.hbs',
      path: 'src/components/MediaUpload.js',
      parser: 'babel',
    },
  ],
}
