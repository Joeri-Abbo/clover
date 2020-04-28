const { resolve } = require('path')

/**
 * Bud generator
 * Block plugin base
 */
module.exports = {
  path: resolve(__dirname, './templates'),
  default: {
    namespace: '{{BUD_NAMESPACE}}',
    name: '{{BUD_NAME}}',
    author: '{{BUD_AUTHOR_NAME}}',
    email: '{{BUD_AUTHOR_EMAIL}}',
    website: '{{BUD_WEBSITE}}',
    title: '{{BUD_TITLE}}',
    description: '{{BUD_DESCRIPTION}}',
    components: ['RichText', 'InnerBlocks', 'MediaUpload'],
    category: 'common',
    supports: [
      'align',
      'alignWide',
      'inserter',
      'multiple',
      'reusable',
    ],
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
      type: 'input',
      name: 'author',
      message: 'Author name',
      initial: 'Wiley C.',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Author email',
      initial: 'wiley@gmail.com',
    },
    {
      type: 'input',
      name: 'website',
      message: 'Website',
      initial: 'https://acme.co',
    },
    {
      type: 'multiselect',
      name: 'components',
      message: 'Components',
      choices: [
        { name: 'RichText' },
        { name: 'InnerBlocks' },
        { name: 'MediaUpload' },
      ],
    },
    {
      type: 'select',
      name: 'category',
      message: 'Category',
      initial: 'common',
      choices: [
        'common',
        'formatting',
        'layout',
        'widgets',
        'embed',
      ],
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
      path: 'blocks/{{name}}/scripts/editor/attributes.json',
      parser: 'json',
    },
    {
      action: 'template',
      template: 'scripts/editor/block.js.hbs',
      path: 'blocks/{{name}}/scripts/editor/block.js',
      parser: 'babel',
    },
    {
      action: 'template',
      template: 'scripts/editor/containers/edit.js.hbs',
      path: 'blocks/{{name}}/scripts/editor/containers/edit.js',
      parser: 'babel',
    },
    {
      action: 'template',
      template: 'scripts/editor/containers/save.js.hbs',
      path: 'blocks/{{name}}/scripts/editor/containers/save.js',
      parser: 'babel',
    },
    {
      action: 'template',
      template: 'scripts/editor/components/Media.js.hbs',
      path: 'blocks/{{name}}/scripts/editor/components/Media.js',
      parser: 'babel',
    },
  ],
}
