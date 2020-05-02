const {resolve} = require('path')

/**
 * Budfile example
 */
module.exports = {
  /**
   * Path to template files
   */
  path: resolve(__dirname, './templates'),
  default: {
    componentName: 'ComponentName',
  },
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
   * Actions to run
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
