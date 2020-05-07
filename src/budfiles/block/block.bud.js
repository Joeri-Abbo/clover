/**
 * Bud Block
 */
module.exports = {
  name: 'block',
  description: 'Generate a new block',
  default: {
    name: 'block-name',
    title: 'Block Name',
    description: 'A newly scaffolded block',
    components: ['RichText', 'InnerBlocks'],
    category: 'common',
    supports: ['align', 'alignWide', 'inserter', 'multiple', 'reusable'],
  },
  prompts: [
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
      type: 'list',
      name: 'keywords',
      message: 'Keywords',
      initial: [],
    },
    {
      type: 'multiselect',
      name: 'components',
      message: 'Components',
      choices: ['RichText', 'InnerBlocks'],
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
        'anchor',
        'align',
        'alignWide',
        'customClassName',
        'html',
        'inserter',
        'multiple',
        'reusable',
      ],
    },
    {
      type: 'select',
      name: 'styles',
      message: 'Define styles (https://git.io/JfZTu)',
      choices: ['yes', 'no'],
    },
  ],
  actions: [
    {
      action: 'template',
      template: 'attributes.json.hbs',
      path: 'src/blocks/{{name}}/attributes.json',
      parser: 'json',
    },
    {
      action: 'template',
      template: 'editor.js.hbs',
      path: 'src/blocks/{{name}}/editor.js',
      parser: 'babel',
    },
    {
      action: 'template',
      template: 'containers/edit.js.hbs',
      path: 'src/blocks/{{name}}/containers/edit.js',
      parser: 'babel',
    },
    {
      action: 'template',
      template: 'containers/save.js.hbs',
      path: 'src/blocks/{{name}}/containers/save.js',
      parser: 'babel',
    },
    {
      action: 'template',
      template: 'public.js.hbs',
      path: 'src/blocks/{{name}}/public.js',
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
