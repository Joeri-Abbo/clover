/**
 * Roots recommended WP plugin preset.
 */
module.exports = {
  name: 'wp-plugin',
  description: 'Generate a new plugin',
  generators: [
    {
      pkg: '@roots/bud-generators',
      name: 'wp-plugin',
    },
    {
      pkg: '@roots/bud-generators',
      name: 'wp-editor-block',
    },
    {
      pkg: '@roots/bud-generators',
      name: 'wp-editor-component-image',
    },
    {
      pkg: '@roots/bud-generators',
      name: 'wp-editor-extension',
    },
  ],
}
