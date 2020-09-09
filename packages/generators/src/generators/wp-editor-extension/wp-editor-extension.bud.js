/**
 * bud generate editor-plugin
 */

module.exports = {
  name: 'wp-editor-extension',
  description: 'Generate a new WordPress editor plugin',
  prompts: [
    {
      type: 'input',
      name: 'pluginName',
      message: 'Plugin name',
      initial: 'ACME Co. Plugin',
      required: true,
    },
  ],
  tasks: [
    {
      task: 'compile',
      src: 'plugin.js.hbs',
      dest:
        'src/plugins/{{lowercase (dashcase pluginName)}}/plugin.js',
    },
  ],
}
