const {resolve} = require('path')

/**
 * Starter Budfile
 */
module.exports = {
  /**
   * Path to template files
   */
  path: resolve(__dirname, './templates'),

  /**
   * Default prompt values
   */
  default: {
    componentName: 'ComponentName',
  },

  /**
   * Prompts
   */
  prompts: [
    {
      type: 'input',
      name: 'componentName',
      message: 'ComponentName',
      initial: 'ExampleComponent',
      required: true,
    },
  ],

  /**
   * Actions
   */
  actions: [
    {
      action: 'template',
      template: 'Component.js.hbs',
      path: 'src/components/{{componentName}}.js',
      parser: 'babel',
    },
  ],
}
