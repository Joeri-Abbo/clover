const {resolve} = require('path')

/**
 * Bud Block
 */
module.exports = {
  label: 'Generate block',
  path: resolve(__dirname, './templates'),
  default: {
    namespace: 'bud-plugin',
    name: 'block-name',
    title: 'Block Name',
    description: 'A newly scaffolded block',
    components: ['RichText', 'InnerBlocks', 'MediaUpload'],
    category: 'common',
    supports: ['align', 'alignWide', 'inserter', 'multiple', 'reusable'],
  },
  prompts: [
    {
      type: 'input',
      name: 'namespace',
      message: 'Namespace',
      initial: 'acme-co',
      required: true,
    },
    {
      type: 'input',
      name: 'name',
      message: 'Name',
      initial: 'acme-block',
      required: true,
    },
    {
      type: 'input',
      name: 'title',
      message: 'Title',
      initial: 'ACME Co. Block',
      required: true,
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description',
      initial: 'Short description of acme-block',
    },
    {
      type: 'multiselect',
      name: 'components',
      message: 'Components',
      choices: ['RichText', 'InnerBlocks', 'MediaUpload'],
    },
    {
      type: 'select',
      name: 'category',
      message: 'Category',
      initial: 'common',
      choices: ['common', 'formatting', 'layout', 'widgets', 'embed'],
    },
    {
      type: 'multiselect',
      name: 'supports',
      message: 'Supports',
      choices: [
        'align',
        'alignWide',
        'customClassName',
        'html',
        'inserter',
        'multiple',
        'reusable',
      ],
    },
  ],
  actions: [
    {
      action: 'template',
      template: 'scripts/editor/attributes.json.hbs',
      path: 'src/blocks/{{name}}/scripts/editor/attributes.json',
      parser: 'json',
    },
    {
      action: 'template',
      template: 'scripts/editor/block.js.hbs',
      path: 'src/blocks/{{name}}/scripts/editor/block.js',
      parser: 'babel',
    },
    {
      action: 'template',
      template: 'scripts/editor/containers/edit.js.hbs',
      path: 'src/blocks/{{name}}/scripts/editor/containers/edit.js',
      parser: 'babel',
    },
    {
      action: 'template',
      template: 'scripts/editor/containers/save.js.hbs',
      path: 'src/blocks/{{name}}/scripts/editor/containers/save.js',
      parser: 'babel',
    },
    {
      action: 'template',
      template: 'scripts/public/index.js.hbs',
      path: 'src/blocks/{{name}}/scripts/public/index.js',
      parser: 'babel',
    },
    {
      action: 'template',
      template: 'styles/common.css',
      path: 'src/blocks/{{name}}/styles/common.css',
      parser: 'css',
    },
    {
      action: 'template',
      template: 'styles/editor.css',
      path: 'src/blocks/{{name}}/styles/editor.css',
      parser: 'css',
    },
    {
      action: 'template',
      template: 'styles/public.css',
      path: 'src/blocks/{{name}}/styles/public.css',
      parser: 'css',
    },
  ],
}
