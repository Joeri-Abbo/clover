/**
 * Generator: Media Component
 */
module.exports = {
  name: 'component-media',
  description: 'Generate Media Component',
  dependsOn: ['block'],
  actions: [
    {
      action: 'template',
      template: 'Media.js.hbs',
      path: 'src/components/Media.js',
      parser: 'babel',
    },
  ],
}
