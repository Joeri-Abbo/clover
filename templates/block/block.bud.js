const {resolve} = require('path')

/**
 * Templates
 */
const templates = resolve(__dirname, './templates')

/**
 * Bud generator
 * Block plugin base
 */
module.exports = {
  path: templates,
  default: {
    namespace: '{{BUD_NAMESPACE}}',
    name: '{{BUD_NAME}}',
    title: '{{BUD_TITLE}}',
    description: '{{BUD_DESCRIPTION}}',
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
      default: 'acme-co',
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
      choices: [{name: 'RichText'}, {name: 'InnerBlocks'}, {name: 'MediaUpload'}],
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
